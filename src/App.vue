<template>

<div :class="{'dark-mode': $store.state.darkMode}">
  <navBar v-if="this.$route.name != 'Home'"/>
  
  <router-view v-if="$store.state.loggedIn !== null"/>

  <foot/>

    
  <actionModal
      :action="this.$store.state.actionModal.text"
      :backgroundColor="this.$store.state.actionModal.color"
    />

    <shareModal/>

    
  </div>

</template>

<script>
import navBar from './components/navbar.vue'
import foot from './components/footer.vue'
import actionModal from './components/action-modal.vue';
import shareModal from './components/share-modal.vue'


export default {
  components: { navBar, foot, actionModal, shareModal },
}
</script>


<style>

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  height: 100%;
}

.dark-mode {
  background-color: rgb(56, 56, 56)
}

.dark-mode h1 {
  color: rgb(233, 233, 233);
}

.dark-mode h2 {
  color: rgb(233, 233, 233);
}

</style>