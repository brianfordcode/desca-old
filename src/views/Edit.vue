<template>

    <div class="edit-container">

    <h1>EDIT {{$route.params.id}}</h1>

    <mainImg/>

    </div>

</template>

<script>
import mainImg from '../components/edit-page/main-img.vue'

export default {
  components: {
    mainImg
  }

}
</script>

<style scoped>

.edit-container {
  width: 800px;
  margin: 100px auto 0 auto;
  /* height: 100vh; */
}

</style>