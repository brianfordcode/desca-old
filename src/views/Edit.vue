<template>
    <div class="edit-container">

      <profileHeader style="z-index: 10000;"/>

      <mainImg/>

    </div>

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'
import mainImg from '../components/edit-page/main-img.vue'


export default {
  components: {
    mainImg, profileHeader
  }

}
</script>

<style scoped>

.edit-container {
  max-width: 1200px;
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

</style>