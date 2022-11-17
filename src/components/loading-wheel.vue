<template>
  <div class="container">
    <div class="spin"></div>
  </div>
    
</template>

<script>

</script>

<style scoped>

.container {
  height: 300px;
  width: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.spin {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, .3);
  border-radius: 50%;
  border-top-color: rgb(13, 13, 118);;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>