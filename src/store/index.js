import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';
import { validateContextObject } from '@firebase/util';
import { onAuthStateChanged } from "firebase/auth";

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
      loggedIn: false,
      profileDetails: null,
      setups: [],
      viewingSetup: [],
      viewingSetupLoaded: false
    }
  },
  getters: {
    setup: state => id => {
      return state.setups.find(s => s.id === id)
    },
  },
  mutations: {
    setLoaded(state) {
      state.loaded = true
      // TODO: CAN I USE THIS FOR MULTIPLE PLACES NEEDED TO LOAD?
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
      state.setups = state.setups.filter(setup => setup.id !== setupId)
    },
    setItems(state, { items, setupId }) {
      state.setups.find(s => s.id === setupId).items = items
    },
    initializeSetups(state, setups) {
      state.setups = setups
    },
    moveItem(state, { setupId, itemIndex, point }) {
      const setup = state.setups.find(s => s.id === setupId)
      const item = setup.items[itemIndex]
      item.x  = point.x
      item.y = point.y
    },
    removeItem(state, {item, setupId, index}) {
      state.setups.find(s => s.id === setupId).items.splice(index, 1)
    },

    saveItem(state, {index, setupId, item}) {
      state.setups.find(s => s.id === setupId).items[index] = copy(item)
    },

    logInProfDetails(state, dbProfileDetails) {
      state.profileDetails = dbProfileDetails

    },
    // CHANGE DETAILS
    changeDetails(state, profileDetails) {
      state.profileDetails = profileDetails
    },
    fetchViewingSetup(state, viewingSetup) {
      state.viewingSetup = viewingSetup
    }
  },
  actions: {
    // LOGIN
    logIn(context) {
      login(async user => {
        context.commit('setLoggedInUser', user);
        await context.dispatch('fetchUserDetails', user)
        await context.dispatch('fetchUserSetups', user)
        
        context.commit('setLoaded')

        // SETUP PAGE OPENS AFTER LOG IN
        router.push('/setups')
      })
    },
    async fetchUserDetails(context, user) {

      const q = query(collection(db, "profileDetails"), where("user", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const profileDetailsDoc =  querySnapshot.docs[0]

      if (profileDetailsDoc) {
          context.commit('logInProfDetails', profileDetailsDoc.data())
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
        context.dispatch('changeDetails', profileDetails)
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
      setDoc(doc(db, "setups", setup.id), setup);
    },
    deleteSetup(context, setupId ) {
      context.commit('deleteSetup', setupId)
      // UPDATE (DELETE)FROM FIREBASE
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
    saveItem(context, {index, setupId, item}) {
      context.commit('saveItem', {index, setupId, item})
      updateDoc(doc(db, "setups", setupId), {items: context.getters.setup(setupId).items });
    },
    // PROFILE HEADER DETAILS
    changeDetails(context, profileDetails) {
      context.commit('changeDetails', profileDetails)
      setDoc(doc(db, "profileDetails", this.state.user.uid), profileDetails);
    },
    async fetchViewingSetup(context, routerAddress) {
      const q = query(collection(db, "setups"), where("id", "==", routerAddress));
      const querySnapshot = await getDocs(q);
      const viewingSetup = querySnapshot.docs[0]
      context.commit('fetchViewingSetup', viewingSetup.data())
      context.commit('setViewingSetupLoaded')
    }
  }
})

export default store