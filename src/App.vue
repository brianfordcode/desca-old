<template>

  <navBar/>

  <router-view/>

</template>

<script>
import navBar from './components/navbar.vue'

export default {
  components: { navBar}
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
}
</style>