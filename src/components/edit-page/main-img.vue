<template>

<div
  class="img-main-container"
  @mousemove = "onMouseMove"
  @mouseup = "dragging = null"
  @mouseleave="dragging = null"
  ref = "imagesContainer"
  v-if="imageURL && imageURL !='no image'"
>

  <!-- UPLOAD BTN (BOTTOM LEFT CORNER) WHEN PIC LOADED -->
  <input
    class="add-image-btn"
    type="file"
    @change="addMainImg"
  />
  
  <!--  ITEM TARGETS  -->
  <div v-for="(item, index) in items" :key="index">
    <div
      class="target"
      @dblclick.stop="displayedItemIndex = displayedItemIndex === index ? null : index, hoveredItem = null"
      @mousedown="dragging = index"
      @mouseenter="handleMouseOver(item, index)"
      @mouseleave="hoveredItem = null"
      alt="target"
      draggable="false"
      :style="{
                top: (item.y - 13) + 'px',
                left: (item.x - 13) + 'px'
              }"
  ></div>

    <!-- TOOLTIP ON HOVER -->
    <p
      class="tooltip"
      v-if="hoveredItem === index"
      :style="{
                top: (item.y + 20) + 'px',
                left: (item.x - 55) + 'px'
              }"
    >
    Click to move<br>Double click to edit
    </p>

    <!-- DETAILS BOX -->
    <div class="details-box"
          v-if="displayedItemIndex === index"
          :style="{
            top: (this.detailBlockPlacement.y) + 'px',
            left: (this.detailBlockPlacement.x ) + 'px'
          }"
          
    >
      <VueResizer emitOnMount @notify="sizeChange"/>
      <!-- CATEGORY SELECTION -->
      <div class="details-text-wrapper">
          <p style="color:white">Category:</p>
          <select
              name="category"
              id="category" 
              v-model="item.category"
              style="width:200px; height: 30px;"
          >
              <option value="none" disabled>Select Category</option>
              <option value="keyboard">Keyboard</option>
              <option value="monitor">Monitor</option>
              <option value="speaker">Speaker</option>
              <option value="chair">Chair</option>
              <option value="desk">Desk</option>
              <option value="mouse">Mouse</option>
              <option value="computer">Computer</option>
              <option value="microphone">Microphone</option>
              <option value="accessory">Accessory</option>
              <option value="webcam">Webcam</option>
              <option value="headphone">Headphone</option>
          </select>
      </div>
      <!-- MODEL -->
      <div
        class="details-text-wrapper"
        v-if="item.category != 'computer'"
      >
          <p style="color:white">Model:</p>
          <input v-model="item.name"/>
      </div>
      <!-- COMPUTER DETAILS (ONLY IF CATEGORY IS COMPUTER) -->
      <div
        class="computer-details"
        v-if="item.category === 'computer'"
      >
        <p style="color: white; padding-top: 10px;">Specs:</p>
        <div class="details-text-wrapper">
          <p style="color:white">CPU:</p>
          <input v-model="item.categoryDetails.cpu"/>
        </div>
        <div class="details-text-wrapper">
          <p style="color:white">GPU:</p>
          <input v-model="item.categoryDetails.gpu"/>
        </div>
        <div class="details-text-wrapper">
          <p style="color:white">SSD</p>
          <input v-model="item.categoryDetails.ssd"/>
        </div>
        <div class="details-text-wrapper">
          <p style="color:white">RAM</p>
          <input v-model="item.categoryDetails.ram"/>
        </div>
        <div class="details-text-wrapper">
          <p style="color:white">case:</p>
          <input v-model="item.categoryDetails.case"/>
        </div>
      </div>

      <!-- STORE URL -->
      <div class="details-text-wrapper">
          <p style="color:white">URL:</p>
          <input v-model="item.url"/>
      </div>

      <!-- BUTTONS -->
        <button
            class="enter-btn btn"
            @click.stop="save"
        >ENTER
        </button>
        <button
          class="remove-btn btn"
          @click.stop="removeItem(index)"
        >REMOVE
        </button>
    </div>
  
  </div>

  <!-- MAIN IMG -->
  <img class="main-img"
      draggable="false"
      @click="addItem"
      :src="imageURL"
  />

</div>

<loadingWheel v-if="!imageURL"/>

<!-- IMAGE PLACEHOLDER -->
  <input
    v-if="imageURL === 'no image'"
    class="main-img-placeholder" 
    type="file" 
    @change="addMainImg"
    accept=".jpg, .jpeg, .png"
  />

<!-- ITEM LIST -->
<itemList @toggleItemDisplay="index => displayedItemIndex = index" v-if="imageURL && imageURL !='no image'"/>

</template>

<script>
import VueResizer from '../../vender/vue-resizer'
import itemList from './items-list.vue'
import {downloadPic} from "../../manage-pic.js"
import loadingWheel from "../loading-wheel.vue"
function copy(value) {
  return JSON.parse(JSON.stringify(value))
}
// TODO: make sure target doesn't go off image-container when moving
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
  
