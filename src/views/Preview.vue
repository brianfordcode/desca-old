<template>

  <div
    class="main-container"
    v-if="$store.state.viewingSetupLoaded"
  >

    <!-- MAIN IMAGE -->
    <div class="image-container">
      <!-- ITEM LOCATIONS -->
      <div
        v-for="item in $store.state.viewingSetup.items"
        :key="item"
      >
        <div
          class="item-target"
          :style="`top: ${item.y - 15}px; left: ${item.x - 25}px`">
        </div>
      </div>
      
      <!-- IMAGE -->
      <img
        class="main-img"
        :src="$store.state.viewingSetup.imageURL"
        alt="main-image"
      />
    </div>

    <div class="item-container">

      <div
        v-for="item in this.$store.state.viewingSetup.items"
        :key="item"
      >
      <!-- TODO: HOW TO USE CSS GRID WITH V-FOR??? style="display: contents;???"-->
        
        <!-- COMPUTER -->
        <div
          class="computer item-wrapper"
          v-show="item.category === 'computer'"
        >
          <img
            class="icon"
            :src="getIconPic(item)"
            :alt="item.category"
          >
          <p class="item-text">{{item.name}}</p>
        </div>

        <!-- OTHER ITEMS -->
        <div
          class="item item-wrapper"
          v-show="item.category != 'computer'"
        >
          <img
            class="icon"
            :src="getIconPic(item)"
            :alt="item.category"
          >
          <p class="item-text">{{item.name}}</p>
        </div>

      </div>

    </div>



  </div>

  <div v-else>loading</div>

</template>

<script>
export default {
  created() {
    const routerAddress = this.$route.params.id
    this.$store.dispatch('fetchViewingSetup', routerAddress)
  },
  data() {
    return {}
  },
  methods: {
    getIconPic(e) {
      if (e.category === 'accessory') {
          return require('@/assets/icons/accessory.png')
      }
      if (e.category === 'chair') {
          return require('@/assets/icons/chair.png')
      }
      if (e.category === 'computer') {
          return require('@/assets/icons/computer.png')
      }
      if (e.category === 'desk') {
          return require('@/assets/icons/desk.png')
      }
      if (e.category === 'headset') {
          return require('@/assets/icons/headset.png')
      }
      if (e.category === 'keyboard') {
          return require('@/assets/icons/keyboard.png')
      }
      if (e.category === 'microphone') {
          return require('@/assets/icons/microphone.png')
      }
      if (e.category === 'monitor') {
          return require('@/assets/icons/monitor.png')
      }
      if (e.category === 'mouse') {
          return require('@/assets/icons/mouse.png')
      }
      if (e.category === 'speaker') {
          return require('@/assets/icons/speaker.png')
      }
      if (e.category === 'webcam') {
          return require('@/assets/icons/webcam.png')
      }
    },
  }
}
</script>

<style scoped>

.main-container {
  position: relative;
  width: 800px;
  margin: 30px;
}

/* MAIN IMAGE */
.main-img {
  width: 100%;
}

.image-container {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.item-target {
  position: absolute;
  background: rgba(255,255,255,0.1);
  height:50px;
  width: 50px;
  border-radius:50%;
}
.item-target:hover {
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}

/* ITEMS */

.item-container {
  height: min-content;
  display: grid;
  grid-template-areas: 
      "computer item item"; 
  width: 100%;
  border: 1px solid;
  justify-content: space-between;
  margin-top: 10px;
}

.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(13, 13, 118);
  width: 225px;
  min-height: 75px;
  color: white;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
  transition: .1s ease-in-out;
  cursor: pointer;
}

.icon {
    height: 40px;
    width: auto;
}

.item-text {
  padding: 10px 5px 5px 5px;
  text-align: center;
}

.computer {
  grid-area: computer;
  grid-row-start: 1;
  grid-row-end: 4;
}

.item {
  grid-area: item;
}


/* 



.items-list-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border: 1px solid;
    width: 100%;
    margin-top: 30px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid pink;
  justify-content: space-around
}

.item-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(13, 13, 118);
    width: 227px;
    min-height: 80px;
    color: white;
    padding: 15px;
    margin-bottom: 10px;
    position: relative;
    transition: .1s ease-in-out;
    cursor: pointer;
}

.icon {
    height: 40px;
    width: auto;
} */
</style>