import { createStore } from 'vuex'
import { login } from '../firebase.js'
import router from '../router/index.js';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null,
      loggedIn: false,
      profileDetails: {}
      
    }
  },

  mutations: {
    setLoggedInUser(state, user) {
      state.user = user;
      state.loggedIn = true;
      // state.profileDetails.profPic = user.photoURL
    },

  },
  actions: {
    // LOGIN
    login() {
      login(user => {
        this.commit('setLoggedInUser', user);

        // SETUP PAGE OPENS AFTER LOG IN
        router.push('/setups')

      })
    },
    
  }
})

export default store