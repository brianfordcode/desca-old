<template>


<input type="checkbox" v-model="checked">


</template>

<script>
export default {

  data() {
    return {
      checked: false,
    }
  },
  watch: {
    checked() {
      this.$store.dispatch('toggleDarkMode')
    }
  }
}
</script>

<style scoped>
</style>