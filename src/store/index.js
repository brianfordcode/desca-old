import { createStore } from 'vuex'
import { doc, getDocs, deleteDoc, updateDoc, collection, query, where, setDoc, getFirestore, startAfter } from "firebase/firestore"; 
import { login, logOut } from '../firebase.js'
import router from '../router/index.js';
import { validateContextObject } from '@firebase/util';

const db = getFirestore();

// Create a new store instance.
const store = createStore({
  state () {
    return {
      loaded: false,
      user: null,
      loggedIn: false,
      profileDetails: null,
      setups: [],
      
    }
  },
  getters: {
    setup: state => id => {
      return state.setups.find(s => s.id === id)
    }
  },
  mutations: {
    setLoaded(state) {
      state.loaded = true
    },
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
    moveItem(state, { setupId, itemIndex, point }) {
      const setup = state.setups.find(s => s.id === setupId)
      const item = setup.items[itemIndex]
      item.x  = point.x
      item.y = point.y
    },
    removeItem(state, {item, setupId, index}) {
      state.setups.find(s => s.id === setupId).items.splice(index, 1)
    },


    logInProfDetails(state, dbProfileDetails) {
      state.profileDetails = dbProfileDetails

    },


    // CHANGE DETAILS
    changeDetails(state, profileDetails) {
      state.profileDetails = profileDetails
    }




  },
  actions: {
    // LOGIN
    logIn(context) {
      login(async user => {
        context.commit('setLoggedInUser', user);
        await context.dispatch('fetchUserDetailsAndSetups', user)
        
        context.commit('setLoaded')

        // SETUP PAGE OPENS AFTER LOG IN
        router.push('/setups')
      })
    },
    async fetchUserDetailsAndSetups(context, user) {

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
    logOut() {
      router.push('/')
      logOut()
    },

    // SETUPS
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


    // PROFILE HEADER DETAILS
    changeDetails(context, profileDetails) {
      // console.log(this.state.profileDetails)
      context.commit('changeDetails', profileDetails)
      setDoc(doc(db, "profileDetails", this.state.user.uid), profileDetails);
    }




  }
})

export default store