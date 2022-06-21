<template>

  <div class="main-container">
    <div class="left-side-container">
      <div class="text-btn-wrapper">
        <p class="text">
          The #1 destination<br>
          to share YOUR<br>
          ultimate gaming,<br>
          streaming or
          <br>
          working setup.
        </p>
        <div
          class="get-started-btn"
          @click="getStartedBtn"
        >
        {{this.$store.state.user ? "Go To My Setups" : "Get Started"}}
        </div>
      </div>
    </div>



    <div class="picture-container">
      <div class="buttons">
        <div class="one" @click="getShownSetupPic(1)">1</div>
        <div class="two" @click="getShownSetupPic(2)">2</div>
        <div class="three" @click="getShownSetupPic(3)">3</div>
        <div class="four" @click="getShownSetupPic(4)">4</div>
        <div class="five" @click="getShownSetupPic(5)">5</div>
      </div>
      <img
        draggable="false"
        :src="featuredSetups[setupPic]"
        alt="picture"
        style="width: 100%;"
      >

    </div>





  </div>

</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      featuredSetups: ["https://picsum.photos/id/0/1000/1000", "https://picsum.photos/id/119/1000/1000", "https://picsum.photos/id/180/1000/1000", "https://picsum.photos/id/252/1000/1000", "https://picsum.photos/id/366/1000/1000"],
      setupPic: 0
    }
  },
  methods: {
    getShownSetupPic(i) {
      if (i === 1) { this.setupPic = 0 }
      if (i === 2) { this.setupPic = 1 }
      if (i === 3) { this.setupPic = 2 }
      if (i === 4) { this.setupPic = 3 }
      if (i === 5) { this.setupPic = 4 }
    },
    getStartedBtn() {
      this.$store.state.user ? this.$router.push(`/setups/${this.$store.state.user.uid}`) : this.$store.dispatch('logIn')
    }
  },

}
</script>

<style scoped>

.main-container {
  /* border: 1px solid pink; */
  min-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.left-side-container {
  /* border: 1px solid blue; */
  width: 50%; display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(14, 14, 108);
}

.text-btn-wrapper {
  /* border: 1px solid; */
  color: white;  
  height: min-content;
}

.text {
  font-size: 40px;
}

.get-started-btn {
  border: 1px solid white;
  width: max-content;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
}

.picture-container {
  height: 500px;
  width: 600px;
  overflow: hidden;
  position: relative;
}

.buttons {
  position: absolute;
  color: white;
  z-index: 100000;
  display: flex;
  justify-content: space-between;
  width: 220px;
  bottom: 30px;
  right: 30px;
}

.buttons > * {
  border: 1px solid white;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer
}

.buttons > *:hover {
  background-color: rgba(14, 14, 108,0.75);
  border: 1px solid rgba(14, 14, 108,0.75);
}

</style>
