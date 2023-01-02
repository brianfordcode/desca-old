<template>

  <div
    class="img-main-container round-edges"
    @mousemove = "onMouseMove"
    @mouseup = "dragging = null"
    @mouseleave="dragging = null"
    ref = "imagesContainer"
    v-if="imageURL"
  >

    <!-- UPLOAD BTN (BOTTOM LEFT CORNER) WHEN PIC LOADED -->
    <label
      class="green bottom-left-btn btn"
      for="input"
      title="upload new setup image"
    >
      <img class="icon" src="../../assets/nav-icons/upload-icon.png" alt="upload-icon">
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
        :class="{'target': true, 'circle': true, 'hovered-target': targetHoverIndex === index }"
        @dblclick.stop="displayedItemIndex = displayedItemIndex === index ? null : index, hoveredItem = null"
        @mousedown="(dragging = index, this.hoveringOnTarget = false)"
        @mouseup = "this.hoveringOnTarget = true"
        @mouseenter="(handleMouseOver(item, index), hoveringOnTarget = true)"
        @mouseleave="((this.targetHoverIndex = null, this.hoveredItem = null), hoveringOnTarget = false)"
        alt="target"
        draggable="false"
        :style="{
                  top: (item.y - 20) + 'px',
                  left: (item.x - 20) + 'px'
                }"
      >
      </div>

      <!-- DETAILS BOX -->
      <div
        class="details-container"
        v-if="displayedItemIndex === index"
      >
        <div class="details-box round-edges">

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
                />
            </div>

          </div>

          <!-- MODEL -->
          <div style="margin-top: 10px; display: flex; justify-content: space-around;">
            <div>
              
              <div style="display: flex; transform: translateX(-15px);">
                <p style="color: white;">Category:</p>
                <p style="color: white; padding-left: 5px; text-transform: capitalize;">{{itemToPreview ? itemToPreview : '&#x21e7; Choose above &#x21e7;' }}</p>
              </div>
              
              <div
                class="details-text-wrapper"
                v-if="item.category != 'computer'"
              >
                  <p style="color:white">Model:</p>
                  <input v-model="item.name"/>
              </div>
              
              <!-- COMPUTER DETAILS (ONLY IF CATEGORY IS COMPUTER) -->
              <div
                style="margin-bottom: 15px;"
                v-if="item.category === 'computer'"
              >
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
            <div
                class="bottom-right-btn btn green"
                @click.stop="save"
            >
            <img class="icon" src="../../assets/nav-icons/submit-icon.png" alt="submit-icon">
            </div>
            <div
              class="top-right-btn btn red"
              @click.stop="removeItem(index)"
            >
            <img class="icon" src="../../assets/nav-icons/remove-icon.png" alt="delete-btn">
            </div>
            <div
              class="red bottom-left-btn btn"
              @click.stop="discardChanges()"
            >
            <img class="icon" src="../../assets/nav-icons/discard-icon.png" alt="discard-icon">
          </div>

        </div>
      </div>
  
    </div>

      <!-- HELPTIP LOWER CORNER -->
    <p class="bottom-right-btn btn helptip">{{helpTip}}</p>

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
  @hovering="(index => this.targetHoverIndex = index), hoveringOnListItem = true "
  @leaving="(this.targetHoverIndex = null, hoveringOnListItem = false)"
  :targetHoverIndex = this.targetHoverIndex
/>

</template>

<script>
import itemList from './items-list.vue'
import { downloadPic } from "../../manage-pic.js"
import loadingWheel from "../loading-wheel.vue"

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

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
      targetHoverIndex: null,
      itemChoices: [
        {
          name: 'accessory',
          pic: require('../../assets/item-icons/accessory.png')
        },
        {
          name: 'chair',
          pic: require('../../assets/item-icons/chair.png')
        },
        {
          name: 'computer',
          pic: require('../../assets/item-icons/computer.png')
        },
        {
          name: 'desk',
          pic: require('../../assets/item-icons/desk.png')
        },
        {
          name: 'headset',
          pic: require('../../assets/item-icons/headset.png')
        },
        {
          name: 'keyboard',
          pic: require('../../assets/item-icons/keyboard.png')
        },
        {
          name: 'microphone',
          pic: require('../../assets/item-icons/microphone.png')
        },
        {
          name: 'monitor',
          pic: require('../../assets/item-icons/monitor.png')
        },
        {
          name: 'mouse',
          pic: require('../../assets/item-icons/mouse.png')
        },
        {
          name: 'speaker',
          pic: require('../../assets/item-icons/speaker.png')
        },
        {
          name: 'webcam',
          pic: require('../../assets/item-icons/webcam.png')
        },
      ],
      hoveringOnListItem: false,
      hoveringOnTarget: false,
    }
  },
  components: {
    itemList, loadingWheel
  },
  async created() {
    await this.refreshImageURL()
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
    helpTip() {
        if (this.hoveringOnTarget) {
          return 'Click to move. Double click to edit.'
        } else if (this.hoveringOnListItem) {
          return 'Click and drag to switch order.'
        }
    }
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
      this.$store.dispatch('removeItem', { setupId: this.$route.params.setupId, index })
      this.$store.dispatch('openActionModal', {text: 'item deleted', color: 'red'})
    },
    handleMouseOver(item, index) {
      this.hoveredItem = this.hoveredItem === index ? null : index;
      this.targetHoverIndex = index
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
      this.$store.dispatch('openActionModal', {text: 'item submitted', color: 'green'})

    },
    itemChosen(name, index) {
      this.items[this.displayedItemIndex].category = name
      this.itemChoiceIndex = index
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

  .target {
  position: absolute;
  height: 40px;
  width: 40px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  }

  .target:hover {
    background-color: rgba(255,255,255,.75);
  }
  .hovered-target {
    background-color: rgba(255,255,255,.9);
    transform: scale(1.5);
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
    z-index: 10000;
  }

  .details-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 40px 20px 40px 20px;
    background-color: rgb(13, 13, 118);
    z-index: 1000000;
    user-select: none;
    width: 400px;
  }

  .details-box input {
    height: 30px;
    width: 200px;
    border: 1px solid;
    outline: none;
    padding-left: 5px;
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
    transform: scale(1.9);
  }

  .helptip {
    width: fit-content;
    font-size: 14px; background: rgba(0,0,0,0.5);
  }

</style>