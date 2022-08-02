<template>

  <navBar/>

  <router-view v-if="$store.state.loggedIn !== null"/>

  <foot/>

</template>

<script>
import navBar from './components/navbar.vue'
import foot from './components/footer.vue'

export default {
  components: { navBar, foot}
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
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

</style>