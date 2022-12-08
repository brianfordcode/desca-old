<template>

<div
  class="img-main-container"
  @mousemove = "onMouseMove"
  @mouseup = "dragging = null"
  @mouseleave="dragging = null"
  ref = "imagesContainer"
  v-if="imageURL"
>

<!-- UPLOAD BTN (BOTTOM LEFT CORNER) WHEN PIC LOADED -->
  <label
    class="change-image-btn"
    for="input"
  >
    Change Image
    <input
      id="input"
      type="file"
      @change="changeMainImg"
      accept=".jpg, .jpeg, .png"
      style="display: none;"
    >
  </label>

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
    <div
      class="details-container"
      v-if="displayedItemIndex === index"
    >
      <div class="details-box">

        <!-- CATEGORY SELECTION -->
        <div style="margin: 10px 0 10px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <img v-for="(item, index) in itemChoices" :key="index"
              :class="{
                'selected': index === this.itemChoiceIndex || this.itemChoices[index].name === this.items[this.displayedItemIndex].category,
                'unselected-item-choice': true,
              }"
                :title="item.name"
                :src="item.pic"
                alt="item.name"
                @click="itemChosen(item.name, index)"
              >
          </div>

          <p class="item-selected-name">{{itemToPreview}}</p>

        </div>

        <!-- MODEL -->
        <div style="display: flex; justify-content: space-around;">
          <div style="width: min-content">
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
        </div>
        </div>
        
        <!-- BUTTONS -->
          <button
              class="enter-btn btn"
              @click.stop="save"
          >Submit
          </button>
          <button
            class="remove-btn btn"
            @click.stop="removeItem(index)"
          >Remove Item
          </button>
          <button
            class="discard-btn btn"
            @click.stop="discardChanges()"
          >Discard Changes
          </button>

      </div>
    </div>
  
  </div>

  <!-- MAIN IMG -->
  <img class="main-img"
      draggable="false"
      @click="addItem"
      :src="imageURL"
  />

</div>

<loadingWheel v-else/>

<!-- ITEM LIST -->
<itemList
  @toggleItemDisplay="index => displayedItemIndex = index"
  v-if="imageURL"
/>

</template>

<script>
import itemList from './items-list.vue'
import { downloadPic } from "../../manage-pic.js"
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
      items,
      imageURL: null,
      setup,
      itemChoiceIndex: null,
      itemChoices: [
        {
          name: 'accessory',
          pic: require('../../assets/icons/accessory.png')
        },
        {
          name: 'chair',
          pic: require('../../assets/icons/chair.png')
        },
        {
          name: 'computer',
          pic: require('../../assets/icons/computer.png')
        },
        {
          name: 'desk',
          pic: require('../../assets/icons/desk.png')
        },
        {
          name: 'headset',
          pic: require('../../assets/icons/headset.png')
        },
        {
          name: 'keyboard',
          pic: require('../../assets/icons/keyboard.png')
        },
        {
          name: 'microphone',
          pic: require('../../assets/icons/microphone.png')
        },
        {
          name: 'monitor',
          pic: require('../../assets/icons/monitor.png')
        },
        {
          name: 'mouse',
          pic: require('../../assets/icons/mouse.png')
        },
        {
          name: 'speaker',
          pic: require('../../assets/icons/speaker.png')
        },
        {
          name: 'webcam',
          pic: require('../../assets/icons/webcam.png')
        },
      ]
    }
  },
  components: {
    itemList, loadingWheel
  },
  async created() {
    if (this.setup) {
        if (this.setup.imageURL) {
          await this.refreshImageURL()
        }
          this.setup.imageURL ? await this.refreshImageURL() : this.imageURL = "no image";
        }
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
    itemsToWatch() {
      const setup = this.$store.getters.setup(this.$route.params.setupId)
      return setup ? setup.items : []
    },
    itemToPreview() {
      const itemChoice = this.items[this.displayedItemIndex].category
      return itemChoice 
    },
  },
  methods: {
    async changeMainImg(event) {
      const currentSetupRoute = this.$route.params.setupId
      const user = this.$store.state.user
      this.imageURL = null
      await this.$store.dispatch('changeMainImg', {currentSetupRoute, user, image: event.target.files[0]})
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
      this.displayedItemIndex = null;
      this.itemSelected = '';
      this.items.splice(index, 1);
      this.$store.dispatch('removeItem', { setupId: this.$route.params.setupId, index });
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
    save() {
      const index = this.displayedItemIndex
      this.displayedItemIndex = null
      this.itemChoiceIndex = null
      this.itemSelected = '';
      this.$store.dispatch('saveItem', { index, setupId: this.setupId, item: this.items[index] })
    },
    itemChosen(name, index) {
      this.items[this.displayedItemIndex].category = name
      this.itemChoiceIndex = index
      console.log(this.itemChoices[index].name === this.items[this.displayedItemIndex].category)
    },
    discardChanges() {
      this.items[this.displayedItemIndex].category = this.currentSetup.items[this.displayedItemIndex].category
      this.displayedItemIndex = null
      this.itemChoiceIndex = null
    },
  },
}
  
</script>

<style scoped>
  
  .img-main-container {
    position: relative;
    height: 100%;
    width: 800px;
  }
  .main-img {
    width: 100%;
    height: 100%;
    cursor: crosshair;
    display: block;
    user-select: none;
  }
  .change-image-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.75;
    background: green;
    color: white;
    cursor: pointer;
    padding: 3px 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }
  .change-image-btn:hover {
    opacity: 1;
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

  .details-container {
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
  }

  .details-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    padding: 40px 20px 40px 20px;
    background-color: rgb(13, 13, 118);
    z-index: 1000;
    border-radius: 15px;
    user-select: none;
    width: 375px;
  }

  .details-box input {
    height: 30px;
    width: 200px;
    border: 1px solid;
    outline: none;
    padding-left: 5px;
    /* opacity: 0; */
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

  .unselected-item-choice {
    height: 20px;
    cursor: pointer;
    opacity: 0.25
  }
  
  .unselected-item-choice:hover {
    opacity: 1;
  }
  .selected {
    opacity: 1;
    transform: scale(1.8);
  }

  .item-selected-name {
    text-transform: capitalize;
    height: 22px;
    color: white;
    text-align: center;
    margin-top: 20px;
  }

  #category {
      outline: none;
      border: none;
  }
  .btn {
      position: absolute;
      border: none;
      margin: 0;
      cursor: pointer;
      color: white;
      font-size: 14px;
      padding: 6px;
      font-weight: bold;
  }
  
  .enter-btn {
      bottom: 0;
      right: 0;
      background-color: green;
      width: 60px;
      border-bottom-right-radius: 10px;
  }
  .discard-btn {
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 10px;
    background-color: rgb(192, 7, 7);
  }
  .remove-btn {
      border-top-right-radius: 10px;
      top: 0;
      right: 0;
      background-color: rgb(192, 7, 7);
  }

</style>

<!-- TODO: WHEN REFRESH, WHY IS IMAGEURL NOT LOADING? -->
<!-- TODO: CONVERT TARGETS TO % SO MOBILE SUPPORTED -->