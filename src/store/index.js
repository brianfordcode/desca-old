import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import { downloadPic, deletePic, uploadPic} from '../manage-pic.js';

const db = getFirestore();

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loaded: false,
      user: null,
      loggedIn: null,
      profileDetails: {},
      setups: [],
      viewingSetup: [],
      viewingSetupLoaded: false,
      uploadProgress: null,
      editDetailsToggle: false,
      actionModal: {
        open: false,
        text: '',
        color: '',
      },
      shareModal: {
        open: false,
        setupId: null
      },
      darkMode: false,
    }
  },
  getters: {
    setup: state => setupId => {
      return state.setups.find(s => s.setupId === setupId)
    },
    getProfileDetails: state => user => {
      return state.profileDetails[user]
    },
  },
  mutations: {
    setLoaded(state) {
      state.loaded = true
    },
    setViewingSetupLoaded(state) {
      state.viewingSetupLoaded = true
    },
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
    },
    addSetup(state, setup) {
      state.setups.push(setup)
    },
    deleteSetup(state, setupId) {
      state.setups = state.setups.filter(setup => setup.setupId !== setupId)
    },
    changeMainImg(state, { currentSetup, url }) {
      const setup = state.setups.find(s => s.setupId ===  currentSetup.setupId)
      setup.imageURL = url
    },
    setItems(state, { items, setupId }) {
      state.setups.find(s => s.setupId === setupId).items = items
    },
    initializeSetups(state, setups) {
      state.setups = setups
    },
    moveItem(state, { setupId, itemIndex, point }) {
      const setup = state.setups.find(s => s.setupId === setupId)
      const item = setup.items[itemIndex]
      item.x  = point.x
      item.y = point.y
    },
    removeItem(state, {item, setupId, index}) {
      state.setups.find(s => s.setupId === setupId).items.splice(index, 1)
    },
    saveItem(state, {index, setupId, item}) {
      state.setups.find(s => s.setupId === setupId).items[index] = copy(item)
    },
    setProfDetails(state, { details, user }) {
      state.profileDetails[user] = details
    },
    fetchViewingSetup(state, viewingSetup) {
      state.viewingSetup = viewingSetup
    },
    saveItems(state, { setupId, items}) {
      state.setups.find(s => s.setupId === setupId).items = copy(items)
    },
    editDetailsToggle(state) {
      state.editDetailsToggle = !state.editDetailsToggle
    },
    uploadProgress(state, progress) {
      state.uploadProgress = progress
    },
    logOut(state) {
      state.loggedIn = false
    },
    resetUploadProgress(state) {
      state.uploadProgress = null
    },
    openActionModal(state, {text, color}) {
      state.actionModal.open = false
      setTimeout(() => { state.actionModal.open = true }, 200)
      state.actionModal.text = text;
      state.actionModal.color = color;

      setTimeout(() => {
        state.actionModal.open = false
        state.actionModal.text = '';
        state.actionModal.color = '';
      },
      2500
      )
    },
    toggleShareModal(state, setupId) {
      state.shareModal.setupId = setupId
      state.shareModal.open = !state.shareModal.open
    },
    toggleDarkMode(state) {
      state.toggleDarkMode = !state.toggleDarkMode
    }
  },
  actions: {
    // LOGIN
    logIn(context) {
      login(async user => {
        context.commit('setLoggedInUser', user);
        await context.dispatch('fetchUserDetails', user.uid)
        await context.dispatch('fetchUserSetups', user)
        // SETUP PAGE OPENS AFTER LOG IN
        await router.push(`/setups/${context.state.user.uid}`)
        context.commit('setLoaded')
        const profName = Object.values(context.state.profileDetails)[0].profName
        context.commit('openActionModal', {text: `welcome,  ${profName}`, color: 'green'})
      })
    },
    async fetchUserDetails(context, user) {
      const q = query(collection(db, "profileDetails"), where("user", "==", user));
      const querySnapshot = await getDocs(q);
      const profileDetailsDoc = querySnapshot.docs[0]

      if (profileDetailsDoc) {
          // IF USER EXISTS, LOAD DETAILS
          context.commit('setProfDetails', { details: profileDetailsDoc.data(), user })
      } else {
          // ELSE CREATE A NEW USER
        const {uid, displayName, photoURL} = context.state.user
        const profileDetails = {
          user: uid,
          profName: displayName,
          profPic: {
            photoURL: photoURL,
            profPicId: null
          },
          socialLinks: {
            twitch: '',
            twitter: '',
            youtube: '',
            discord: '',
            facebook: '',
            website: '',
          },
        }

        context.dispatch('changeDetails', { details: profileDetails, user } )
      }
    },
    async fetchUserSetups(context, user) {
        const setups = []
        const q = query(collection(db, "setups"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => setups.push(doc.data()))
        context.commit('initializeSetups', setups)
    },
    logOut(context) {
      router.push('/')
      logOut()
    },

    // SETUPS
    addSetup(context, setup) {
      context.commit('addSetup', setup)
      setDoc(doc(db, "setups", setup.setupId), setup);
      context.commit('resetUploadProgress')
    },
    deleteSetup(context, { user, setupId } ) {
      const key = `${user.uid}/${setupId}`
      deletePic(key)
      context.commit('deleteSetup', setupId)
      deleteDoc(doc(db, "setups", setupId))
    },
    deleteProfPic(context, { user, profPicId }) {
      const key = `${user.uid}/${profPicId}`
      deletePic(key)
    },
    addItem(context, { item, setupId }) {
      const items = [...context.getters.setup(setupId).items, copy(item)]
      context.commit('setItems', { items, setupId })
      updateDoc(doc(db, "setups", setupId), {items: items});
    },
    moveItem(context, { setupId, itemIndex, point }) {
      context.commit('moveItem', { setupId, itemIndex, point })
      const items = context.getters.setup(setupId).items
      updateDoc(doc(db, "setups", setupId), {items});
    },
    removeItem(context, {item, setupId, index }) {
      context.commit('removeItem', {item, setupId, index });
      const items = context.getters.setup(setupId).items
      updateDoc(doc(db, "setups", setupId), {items}), 1000
    },
    async changeMainImg(context, {currentSetupRoute, user, image}) {
      const key = `${user.uid}/${currentSetupRoute}`
      await uploadPic(key, image)
      const url = await downloadPic(key)
      const currentSetup = context.getters.setup(currentSetupRoute)
      updateDoc(doc(db, "setups", currentSetup.setupId), {imageURL: url});
      context.dispatch('fetchUserSetups', user)
      context.commit('changeMainImg', {currentSetup, url})
      context.commit('resetUploadProgress')
    },
    async saveItem(context, {index, setupId, item}) {
      context.commit('saveItem', {index, setupId, item})
      await updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items });
    },
    saveItems(context, { setupId, items}) {
      context.commit('saveItems', { setupId, items})
      updateDoc(doc(db, "setups", setupId), { items });
    },
    // PROFILE HEADER DETAILS
    editDetailsToggle(context) {
      context.commit('editDetailsToggle')
    },
    changeDetails(context, { details, user }) {
      context.commit('setProfDetails', { details, user })
      setDoc(doc(db, "profileDetails", user), details);
      context.commit('resetUploadProgress')
    },
    async fetchViewingSetup(context, routerAddress) {
      const q = query(collection(db, "setups"), where("setupId", "==", routerAddress));
      const querySnapshot = await getDocs(q);
      const viewingSetup = querySnapshot.docs[0]
      context.commit('fetchViewingSetup', viewingSetup.data())
      context.commit('setViewingSetupLoaded')
    },
    uploadProgress(context, progress) {
      context.commit('uploadProgress', progress)
    },
    openActionModal(context, {text, color}) {
      context.commit('openActionModal', {text, color})
    },
    toggleShareModal(context, setupId) {
      context.commit('toggleShareModal', setupId)
    },
    toggleDarkMode(context) {
      context.commit('toggleDarkMode')
    }
  }
})

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    store.commit('setLoggedInUser', user);
    await store.dispatch('fetchUserDetails', uid)
    await store.dispatch('fetchUserSetups', user)
    
    // SETUP PAGE OPENS AFTER LOG IN
    await router.push(`/setups/${uid}`)
  
    store.commit('setLoaded')
  
  } else {
      if (router.currentRoute.name !== 'View') {
        await router.push('/')
      }
      store.commit('logOut')

  }
});

