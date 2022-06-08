<template>
<div class="main-container">

    <!-- COMPUTER -->
    <div v-for="(item, index) in $store.getters.setup($route.params.id).items" :key="item">
        <div
            style=" font-size: 14px; margin-right: 20px;"
            v-if="item.category === 'computer'"
            @click.stop="$emit('toggleItemDisplay', index)"
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
            <div
                class="comp-details"
                v-if="item.categoryDetails.cpu"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">CPU:</span>
                    <span>{{item.categoryDetails.cpu}}</span>
                </div>
            </div>
            <!-- GPU -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.gpu"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">GPU:</span>
                    <span>{{item.categoryDetails.gpu}}</span>
                </div>
            </div>
            <!-- SSD -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.ssd"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">SSD:</span>
                    <span>{{item.categoryDetails.ssd}}</span>
                </div>
            </div>
            <!-- RAM -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.ram"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">RAM:</span>
                    <span>{{item.categoryDetails.ram}}</span>
                </div>
            </div>
            <!-- CASE -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.case"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span style="border:1px solid white; padding: 1px 3px; margin-bottom: 5px;">CASE:</span>
                    <span>{{item.categoryDetails.case}}</span>
                </div>
            </div>

        </div>
    </div>


    <!-- OTHER ITEMS LIST -->
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
                @mouseup="test"
                @click.stop="$emit('toggleItemDisplay', index), reorderItems(element, index)"
                v-if="element.category != 'computer'"
            >   
                <!-- ICON -->
                <img class="icon" 
                    :src="getIconPic(element)"
                    :alt="element.category"
                    v-if="element.category"
                />
                <!-- NAME -->
                <p style="padding: 10px 5px 5px 5px; text-align: center;">
                {{element.name}}
                </p>
                <!-- STORE LINK -->
                <!-- <a :href="element.url"
                    class="store-link"
                    target="_blank"
                    v-if="element.url"
                    >Visit Store
                </a> -->
            </div>


        </template>
        
    </draggable>

    <!-- PLACEHOLDER -->
    <div class="placeholder"
        v-if="$store.getters.setup($route.params.id).items.length === 0"
    >
    Add your equipment info by clicking on your setup's image!
    </div>

</div>

    <!-- <p style="font-size: 14px; opacity: 0.75; margin-top: 10px"
       v-if="$store.getters.setup($route.params.id).items.length > 1"
    >
    *drag to reorder
    </p> -->

  <!-- <div>{{$store.getters.setup($route.params.id).items}}</div> -->

</template>

<script>
import draggable from 'vuedraggable'

export default {
    emits: ["toggleItemDisplay"],
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
        reorderItems(element, index) {
            const setupId = this.$route.params.id
            console.log(this.$store.getters.setup(this.$route.params.id).items)
            this.$store.dispatch('saveItem', { index, setupId, item: element})

            // TODO: WHY INDEX IS NOT MATCHING UP WHEN ITEM IS CLICKED?
        },
        test() {
            console.log('test')
            // TODO: WHY DOESN'T MOUSEUP WORK TO SAVE THE ORDER???
        }
    }
}
</script>

<style scoped>

.main-container {
    margin-top: 10px;
    margin-bottom: 50px;
    display: flex;
    align-items: flex-start;
    /* border: 1px solid pink; */
    width: 800px;
    position: relative;
}

.placeholder {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    border: 2px dashed;
    height: 200px;
    width: 100%;
    text-align: center;
    opacity: 0.5;
    cursor: default;
}

.items-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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

.comp-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: rgb(13, 13, 118);
    width: 100%;
    min-height: 75px;
    font-size: 16px;
    color: white;
    position: relative;
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

.icon {
    height: 40px;
    width: auto;
}

</style>