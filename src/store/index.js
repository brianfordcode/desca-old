import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';

const db = getFirestore();

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null,
      loggedIn: false,
      profileDetails: {
        profName: '',
        profPic: '',
        socialLinks: {
          twitchLink: '',
          twitterLink: '',
          youtubeLink: '',
          discordLink: '',
          websiteLink: '',
      },
      allowComments: false,
      liveStatus: false,
      },
      setups: [],
      
    }
  },
  getters: {
    setup: state => id => {
      return state.setups.find(s => s.id === id)
    }
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
      state.profileDetails.profPic = user.photoURL
    },
    addSetup(state, setup) {
      state.setups.push(setup)
      console.log(state.setups)
    },
    deleteSetup(state, setupId) {
      state.setups = state.setups.filter(setup => setup.id !== setupId)
    },
    addItem(state, { item, setupId }) {
      state.setups.find(s => s.id === setupId).items.push(item)
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

  },
  actions: {
    // LOGIN
    logIn(context) {
      login(user => {
        this.commit('setLoggedInUser', user);
        context.dispatch('fetchUserSetups', user)

        // SETUP PAGE OPENS AFTER LOG IN
        router.push('/setups')
        
      })
    },
    fetchUserSetups(context, user) {
      console.log('FETCH USER SETUPS FROM FIREBASE')
    },
    logOut() {
      router.push('/')
      logOut()
    },
    addSetup(context, setup) {
      context.commit('addSetup', setup)
      console.log(setup)
      // PUSH TO FIREBASE
      setDoc(doc(db, "setups", setup.id), setup);
    },
    deleteSetup(context, setupId ) {
      context.commit('deleteSetup', setupId)
      // UPDATE (DELETE)FROM FIREBASE
    },
    addItem(context, { item, setupId }) {
      context.commit('addItem', { item, setupId })
    },
    moveItem(context, { setupId, itemIndex, point }) {
      context.commit('moveItem', { setupId, itemIndex, point })
    },
    removeItem(context, {item, setupId, index }) {
      context.commit('removeItem', {item, setupId, index })
    },
  }
})

export default store