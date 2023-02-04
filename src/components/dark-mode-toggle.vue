<template>

<img
  :src="$store.state.darkMode ? require('../../public/dark-mode-icons/light-icon.png') : require('../../public/dark-mode-icons/dark-icon.png')"
  alt="icon"
  draggable="false"
  @click="$store.dispatch('toggleDarkMode')"
>

</template>

<script>
export default {
  data() {
    return {
      icon: ''
    }
  },
  created() {

    const hour = new Date().getHours();
    if (hour >= 6) {
      this.icon = require('../../public/dark-mode-icons/light-icon.png')
      this.$store.dispatch('toggleDarkMode')
    } else {
      this.icon = require('../../public/dark-mode-icons/dark-icon.png')
    }




  }
}
</script>

<style scoped>

img {
  height: 20px;
  filter: invert(1);
  cursor: pointer;
}
</style>