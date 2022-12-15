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
  height: 100%;
  width: 800px;
  margin: 0 auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
}

</style>