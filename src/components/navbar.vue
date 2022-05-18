<template>
  <div id="nav">
      <div class="elements-wrapper">
        <!-- logo -->
        <router-link to="/">
            <img
                id="logo"
                src="../assets/desca-logo.png"
                alt="desca-logo"
            >
        </router-link>

        <!-- links -->
        <div>
            <router-link
                class="link-btn"
                to="/setups"
            >
            My Setups
            </router-link>
        </div>

      </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

#nav {
    background: rgb(13, 13, 118);
    height: 50px;
}

.elements-wrapper {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#logo {
    width: 100px;
}

.link-btn {
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  background: #895E6A;
  padding: 6px;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
}

</style>