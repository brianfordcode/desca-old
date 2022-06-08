<template>
  <!-- <h1>PREVIEW {{$route.params.id}}</h1> -->


  <div class="main-container">

    <!-- ITEM LOCATIONS -->
    <div class="image-container">

      <div
        v-for="item in $store.getters.setup($route.params.id).items"
        :key="item"
      >
        <div
          class="item-location"
          :style="`top: ${item.y - 10}px; left: ${item.x - 10}px`">
        </div>
      </div>
      
      <!-- MAIN IMAGE -->
      <img
        class="main-img"
        :src="$store.getters.setup($route.params.id).imageURL"
        alt="main-image"
      />

    </div>

    <!-- ITEMS -->
    <div class="items-list-container">
      <div
        v-for="item in $store.getters.setup($route.params.id).items"
        :key="item"
      >

        <!-- TODO: ADD COMPUTER DETAILS -->

        <div class="item-details" v-if="item.category !='computer'">
          <img
            class="icon"
            :src="getIconPic(item)"
            alt="item"
          />
          <p style="padding: 10px 5px 5px 5px; text-align: center;">
          {{item.name}}
          </p>
        </div>

      </div>
    </div>

  </div>


</template>

<script>
export default {
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

.image-container {
  border: 1px solid;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.main-img {
  width: 100%;
}

.item-location {
  position: absolute;
  background: rgba(255,255,255,0.1);
  height:50px;
  width: 50px;
  border-radius:50%;
}
.item-location:hover {
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}


.items-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;
}

.item-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-around; */
    background: rgb(13, 13, 118);
    /* border-radius: 7px; */
    width: 227px;
    min-height: 80px;
    color: white;
    padding: 15px;
    margin-bottom: 10px;
    position: relative;
    transition: .1s ease-in-out;
    cursor: grab;
}

.icon {
    height: 40px;
    width: auto;
}
</style>