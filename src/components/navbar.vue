<template>
  <div id="nav">

    <div class="elements-container">

        <!-- logo -->
        <img
            id="logo"
            src="/desca-logo.png"
            alt="desca-logo"
        />
        <!-- links -->
        <div style=" display:flex; height: 30px;">

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
                    style="background: rgb(245, 101, 35);"
                    :to="`/edit/${$store.state.user.uid}/${$route.params.setupId}`"
                    v-if="this.$route.name != 'Edit' && this.$route.name != 'Home'"
                    title="Edit"
                >
                    <img style="height: 100%;" src="../assets/nav-icons/edit-icon.png" alt="edit-icon" draggable="false"/>
                </router-link>
                <!-- SHARE -->
                <div
                    style="background: #9C43ED; cursor: pointer"
                    @click="this.$store.dispatch('toggleShareModal')"
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

            <editDetailsModal/>

        </div>

    </div>
    
  </div>

  <!-- BANNER -->
  <p class="banner" :style="`${currentPage === 'Editing' ? 'background: rgb(245, 101, 35);' : 'background: #57B0FC;'}`">{{currentPage}}</p>


</template>

<script>
import editDetailsModal from './edit-details/edit-details-modal.vue'

export default {
    components: {
        editDetailsModal
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
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    z-index: 100000000;
}

.elements-container {
    height: 50px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

#logo {
    width: 100px;
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

.banner {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
}

@media screen and (max-width: 600px) {
    .links {
        margin-left: 10px;
    }
    .links > * {
        width: 30px;
    }
}

</style>