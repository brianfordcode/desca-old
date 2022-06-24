<template>

  <div
    class="main-container"
    v-if="$store.state.viewingSetupLoaded"
  >

    <profileHeader style="z-index: 10000; margin: 35px 0 10px 0;"/>

    <!-- MAIN IMAGE -->
    <div class="image-container">

      <!-- ITEM LOCATIONS -->
      <!-- TODO: MATCH ITEM LOCATIONS UP BETWEEN EDIT/VIEW PAGES -->

      <!-- DETAILS BOX -->
      <div
        class="item-wrapper hovered-item"
        v-if="showItem"
        :style="{
          top: (hoveredItem.y - 30) + 'px',
          left: (hoveredItem.x - 125) + 'px'
        }"
        @mouseleave="handleMouseLeave"
      >   
          <!-- ICON -->
          <img class="icon" 
              :src="getIconPic(hoveredItem)"
              :alt="hoveredItem.category"
              v-if="hoveredItem.category"
          />
          <!-- NAME -->
          <p style="padding: 10px 5px 5px 5px; text-align: center;">
          {{hoveredItem.name}}
          </p>
      </div>

      <div
        v-for="item in $store.state.viewingSetup.items"
        :key="item"
      >
        <div
          class="item-target"
          :style="`top: ${item.y - 15}px; left: ${item.x - 25}px;`"
          @mouseover="handleMouseOver(item)"
          >
          <!-- TODO: WHY X AND Y ARE NOT MATCHING UP WHEN PROFILE HEADER IS THERE -->
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

      <!-- COMPUTER -->
      <div v-for="item in $store.state.viewingSetup.items" :key="item">
          <div
              style=" font-size: 14px; margin-right: 20px;"
              v-if="item.category === 'computer'"
              class="comp-details"
              @mouseover="handleMouseOver(item)"
              @mouseleave="handleMouseLeave"
          >
              <!-- ICON -->
              <div style="background: rgb(13, 13, 118); display: flex; justify-content: space-around; align-items: center; width: 250px; height: 75px;">
                  <img style="height: 50px;"
                      :src="getIconPic(item)"
                      :alt="item.category"
                      v-if="item.category"
                  />
              </div>
              <!-- CPU -->
              <div v-if="item.categoryDetails.cpu">
                  <div style="display: flex; flex-direction: column; align-items: center;"> 
                      <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">CPU:</span>
                      <span>{{item.categoryDetails.cpu}}</span>
                  </div>
              </div>
              <!-- GPU -->
              <div v-if="item.categoryDetails.gpu">
                  <div style="display: flex; flex-direction: column; align-items: center;"> 
                      <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">GPU:</span>
                      <span>{{item.categoryDetails.gpu}}</span>
                  </div>
              </div>
              <!-- SSD -->
              <div v-if="item.categoryDetails.ssd">
                  <div style="display: flex; flex-direction: column; align-items: center;"> 
                      <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">SSD:</span>
                      <span>{{item.categoryDetails.ssd}}</span>
                  </div>
              </div>
              <!-- RAM -->
              <div v-if="item.categoryDetails.ram">
                  <div style="display: flex; flex-direction: column; align-items: center;"> 
                      <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">RAM:</span>
                      <span>{{item.categoryDetails.ram}}</span>
                  </div>
              </div>
              <!-- CASE -->
              <div v-if="item.categoryDetails.case">
                  <div style="display: flex; flex-direction: column; align-items: center;"> 
                      <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">CASE:</span>
                      <span>{{item.categoryDetails.case}}</span>
                  </div>
              </div>

          </div>
      </div>

      <!-- OTHER ITEMS -->
      <div class="other-items">
        <div
          v-for="item in $store.state.viewingSetup.items"
          :key="item"
        >
          <div class="item-wrapper"
              v-if="item.category != 'computer'"
              @mouseover="handleMouseOver(item)"
              @mouseleave="handleMouseLeave"
          >   
              <!-- ICON -->
              <img class="icon" 
                  :src="getIconPic(item)"
                  :alt="item.category"
                  v-if="item.category"
              />
              <!-- NAME -->
              <p style="padding: 10px 5px 5px 5px; text-align: center;">
              {{item.name}}
              </p>
          </div>
        </div>
      </div>

    </div>

  </div>

  <div v-else>loading</div>

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'

export default {
  created() {
    const routerAddress = this.$route.params.setupId;
    this.$store.dispatch('fetchViewingSetup', routerAddress)
  },
  components: {profileHeader},
  data() {
    return {
      showItem: false,
      hoveredItem: {},
    }
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
    handleMouseOver(item, index) {
      this.showItem = true;
      this.hoveredItem = item;
    },
    handleMouseLeave() {
      this.showItem = false;
      this.hoveredItem = {};
    }
  }
}
</script>

<style scoped>

.main-container {
  position: relative;
  width: 800px;
  max-width: 1200px;
  margin: 0 auto;
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
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
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
  position: relative;
  transition: .1s ease-in-out;
  cursor: pointer;
  margin-bottom: 10px;
}

.icon {
    height: 40px;
    width: auto;
}

.item-text {
  padding: 10px 5px 5px 5px;
  text-align: center;
}

.comp-details {
  background: rgb(13, 13, 118);
  width: 250px;
  min-height: 75px;
  display: flex;
  flex-direction: column;
}

.comp-details > * {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgb(13, 13, 118);
    width: 100%;
    min-height: 75px;
    font-size: 16px;
    color: white;
}

.other-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.hovered-item {
  position: absolute;
  z-index: 100000
}

</style>