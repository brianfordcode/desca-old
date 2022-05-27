<template>
<div class="main-container">


      <!-- PLACEHOLDER -->
    <div class="placeholder"
        v-if="$store.getters.setup($route.params.id).items.length === 0"
    >
    Add your equipment info by clicking on your setup's image!
    </div>

    <!-- ITEMS LIST -->
    <draggable 
        v-model="$store.getters.setup($route.params.id).items"
        group="items"
        @start="drag=true" 
        @end="drag=false" 
        item-key="id"
        class="items-list-container"
    >
        <template #item="{element, index}">
            <div class="item-details"
                @click.stop="$emit('toggleItemDisplay', index)"
            >
            <!-- ICON -->
            <img class="icon" 
                    :src="getIconPic(element)"
                    :alt="element.category"
                    v-if="element.category"
                    style="height: 50px;"
                />
                <!-- NAME -->
                <p
                    style=" padding-left: 10px"
                    v-if="element.category != 'computer'"
                >
                {{element.name}}
                </p>
                <!-- IF COMPUTER -->
                <div 
                    class="computer-details"
                    style=" font-size: 14px; padding-left: 10px"
                    v-if="element.category === 'computer'"
                >
                    <p>CPU: {{element.categoryDetails.cpu}}</p>
                    <p>GPU: {{element.categoryDetails.gpu}}</p>
                    <p>SSD: {{element.categoryDetails.ssd}}</p>
                    <p>RAM: {{element.categoryDetails.ram}}</p>
                    <p>Case: {{element.categoryDetails.case}}</p>
                </div>
                <!-- STORE LINK -->
                <a :href="element.url"
                    class="store-link"
                    target="_blank"
                    v-if="element.url"
                    >Visit Store
                </a>
            </div>
        </template>
    </draggable>

    <p style="font-size: 14px; color: white; opacity: 0.5; margin-top: 10px"
       v-if="$store.getters.setup($route.params.id).items.length > 1"
    >
    *drag to reorder
    </p>

</div>

  <!-- <div>{{$store.getters.setup($route.params.id).items}}</div> -->

</template>

<script>
import draggable from 'vuedraggable'

export default {
    data() {
        return {
            drag: false,
            draggable: false,
        }
        
    },
    components: { draggable },

    methods: {
        getIconPic(e) {
            if (e.category === 'accessory') {
                // return require('@/assets/icons/accessory.png')
            }
            if (e.category === 'chair') {
                // return require('@/assets/icons/chair.png')
            }
            if (e.category === 'computer') {
                // return require('@/assets/icons/computer.png')
            }
            if (e.category === 'desk') {
                // return require('@/assets/icons/desk.png')
            }
            if (e.category === 'headset') {
                // return require('@/assets/icons/headset.png')
            }
            if (e.category === 'keyboard') {
                // return require('@/assets/icons/keyboard.png')
            }
            if (e.category === 'microphone') {
                // return require('@/assets/icons/microphone.png')
            }
            if (e.category === 'monitor') {
                // return require('@/assets/icons/monitor.png')
            }
            if (e.category === 'mouse') {
                // return require('@/assets/icons/mouse.png')
            }
            if (e.category === 'speaker') {
                // return require('@/assets/icons/speaker.png')
            }
            if (e.category === 'webcam') {
                // return require('@/assets/icons/webcam.png')
            }
        },
    }
}
</script>

<style scoped>

.main-container {
    margin-top: 10px;
    margin-bottom: 50px;
}

.placeholder {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px dashed;
    height: 200px;
    text-align: center;
    opacity: 0.5;
    cursor: default;
}

.items-list-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    width: min-content;
    /* border: 1px solid black; */
}

.item-details {
    display: flex;
    border: 1px solid;
    border-radius: 7px;
    width: 227px;
    min-height: 60px;
    padding: 15px;
    position: relative;
    transition: .1s ease-in-out;
    cursor: grab;
}

.item-details:hover {
    transform: scale(1.01);
}

.item-details:active {
    cursor: grabbing;
}

.store-link {
    position: absolute;
    opacity: 0.75;
    bottom: 0;
    right: 0;
    padding: 10px;
    text-decoration: none;
    color: white;
    background-color: green;
    transition: .1s ease-in-out;
    border-bottom-right-radius: 7px;
}

.store-link:hover {
    opacity: 1;
}



</style>