export default store




// MAIN IMG
// TODO: CONVERT TARGETS IN MAINIMG TO % SO MOBILE SUPPORTED
// TODO: MAKE MAIN IMG/ITEMS BOXES SMALLER
// TODO: OPTIMIZE ITEMLIST AND MAINIMG COMPUTER DETAILS (V-FOR)

// MODALS
// TODO: IN ACTION MODAL MUTATION, CHECK IF FIREBASE MATCHES TO ACTION
// TODO: REQUIRE URL (HTTPS://, ETC) IN CHANNEL INPUTS
// TODO: MAKE EDITDETAILS MODAL IN OWN COMPONENT (INCLUDING BUTTONS IN OTHER COMPONENT)
// TODO: IN EDITDETAILS MODAL, BUTTONS VISIBLE/INVISIBLE DEPENDING
// TODO: IN EDITITEMS MODAL, BUTTONS VISIBLE/INVISIBLE DEPENDING
// TODO: MAKE EDITDETAILS MODAL BACKGROUND STRETCH ENTIRE SITE OR MAKE SITE UNSCROLLABLE
// TODO: ADD COPY FUNCTION TO SHARE MODALS

// PROFILE HEADER
// TODO: WHEN UPLOADING NEW PROFIMG, FIX SMALL PIXEL SHIFT
// TODO: MOVE PROFILE HEADER COMPONENT OUT OF EDIT PAGE FOLDER

// FOOTER
// TODO: KEEP FOOTER AT BOTTOM ALWAYS
// TODO: REMOVE FOOTER DESCA LOGO LINK TO HOMEF


// VIEWING PAGE
// TODO: VIEWING PAGE NOT WORKING TO GO TO URL WHEN NOT LOGGED IN/GOING DIRECTLY TO URL
// TODO: IN VIEW MODE, MAKE COMPUTER SPECS ON MAIN IMG


// GENERAL
// TODO: INSTEAD OF PERMANENT DELETE, GOES TO DELETED DATABASE FOLDER
// TODO: WHEN REFRESH, KEEP ON SAME PAGE, NOT GO BACK TO SETUPS
// TODO: MOVE ALL ASSETS TO PUBLIC FOLDERS
// TODO: FIGURE OUT OPENSSL NPM BUILD ISSUE ON NETLIFY
// TODO: ALLOW LOGINS FROM OTHER SITES (IS IT SAME UID, PROFPIC, ETC?)
// TODO: WHEN DEALING WITH FIREBASE STORAGE/DATABASE (DELETE, ETC), ONLY HAVE ACTION MODAL ON SUCCESS

// TODO: MAKE ABOUT PAGE
// TODO: MAKE CONTACT PAGE
// TODO: MAKE FAQ PAGE
// TODO: MAKE BLOG PAGE