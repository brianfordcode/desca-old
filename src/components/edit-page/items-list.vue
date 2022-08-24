<template>
<div class="main-container">

    <!-- COMPUTER -->
    <div v-for="(item, index) in $store.getters.setup($route.params.setupId).items" :key="item"
    >
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
                    <span>CPU:</span>
                    <span>{{item.categoryDetails.cpu}}</span>
                </div>
            </div>
            <!-- GPU -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.gpu"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span>GPU:</span>
                    <span>{{item.categoryDetails.gpu}}</span>
                </div>
            </div>
            <!-- SSD -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.ssd"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span>SSD:</span>
                    <span>{{item.categoryDetails.ssd}}</span>
                </div>
            </div>
            <!-- RAM -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.ram"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span>RAM:</span>
                    <span>{{item.categoryDetails.ram}}</span>
                </div>
            </div>
            <!-- CASE -->
            <div
                class="comp-details"
                v-if="item.categoryDetails.case"
            >
                <div style="display: flex; flex-direction: column; align-items: center;"> 
                    <span>CASE:</span>
                    <span>{{item.categoryDetails.case}}</span>
                </div>
            </div>

        </div>
    </div>

    <!-- OTHER ITEMS LIST -->
    <draggable 
        v-model="setupItemsProxy"
        group="items"
        @start="drag=true"
        @end="onDragEnd"
        item-key="id"
        class="items-list-container"
    >
        <template #item="{element, index}">
            <div class="item-details"
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
            </div>

        </template>
        
    </draggable>

    <!-- PLACEHOLDER -->
    <div class="placeholder"
        v-if="$store.getters.setup($route.params.setupId).items.length === 0"
    >
    Add your equipment info by clicking on your setup's image!
    </div>

</div>

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
    computed: {
        setupId() {
            return this.$route.params.setupId
        },
        setupItemsProxy: {
            get() {
                const items = this.$store.getters.setup(this.setupId).items
                return [ ...items ]
            },
            set(items) {
                this.$store.dispatch('saveItems', { setupId: this.setupId, items })
            }

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
        reorderItems(element, index) {
            const setupId = this.$route.params.setupId
            this.$store.dispatch('saveItem', { index, setupId, item: element})
        },
        onDragEnd() {
            this.drag = false;
        }
    },
}
</script>

<style scoped>

.main-container {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
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

.icon {
    height: 40px;
    width: auto;
}

</style>