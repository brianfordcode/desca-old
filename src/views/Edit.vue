<template>
    <div class="edit-container">

      <profileHeader/>

      <mainImg/>

    </div>

    

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'
import mainImg from '../components/edit-page/main-img.vue'


export default {
  components: {
    mainImg, profileHeader,
  }

}
</script>

<style scoped>

.edit-container {
  max-width: 1200px;
  border: 3px solid purple;
  height: min-content;
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

</style>