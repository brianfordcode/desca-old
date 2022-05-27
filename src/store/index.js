import { createStore } from 'vuex'
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null,
      loggedIn: false,
      profileDetails: {},
      setups: [],
    }
  },
  getters: {
    setup: state => id => {
      console.log(state.setups.find(s => s.id === id))
      return state.setups.find(s => s.id === id)
    }
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
      // state.profileDetails.profPic = user.photoURL
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
  },
  actions: {
    // LOGIN
    logIn(context) {
      login(user => {
        this.commit('setLoggedInUser', user);
        context.dispatch('fetchUserSetups', user)
        // SETUP PAGE OPENS AFTER LOG IN
        console.log(user)
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
      // PUSH TO FIREBASE
      // INCLUDE USERID IN EVERY SETUP

    },
    deleteSetup(context, setupId ) {
      context.commit('deleteSetup', setupId)
      // UPDATE (DELETE)FROM FIREBASE
    },
    addItem(context, { item, setupId }) {
      context.commit('addItem', { item, setupId })
    },
  }
})

export default store