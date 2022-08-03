<template>
    
    <div class="edit-container">

      <profileHeader style="z-index: 10000;"/>

      <mainImg/>

    </div>

</template>

<script>
import profileHeader from '../components/profile-header/profile-header.vue'
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
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

</style>