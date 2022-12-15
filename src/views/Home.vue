<template>

  <div class="main-container">

    <!-- TEXT BOX -->
    <div class="text-box-container">
      <div class="text-box-wrapper">
        <img class="desca-logo" src="../../public/desca-logo.png" alt="desca-logo">
        <p class="catch-line">The #1 destination to share YOUR ultimate gaming, streaming or working setup</p>
        <img class="icons-row" src="../../public/icons-row.png" alt="icons-row">
      </div>
    </div>

    <!-- LOGIN BOX -->
    <div class="login-container">

      <div>
        <p style="font-weight: bold; font-size: 20px; text-align: left;">Get Started:</p>

        <button
          class="google-login-btn signin-btn"
          @click="this.$store.dispatch('logIn');"
        >
          <img class="signin-logo" src="../../public/login-logos/google-logo.png" alt="google-logo">
      </button>

      </div>

    </div>

  </div>

</template>

<style scoped>

.main-container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 750px;
  /* border: 1px solid; */
}

.text-box-container {
  width: 400px;
  height: 500px;
  background-color: rgb(13, 13, 118);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}

.text-box-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.desca-logo {
  width: 250px;
}

.catch-line {
  color: white;
  font-size: 28px;
  width: 70%;
}

.icons-row {
  width: 80%;
}

.login-container {
  height: 200px;
  width: 300px;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  justify-content: space-around; 
  align-items: center;
}


.signin-btn {
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  width: 200px;
  border: none;
  margin-top: 20px;
  padding: 5px;
  cursor: pointer;
  background-color: white;
}
.signin-logo {
  height: 35px;
}

@media screen and (max-width: 800px) {
  .main-container {
    flex-direction: column;
    justify-content: space-around;
    width: 0;
  }
}

</style>



<!-- this.$store.state.user ? this.$router.push(`/setups/${this.$store.state.user.uid}`) : this.$store.dispatch('logIn'); -->
