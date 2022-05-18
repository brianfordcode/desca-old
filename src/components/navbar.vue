<template>
  <div id="nav">
      <div class="elements-container">
        <!-- logo -->
        <router-link to="/">
            <img
                id="logo"
                src="../assets/desca-logo.png"
                alt="desca-logo"
            >
        </router-link>

        <!-- links -->
        <div class="links-wrapper">
            <div
                class="link-btn"
                style="background: #247730; cursor: pointer"
                @click="save"
            >
            Save
            </div>
            <div
                class="link-btn"
                style="background: #9C43ED; cursor: pointer"
                @click="share"
            >
            Share
            </div>
            <router-link
                class="link-btn"
                style="background: #57B0FC;"
                to="/setups"
            >
            Preview
            </router-link>
            <router-link
                class="link-btn"
                style="background: #895E6A;"
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
    methods: {
        save() {
            console.log('save pushed')
        },
        share() {
            console.log('share pushed')
        }
    }

}
</script>

<style scoped>

#nav {
    background: rgb(13, 13, 118);
    height: 50px;
}

.elements-container {
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

.links-wrapper {
    display: flex;
}

.links-wrapper > *:not(:first-child) {
    margin-left: 10px;
}

.link-btn {
  width: 75px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  padding: 6px;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */

</style>