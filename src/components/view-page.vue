<template>

  <div
    class="main-container"
    v-if="$store.state.viewingSetupLoaded && imageURL"
  >

    <!-- MAIN IMAGE -->
    <div class="image-container">

      <!-- DETAILS BOX -->
      <div
        class="item-wrapper hovered-item round-edges"
        v-if="showItem"
          :style="{
            top: (this.detailBlockPlacement.y) + 'px',
            left: (this.detailBlockPlacement.x) + 'px'
          }"
        @mouseleave="handleMouseLeave"
      >
      <VueResizer emitOnMount @notify="sizeChange"/>
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

          <a :href="item.url ? item.url : null" target="_blank" class="item-target"
          :style="`
            display: flex;
            justify-content: space-around;
            align-items: center;
            top: ${item.y - 25}px;
            left: ${item.x - 25}px;
            background: ${item === hoveredItem ? `rgba(255,255,255,1)` : `rgba(255,255,255,0);`};
            z-index: ${item === hoveredItem ? `10000000` : `0`};
            cursor: ${item.url ? 'pointer' : 'default'};
          `"
          @mouseover="handleMouseOver(item)"
          @mouseleave="handleMouseLeave">
            <img
              src="../assets/shopping-cart.png"
              alt="shopping-cart"
              v-if="(item === hoveredItem && item.url)"
              style="height: 70%; opacity: 0.5;"
            >
          </a>
     
      </div>
      
      <!-- IMAGE -->
      <img
        class="main-img"
        :src="imageURL"
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
              @mouseover="hoveredItem = item; handleMouseOver(item)"
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
          v-for="item in nonComputerItems"
          :key="item"
        >
          <div class="item-wrapper round-edges"
              v-if="item.category != 'computer'"
              @click="goToUrl(item)"
              :style="`
                cursor: ${!item.url ? 'pointer' : 'default'};
                transform: scale(${item === hoveredItem ? '1.05' : '1'})
              `"
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

  <!-- SPINNING WHEEL WHILE LOADING MAIN IMG -->
  <div v-else style="height: 300px; width: 800px; display: flex; justify-content: space-around; align-items: center;">
    <loadingWheel/>
  </div>

</template>

<script>
import VueResizer from '../vender/vue-resizer'
import { downloadPic } from '../manage-pic.js'
import loadingWheel from "./loading-wheel.vue"

export default {
  async created() {
    const routerAddress = this.$route.params.setupId
    this.$store.dispatch('fetchViewingSetup', routerAddress)

    this.refreshImageURL()
  },
  components: { VueResizer, loadingWheel },
  data() {
    const setup = this.$store.getters.setup(this.$route.params.setupId)

    return {
      showItem: false,
      hoveredItem: {},
      detailBoxDimensions: {width: null, height: null},
      imageURL: null,
      setup
    }
  },
  methods: {
    getIconPic(e) {
      if (e.category === 'accessory') {
          return require('@/assets/item-icons/accessory.png')
      }
      if (e.category === 'chair') {
          return require('@/assets/item-icons/chair.png')
      }
      if (e.category === 'computer') {
          return require('@/assets/item-icons/computer.png')
      }
      if (e.category === 'desk') {
          return require('@/assets/item-icons/desk.png')
      }
      if (e.category === 'headset') {
          return require('@/assets/item-icons/headset.png')
      }
      if (e.category === 'keyboard') {
          return require('@/assets/item-icons/keyboard.png')
      }
      if (e.category === 'microphone') {
          return require('@/assets/item-icons/microphone.png')
      }
      if (e.category === 'monitor') {
          return require('@/assets/item-icons/monitor.png')
      }
      if (e.category === 'mouse') {
          return require('@/assets/item-icons/mouse.png')
      }
      if (e.category === 'speaker') {
          return require('@/assets/item-icons/speaker.png')
      }item-icons
      if (e.category === 'webcam') {
          return require('@/assets/item-icons/webcam.png')
      }
    },
    async refreshImageURL() {
      const key = `${this.setup.user}/${this.$route.params.setupId}`
      const url = await downloadPic(key)
      this.imageURL = url
    },
    handleMouseOver(item, index) {
      this.showItem = true;
      this.hoveredItem = item;
    },
    handleMouseLeave() {
      this.showItem = false;
      this.hoveredItem = {};
    },
    sizeChange({width, height}) {
      this.detailBoxDimensions.width = width;
      this.detailBoxDimensions.height = height;
    },
    goToUrl(item) {
      if (item.url) { window.open(item.url, '_blank');}
    }
  },
  computed: {
    detailBlockPlacement() {
      if (!this.hoveredItem) return null
      const x = this.hoveredItem.x >= 400 ? this.hoveredItem.x - this.detailBoxDimensions.width : this.hoveredItem.x
      const y = this.hoveredItem.y >= 300 ? this.hoveredItem.y - this.detailBoxDimensions.height : this.hoveredItem.y
      return { x, y }
    },
    nonComputerItems() {
      return this.$store.state.viewingSetup.items.filter(item => { return item.category != 'computer'})
    }
  }
}
</script>

<style scoped>

.main-container {
  position: relative;
  width: 800px;
  margin: 0 auto;
}

/* MAIN IMAGE */
.main-img {
  width: 100%;
  height: 100%;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.item-target {
  position: absolute;
  height:50px;
  width: 50px;
  border-radius: 50%;
}

/* ITEMS */
.item-container {
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-top: 10px;
}

.item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(13, 13, 118);
  width: 227px;
  min-height: 75px;
  color: white;
  padding: 15px;
  position: relative;
  transition: .1s ease-in-out;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 15px;
}

.hovered-item {
  position: absolute;
  z-index: 100000;
}

</style>