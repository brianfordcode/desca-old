<template>

<div style="max-width: 1200px; width: 90%; margin: 0 auto">

    <profileHeader style="z-index: 10000;"/>

    <h2>My Setups:</h2>

    <div
        class="setup-links-container"
        v-if="$store.state.loaded"
    >
        <!-- LIST CONTAINER -->
        <div 
            class="setup-links"
            v-for="(setup, index) in $store.state.setups"
            :key="setup.setupId"
        >
            <!-- SETUP CONTAINER -->
            <div
                class="setup-image-container"
                @mouseover="showButtons(index)"
                @mouseleave="resetButtons()"
            >
                <!-- IMAGE -->
                <div v-if="setup.imageURL" class="image-wrapper" >
                    <img
                        draggable="false"
                        :src="setup.imageURL"
                        alt="main-img"  
                    />
                </div>
                <!-- BUTTONS -->
                <div
                    class="buttons-container"
                    v-if="selectedSetup == index"
                >
                    <!-- DELETE -->
                    <div
                        class="delete-modal"
                        v-if="modalOpen"
                    >
                        <!-- MODAL -->
                        <div class="modal-content">
                                Are you sure you want<br>to delete this setup?
                            <div class="options">
                                <p
                                    class="yes-btn"
                                    @click="deleteSetup(setup.setupId)"
                                >
                                Yes
                                </p>
                                <p
                                    class="no-btn"
                                    @click="resetButtons()"
                                >
                                No
                                </p>
                            </div>
                        </div>

                    </div>
                    <!-- DELETE BTN -->
                    <div
                        class="btn delete-btn"
                        @click="modalOpen = true"
                        v-if="!modalOpen"
                    >
                    Delete
                    </div>

                    <!-- EDIT BTN -->
                    <router-link :to="`/edit/${$store.state.user.uid}/${setup.setupId}`">
                        <div
                            class="btn edit-btn"
                            v-if="!modalOpen"
                        >
                        Edit
                        </div>
                    </router-link>
                    <!-- VIEW -->
                    <router-link :to="`/${$store.state.user.uid}/${setup.setupId}`">
                        <div
                            class="btn view-btn"
                            v-if="!modalOpen"
                        >
                        View
                        </div>
                    </router-link>
                    <!-- SHARE BTN -->
                    <div
                        class="btn share-btn"
                        v-if="!modalOpen"
                        @click="share"
                    >
                    Share
                    </div>
                </div>
            
            </div>
            
        </div>

        <!-- PLACEHOLDER -->
        <div class="placeholder">
            <p style="position: absolute;">Add a Setup!</p>
            <input type="file" @change="makeNewSetup">
        </div>

    </div>

    <loadingWheel v-else style="width: 100%;"/>

</div>

</template>

<script>
import profileHeader from '../components/profile-header/profile-header.vue'
import {uploadPic, downloadPic} from "../manage-pic.js"
import loadingWheel from "../components/loading-wheel.vue"

export default {

    components: { profileHeader, loadingWheel },
    data() {
        return {
            modalOpen: false,
            selectedSetup: null,
        }
    },
    created() {
        console.log(this.$store.state.setups)
        const store = this.$store
        
        store.state.setups.forEach(setup => { 
            if (setup.imageURL === "") {
                const setupId = setup.setupId
                const user = setup.user
                store.dispatch('deleteSetup', {user, setupId})
            }
        })



    },

    methods: {
       async makeNewSetup(event) {

            const setupId = 'setup' + '-' + Date.now();
            const user = this.$store.state.user.uid         
            const key = `${user}/${setupId}`

            // UPLOAD PIC
            await uploadPic(key, event.target.files[0])
            const imageURL = await downloadPic(key)

            const setup = {    
                user,
                timeCreated: Date.now(),
                setupId,
                imageURL,
                items: []
            }

            this.$store.dispatch('addSetup', setup)

            // open new setup
            this.$router.push(`/edit/${this.$store.state.user.uid}/${setupId}`)
        },
        showButtons(index) {
            this.selectedSetup = index
        },
        resetButtons() {
            this.selectedSetup = null
            this.modalOpen = false
        },
        async deleteSetup(setupId) {
            const user = this.$store.state.user
            this.resetButtons()
            await this.$store.dispatch('deleteSetup', {user, setupId})
        },
        share() {
            console.log('share pushed')
        },
    }
}
</script>

<style scoped>

.loginhome-container {
    /* max-width: 1200px;
    width: 90%;
    margin: 0 auto; */
}

.setup-links-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
}

.setup-image-container {
    margin: 20px 20px 0 0;
    position: relative;
    height: 200px;
    width: 275px;
    overflow: hidden;
}

.image-wrapper {
    height: 110%;
    width: 100%;
    box-shadow: 0px 0px 33px -20px #000000;
    display: flex;
    justify-content: center;
}

.no-img-text {
    opacity: 0.5;
    border: 1px solid;
    height: 248px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.btn {
    position: absolute;
    color: white;
    opacity: 0.75;
    padding: 7px;
    cursor: pointer;
}

.btn:hover {
    opacity: 1;
}

.edit-btn {
    top: 0;
    background-color: rgb(245, 101, 35);
}

.delete-btn {
    bottom: 0;
    background-color: rgb(192, 7, 7);
}

.delete-modal {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(192, 7, 7, 0.25);
    z-index: 1000;
}

.delete-modal > * {
    color: white;
    text-align: center;
    
}

.options {
    margin-top: 10px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.options p {
    padding: 7px 0;
    width: 50px;
    text-align: center;
    cursor: pointer;
}

.yes-btn {
    background-color: green;
    
}

.no-btn {
    background-color: rgb(192, 7, 7);
}

.view-btn {
    top: 0;
    right: 0;
    background-color: purple;
}

.share-btn {
    bottom: 0;
    right: 0;
    background-color: rgb(88, 156, 179);
}

.placeholder {
    margin: 20px 20px 0 0;
    border: 2px dashed;
    height: 200px;
    width: 275px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0.5;
    cursor: pointer;
}

.placeholder:hover {
    opacity: 1;
}

input {
    cursor: pointer;
    height: 100%;
    width: 100%;
    opacity: 0;
}

</style>


<!-- @mouseover="$el.ownerDocument.defaultView.console.log($store.state.setups[index])" -->