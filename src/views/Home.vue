<template>

  <div class="main-container">
    <div class="left-side-container">
      <div class="text-btn-wrapper">
        <!-- TEXT -->
        <p class="text">
          The #1 destination<br>
          to share YOUR<br>
          ultimate gaming,<br>
          streaming or
          <br>
          working setup.
        </p>
        <!-- BUTTON -->
        <div
          class="get-started-btn"
          @click="getStartedBtn"
        >
        {{this.$store.state.user ? "Go To My Setups" : "Get Started"}}
        </div>
      </div>
    </div>

    <div class="picture-container">
      <!-- FEATURED PICTURE BUTTONS -->
      <div class="buttons-wrapper">
        <div v-for="(link, index) in featuredSetups" :key="link">
          <div
            :class="{'preview-btn': true, 'active': picIndex === index ? true : false}"
            @click="picIndex = index"
          >
          {{index + 1}}
          </div>
        </div>
      </div>
      <!-- FEATURED IMAGE -->
      <img
        draggable="false"
        :src="featuredSetups[picIndex]"
        :alt="featuredSetups[picIndex]"
        style="width: 100%;"
      >

    </div>

  </div>

</template>

<script>
export default {
  name: 'Home',
  mounted: function () {
    window.setInterval(() => {
      this.picIndex > this.featuredSetups.length - 2 ? this.picIndex = 0 : this.picIndex++
    }, 7500)
  },
  data() {
    return {
      featuredSetups: ["https://picsum.photos/id/0/1000/1000",
                       "https://picsum.photos/id/119/1000/1000",
                       "https://picsum.photos/id/180/1000/1000",
                       "https://picsum.photos/id/252/1000/1000",
                       "https://picsum.photos/id/366/1000/1000"
                      ],
      picIndex: 0,
    }
  },
  methods: {
    getStartedBtn() {
      this.$store.state.user ? this.$router.push(`/setups/${this.$store.state.user.uid}`) : this.$store.dispatch('logIn');
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

.buttons-wrapper {
  position: absolute;
  color: white;
  z-index: 100000;
  display: flex;
  justify-content: space-between;
  width: 220px;
  bottom: 30px;
  right: 30px;
}

.preview-btn {
  border: 1px solid white;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  
}

.preview-btn:hover, .active {
  background-color: rgba(14, 14, 108,0.75);
  border: 1px solid rgba(14, 14, 108,0.75);
}

</style>
