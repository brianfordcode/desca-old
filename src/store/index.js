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
      setups: []
    }
  },

  mutations: {
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
      // state.profileDetails.profPic = user.photoURL
    },
    setLoggedOutUser(state) {
      state.user = null;
      state.loggedIn = false;
      state.profileDetails.profPic = null
    },
    addSetup(state, setup) {
      state.setups.push(setup)
      console.log(state.setups)
    },
    deleteSetup(state, setupId) {
      state.setups = state.setups.filter(setup => setup.id !== setupId)
    }
  },
  actions: {
    // LOGIN
    logIn() {
      login(user => {
        this.commit('setLoggedInUser', user);

        // SETUP PAGE OPENS AFTER LOG IN
        router.push('/setups')

      })
    },
    logOut() {
      logOut()
      router.push('/')
      this.commit('setLoggedOutUser')
      setTimeout(() => {alert('logged Out')}, 500);
    },
    addSetup(context, setup) {
      context.commit('addSetup', setup)
    },
    deleteSetup(context, setupId ) {
      context.commit('deleteSetup', setupId)
    }
  }
})

export default store