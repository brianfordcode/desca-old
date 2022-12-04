<template>

    <div class="edit-container">

      <profileHeader style="z-index: 10000;"/>

      <viewPage/>

    </div>

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'
import viewPage from '../components/view-page.vue'


export default {
  components: {
    viewPage, profileHeader
  }

}
</script>

<style scoped>

.edit-container {
  max-width: 1200px;
  width:800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

</style>