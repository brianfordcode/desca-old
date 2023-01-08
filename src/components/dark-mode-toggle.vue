<template>

<img
  :src="$store.state.darkMode ? require('../../public/dark-mode-icons/light-icon.png') : require('../../public/dark-mode-icons/dark-icon.png')"
  alt="icon"
  @click="$store.dispatch('toggleDarkMode')"
>

</template>

<script>
export default {
}
</script>

<style scoped>

img {
  height: 20px;
  filter: invert(1);
  user-select: none;
}
</style>