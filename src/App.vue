<template>

  <navBar/>
  
  <router-view v-if="$store.state.loggedIn !== null"/>

  <!-- <foot/> -->

    
  <actionModal
      :action="this.$store.state.actionModal.text"
      :backgroundColor="this.$store.state.actionModal.color"
    />


</template>

<script>
import navBar from './components/navbar.vue'
import foot from './components/footer.vue'
import actionModal from './components/action-modal.vue';


export default {
  components: { navBar, foot, actionModal }
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
  color: black; /* #2c3e50 */
  height: 100%;
}

</style>