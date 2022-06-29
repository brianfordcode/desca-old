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
            <!-- TODO: WHY DO BUTTONS FLASH WHEN LOGGING IN/LOGGING OUT -->
            <div class="links" v-if="$store.state.loggedIn && this.$route.name != 'Setups'">

                <!-- VIEW -->
                <router-link
                    style="background: #57B0FC;"
                    :to="`/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'View' && this.$route.name != 'Home'"
                >
                View
                </router-link>
                <router-link
                    style="background-color: rgb(245, 101, 35);"
                    :to="`/edit/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'Edit' && this.$route.name != 'Home'"
                >
                Edit
                </router-link>
                <div
                    style="background: #9C43ED; cursor: pointer"
                    @click="share"
                    v-if="this.$route.name != 'Home'"
                >
                Share
                </div>
                <router-link
                    style="background: #895E6A;"
                    :to="`/setups/${this.$store.state.user.uid}`"
                >
                My Setups
                </router-link>
            </div>
            <!-- PROFILE ICON -->
            <div class="prof-img-container">
                <img
                    class="profile-icon"
                    v-if="!$store.state.loggedIn"
                    src="../assets/profile-icon.png"
                    alt="profile-icon"
                    @click="$store.dispatch('logIn')"
                >
                <img
                    v-else
                    class="profile-icon"
                    style="border-radius: 50%;"
                    :src="$store.state.user.photoURL"
                    alt="user-profile-pic"
                    @click="showMenuBtn = !showMenuBtn"
                >
            </div>
            
        </div>
        <!-- MENU WHEN PROF PIC CLICKED -->
        <!-- TODO: CLOSE MENU WHEN ANYWHERE ELSE IS CLICKED -->
        <!-- LOG OUT -->
        <div
            v-if="showMenuBtn"
            class="menu-btn"
            @click="showMenuBtn = !showMenuBtn"
            style="z-index: 10000"
        >
            <!-- btn to setups -->
            <!-- <router-link
                :to="`/setups/${this.$store.state.user.uid}`"
                style="background: #895E6A;"
            >
            My Setups
            </router-link> -->
            <!-- btn to logout -->
            <p 
                @click="$store.dispatch('logOut')"
                style="background: rgb(13, 13, 118); "
            >
            Log Out
            </p>
        </div>
    
    </div>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            showMenuBtn: false,
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
    margin-left: 20px;
    height: 30px;
}

.profile-icon {
    cursor: pointer;
    height: 100%;
}

.menu-btn {
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 50px;
    cursor: pointer;
}

.menu-btn > * {
    padding: 5px;
    color: white;
    text-decoration: none;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */

</style>