<template>
  <div id="nav">
    <!-- <div class="elements-container"> -->

        <!-- logo -->
        <img
            id="logo"
            src="/desca-logo.png"
            alt="desca-logo"
        />
        <!-- links -->
        <div style="display: flex; height: 30px;">
            <!-- TODO: WHY DO BUTTONS FLASH WHEN LOGGING IN/LOGGING OUT. USE SLOTS??-->
            <div class="links" v-if="$store.state.loaded && this.$route.name != 'Setups'">

                <!-- VIEW -->
                <router-link
                    style="background: #57B0FC;"
                    :to="`/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'View' && this.$route.name != 'Home'"
                    title="View"
                >
                <img style="height: 100%;" src="../assets/nav-icons/view-icon.png" alt="view-icon" draggable="false"/>
                </router-link>
                <!-- EDIT -->
                <router-link
                    style="background-color: rgb(245, 101, 35);"
                    :to="`/edit/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'Edit' && this.$route.name != 'Home'"
                    title="Edit"
                >
                <img style="height: 100%;" src="../assets/nav-icons/edit-icon.png" alt="edit-icon" draggable="false"/>
                </router-link>
                <!-- SHARE -->
                <div
                    style="background: #9C43ED; cursor: pointer"
                    @click="share"
                    v-if="this.$route.name != 'Home'"
                    title="Share"
                >
                <img style="height: 100%;" src="../assets/nav-icons/share-icon.png" alt="share-icon" draggable="false"/>
                </div>
                <!-- MY SETUPS -->
                <router-link
                    style="background: #895E6A;"
                    :to="`/setups/${this.$store.state.user.uid}`"
                    title="Home"
                >
                <img style="height: 100%;" src="../assets/nav-icons/home-icon.png" alt="home-icon" draggable="false"/>
                </router-link>
            </div>

            <detailsChangeBox/>

        </div>

    <!-- </div> -->
    
  </div>

  <!-- BANNER -->
  <p class="banner" :style="`${currentPage === 'Editing' ? 'background: rgb(245, 101, 35);' : 'background: #57B0FC;'}`">{{currentPage}}</p>


</template>

<script>
import detailsChangeBox from './edit-details/edit-details-modal.vue'



export default {
    data() {
        return {
            profilePic: null
        }
    },
    components: {detailsChangeBox},
    created(){
        if (this.$store.state.loggedIn) {
            this.profilePic = this.$store.getters.getProfileDetails(this.$route.params.user).profPic
        } else {
            this.profilePic = '/profile-icon.png'
        }
    },
    methods: {
        logIn() {
            if (!this.$store.state.loggedIn) { this.$store.dispatch('logIn') }
        },
        openProfDetails() {
            if (this.$store.state.loggedIn) { this.$store.dispatch('editDetailsToggle') }
        },  
        share() {
            this.$store.dispatch('toggleShareModal')
        },
    },
    computed: {
        currentPage() {
            if (this.$route.name === 'Edit') return 'Editing'
            if (this.$route.name === 'View') return 'Viewing'
        },
    }

}
</script>

<style scoped>

#nav {
    background: rgb(13, 13, 118);
    height: 50px;
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.10);
    z-index: 100000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* .elements-container {
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
} */

#logo {
    width: 100px;
    margin-left: 50px;
    /* cursor: pointer; */
}

.links {
    display: flex;
    height: 30px;
}

.links > *:not(:first-child) {
    margin-left: 10px;
}

.links > * {
  width: 75px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  padding: 6px;
  text-align: center;
}

.prof-img-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    height: auto;
}

.profile-icon {
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
    width: 30px;
}

.log-in-btn {
    margin-left:5px;
    color: white;
    cursor: pointer
}

.banner {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
}

</style>

<!-- TODO: GET PROFILE PIC IN NAVBAR WORKING -->