export default {
  data() {
    const setup = this.$store.getters.setup(this.$route.params.setupId)
    const items = setup ? copy(setup.items) : []
    
    return {
      dragging: null,
      displayedItemIndex: null,
      hoveredItem: null,
      detailBoxDimensions: {width: null, height: null},
      items,
      imageURL: null,
      setup,
    }
  },
  components: {
    itemList, VueResizer, loadingWheel
  },
  async created() {
    if (this.setup.imageURL) { await this.refreshImageURL() } else {this.imageURL = "no image"; console.log(this.imageURL)}
  },
  
  watch: {
    itemsToWatch(newItems) {
      // IF NEW ITEM ADDED, SHOW ITS EDITOR. IF ITEM MOVES, DON'T SHOW EDITOR
      if (newItems.length > this.items.length) {
        this.displayedItemIndex = newItems.length - 1
      } else {
        this.displayedItemIndex = null
      }
      this.items = copy(newItems)
    }
  },
  computed: {
    setupId() {
      return this.$route.params.setupId
    },
    currentSetup() {
      return this.$store.getters.setup(this.$route.params.setupId)
    },
    currentlySelectedItem() {
      return this.currentSetup.items[this.displayedItemIndex]
    },
    detailBlockPlacement() {
      if (!this.currentlySelectedItem) return null
      const x = this.currentlySelectedItem.x >= 400 ? this.currentlySelectedItem.x - this.detailBoxDimensions.width : this.currentlySelectedItem.x
      const y = this.currentlySelectedItem.y >= 300 ? this.currentlySelectedItem.y - this.detailBoxDimensions.height : this.currentlySelectedItem.y
      return { x, y }
    },
    itemsToWatch() {
      const setup = this.$store.getters.setup(this.$route.params.setupId)
      return setup ? setup.items : []
    }
  },
  methods: {
    async addMainImg(event) {
      const currentSetupRoute = this.$route.params.setupId
      const user = this.$store.state.user
      
      this.imageURL = null
      // add loading screen here
      await this.$store.dispatch('addMainImg', {currentSetupRoute, user, image: event.target.files[0]})
      this.refreshImageURL()
      this.imageURL = this.setup.imageURL
    },
    async refreshImageURL() {
      const key = `${this.setup.user}/${this.$route.params.setupId}`
      const url = await downloadPic(key)
      this.imageURL = url
    },
    addItem(e) {
      const rect = e.target.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const setupId = this.$route.params.setupId
      this.displayedItemIndex = this.currentSetup.items.length
      const item = {
        category: '',
        name: '',
        url: '',
        x,
        y,
        categoryDetails: {},
      }
      this.$store.dispatch('addItem', { item, setupId })
    },
    removeItem(index) {
      this.displayedItemIndex = null
      this.items.splice(index, 1)
      this.$store.dispatch('removeItem', { setupId: this.$route.params.setupId, index })
    },
    handleMouseOver(item, index) {
      this.hoveredItem = this.hoveredItem === index ? null : index;
    },
    onMouseMove(event) {
        event.preventDefault()
        if (this.dragging === null) { return }
        this.hoveredItem = null;
        this.displayedItemIndex = null;
        const {x, y, width, height} = this.$refs.imagesContainer.getBoundingClientRect()
        const point = {
          x: clamp(event.clientX - x, 0, width),
          y: clamp(event.clientY - y, 0, height)
        }
        const item = this.items[this.dragging]
        item.x = point.x
        item.y = point.y
        this.$store.dispatch('saveItem', { index: this.dragging, setupId: this.setupId, item})
    },
    sizeChange({width, height}) {
      this.detailBoxDimensions.width = width;
      this.detailBoxDimensions.height = height;
    },
    save() {
      const index = this.displayedItemIndex
      this.displayedItemIndex = null
      this.$store.dispatch('saveItem', { index, setupId: this.setupId, item: this.items[index] })
    },
  },
}
  
</script>

<style scoped>
  
  .img-main-container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .main-img-placeholder {
      border: 2px dashed;
      height: 450px;
      width: 800px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      opacity: 0.5;
      cursor: pointer;
  }
  .main-img-placeholder:hover {
      opacity: 1;
  }
  
  .main-img {
    width: 100%;
    height: 100%;
    cursor: crosshair;
    display: block;
  }
  .add-image-btn {
    position: absolute;
    bottom: 0;
    color: white;
    background: green;
    padding: 7px;
    cursor: pointer;
  }
  
  .target {
    position: absolute;
    opacity: .75;
    width: 20px;
    border: 3px solid rgba(13, 13, 118,0.65);
    border-radius: 50%;
    height: 20px;
    cursor: pointer;
    transition: opacity .1s ease-in-out;
  }
  .target:hover {
      opacity: 1;
  }
  .tooltip {
    position: absolute;
    background: rgba(0,0,0,0.5);
    padding: 5px;
    color: white;
    opacity: 0.5;
    border-radius: 5px;
    font-size: 12px;
  }
  
  /* DETAILS BOX */
  .details-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 25px 20px 25px 20px;
    background-color: rgba(0,0,0,0.65);
    z-index: 1000;
  }
  .details-text-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 5px;
  }
  .details-text-wrapper p {
      padding-right: 5px;
  }
  input {
      width: 200px;
      padding: 5px;
      outline: none;
      border: none;
  }
  #category {
      outline: none;
      border: none;
  }
  .btn {
      position: absolute;
      right: 0;
      border: none;
      margin: 0;
      cursor: pointer;
      color: white;
      padding: 5px;
  }
  
  .enter-btn {
      bottom: 0;
      background-color: green;
      width: 60px;
  }
  .remove-btn {
      top: 0;
      background-color: rgb(192, 7, 7);
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


<!-- TODO: LOADING SCREEN FOR WHEN THERE IS IMAGE TO NOT HAVE PLACEHOLDER APPEAR -->
<!-- TODO: WHEN REFRESH, WHY IS IMAGEURL NOT LOADING? -->
<!-- TODO: WHEN NEW SETUP PIC IS UPLOADED, CLEAR THE ITEMS LIST? -->
