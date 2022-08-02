<template>
  <div id="nav">
    <div class="elements-container">
        <!-- logo -->
        <img
            id="logo"
            src="/desca-logo.png"
            alt="desca-logo"
            @click="$router.push('/')"
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
                >
                View
                </router-link>
                <!-- EDIT -->
                <router-link
                    style="background-color: rgb(245, 101, 35);"
                    :to="`/edit/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'Edit' && this.$route.name != 'Home'"
                >
                Edit
                </router-link>
                <!-- SHARE -->
                <div
                    style="background: #9C43ED; cursor: pointer"
                    @click="share"
                    v-if="this.$route.name != 'Home'"
                >
                Share
                </div>
                <!-- MY SETUPS -->
                <router-link
                    style="background: #895E6A;"
                    :to="`/setups/${this.$store.state.user.uid}`"
                >
                My Setups
                </router-link>
            </div>

            <!-- PROFILE ICON AND LOG IN/OUT -->
            <div>
                <div class="prof-img-container">
                    <img
                        class="profile-icon"
                        :src="`${!$store.state.loggedIn ? require('../assets/profile-icon.png') : $store.state.user.photoURL}`"
                        alt="prof-icon"
                    >
                    <p
                        class="logInOutBtn"
                        @click="`${!$store.state.loggedIn ? $store.dispatch('logIn') : $store.dispatch('logOut')}`"
                    >
                    Log {{!$store.state.loggedIn ? 'In' : 'Out'}}
                    </p>
                </div>
            </div>

        </div>

    </div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        share() {
            console.log('share pushed')
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
}

.elements-container {
    height: 100%;
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

#logo {
    width: 100px;
    cursor: pointer;
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.profile-icon {
    border-radius: 50%;
    height: 100%;
    margin: 10px;
}

.logInOutBtn {
    color: white;
    cursor: pointer
}
/* #nav a.router-link-exact-active {
  color: #42b983;
} */

</style>