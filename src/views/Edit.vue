<template>

    <div class="edit-container">

    <profileHeader style="z-index: 10000; margin: 35px 0 10px 0;"/>

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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0 30px;
}

</style>