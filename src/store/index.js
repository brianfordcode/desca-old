import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';
import { validateContextObject } from '@firebase/util';
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import {uploadPic} from "../upload-pic.js"
import { downloadPic } from '../download-pic.js';


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
    }
  },
  getters: {
    setup: state => setupId => {
      return state.setups.find(s => s.setupId === setupId)
    },
    getProfileDetails: state => user => {
      return state.profileDetails[user]
    }
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
    addMainImg(state, currentSetup, picture) {
      
      // mutation for addMainImg
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
    logOut(state) {
      state.loggedIn = false
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
      
      })
    },
    async fetchUserDetails(context, user) {

      const q = query(collection(db, "profileDetails"), where("user", "==", user));
      const querySnapshot = await getDocs(q);

      const profileDetailsDoc = querySnapshot.docs[0]

      if (profileDetailsDoc) {
          context.commit('setProfDetails', { details: profileDetailsDoc.data(), user })
      } else {
        const {uid, displayName, photoURL} = context.state.user
        const profileDetails = {
          user: uid,
          profName: displayName,
          profPic: photoURL,
          socialLinks: {
            twitchLink: '',
            twitterLink: '',
            youtubeLink: '',
            discordLink: '',
            websiteLink: '',
          },
          allowComments: false,
          liveStatus: false,
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
    logOut() {
      router.push('/')
      logOut()
    },
    // SETUPS
    addSetup(context, setup) {
      context.commit('addSetup', setup)
      // PUSH TO FIREBASE
      setDoc(doc(db, "setups", setup.setupId), setup);
    },
    deleteSetup(context, setupId ) {
      context.commit('deleteSetup', setupId)
      // TODO: INSTEAD OF PERMANENT DELETE, GOES TO DELETED DATABASE FOLDER??
      deleteDoc(doc(db, "setups", setupId))
    },
    addItem(context, { item, setupId }) {
      const items = [...context.getters.setup(setupId).items, copy(item)]
      context.commit('setItems', { items, setupId })
      // ADD ITEMS TO FIREBASE DOCUMENT
      updateDoc(doc(db, "setups", setupId), {items: items});
    },
    moveItem(context, { setupId, itemIndex, point }) {
      context.commit('moveItem', { setupId, itemIndex, point })
      const items = context.getters.setup(setupId).items
      updateDoc(doc(db, "setups", setupId), {items});
    },
    removeItem(context, {item, setupId, index }) {
      context.commit('removeItem', {item, setupId, index })
      const items = context.getters.setup(setupId).items
      updateDoc(doc(db, "setups", setupId), {items});
    },
    async addMainImg(context, {currentSetupRoute, user, image}) {

      const key = `${user.uid}/${currentSetupRoute}`

      // FIREBASE STORAGE UPLOAD FUNCTIONALITY 
      await uploadPic(key, image)

      

      // TODO: UPLOAD PICTURE FUNCTIONALITY
      // const currentSetup = context.getters.setup(currentSetupRoute)
      // const picture = `https://picsum.photos/seed/${currentSetup.setupId}/333/255`
      // updateDoc(doc(db, "setups", currentSetup.setupId), {imageURL: picture});
      // context.dispatch('fetchUserSetups', user)
    

    },
    saveItem(context, {index, setupId, item}) {
      context.commit('saveItem', {index, setupId, item})
      updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items });
    },
    saveItems(context, { setupId, items}) {
      context.commit('saveItems', { setupId, items})
      updateDoc(doc(db, "setups", setupId), { items });
    },
    // PROFILE HEADER DETAILS
    changeDetails(context, { details, user }) {
      context.commit('setProfDetails', { details, user })
      setDoc(doc(db, "profileDetails", user), details);
    },
    async fetchViewingSetup(context, routerAddress) {
      const q = query(collection(db, "setups"), where("setupId", "==", routerAddress));
      const querySnapshot = await getDocs(q);
      const viewingSetup = querySnapshot.docs[0]
      context.commit('fetchViewingSetup', viewingSetup.data())
      context.commit('setViewingSetupLoaded')
    },
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