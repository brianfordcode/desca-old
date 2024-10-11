<template>

<div style="max-width: 1200px; width: 90%; margin: 0 auto; height: 100vh;">

    <profileHeader/>

    <h2 style="margin-bottom: 5px;">My Setups:</h2>

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
                class="setup-image-container round-edges"
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
                                    class="round-edges red"
                                    @click="deleteSetup(setup.setupId)"
                                >
                                &#10004;
                                </p>
                                <p
                                    class="round-edges green"
                                    @click="resetButtons()"
                                >
                                &#x2715;
                                </p>
                            </div>
                        </div>

                    </div>
                    <!-- DELETE BTN -->
                    <div
                        class="btn red bottom-left-btn"
                        @click="modalOpen = true"
                        v-if="!modalOpen"
                        title="delete"
                    >
                    <img class="icon" src="../assets/nav-icons/remove-icon.png" alt="remove-icon">
                    </div>

                    <!-- EDIT BTN -->
                    <router-link :to="`/edit/${$store.state.user.uid}/${setup.setupId}`">
                        <div
                            class="btn orange top-left-btn"
                            v-if="!modalOpen"
                            title="edit"
                        >
                        <img class="icon" src="../assets/nav-icons/edit-icon.png" alt="edit-btn">
                        </div>
                    </router-link>
                    <!-- VIEW -->
                    <router-link :to="`/${$store.state.user.uid}/${setup.setupId}`">
                        <div
                            class="btn purple top-right-btn"
                            v-if="!modalOpen"
                            title="view"
                        >
                        <img class="icon" src="../assets/nav-icons/view-icon.png" alt="view-btn">
                        </div>
                    </router-link>
                    <!-- SHARE BTN -->
                    <div
                        class="btn blue bottom-right-btn"
                        v-if="!modalOpen"
                        @click="share(setup.setupId)"
                        title="share"
                    >
                    <img class="icon" src="../assets/nav-icons/share-icon.png" alt="share-btn">
                    </div>
                </div>
            
            </div>
            
        </div>


        <label for="input" class="upload-btn-wrapper round-edges">
            <img v-if="!uploading" src="../assets/nav-icons/upload-icon.png" alt="" style="filter: invert(1); height: 30px;"/>
            {{uploadProgress}}
            <input
                id="input"
                type="file"
                @change="makeNewSetup"
                accept=".jpg, .jpeg, .png"
                style="display: none;"
                :disabled="uploading"
            >
        </label>


    </div>

    <loadingWheel v-else style="width: 100%;"/>


</div>

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'
import {uploadPic, downloadPic} from "../manage-pic.js"
import loadingWheel from "../components/loading-wheel.vue"

export default {

    components: { profileHeader, loadingWheel },
    data() {
        return {
            modalOpen: false,
            selectedSetup: null,
            uploading: false
        }
    },
    created() {
        this.$store.state.setups.forEach(setup => { 
            if (setup.imageURL === "") {
                const setupId = setup.setupId
                const user = setup.user
                this.$store.dispatch('deleteSetup', {user, setupId})
            }
        })
    },
    computed: {
        uploadProgress() {
            const uploadProgress = this.$store.state.uploadProgress

            if (this.uploading) {
                if (isNaN(uploadProgress)) {
                    return uploadProgress
                } else {
                    return uploadProgress + '%'
                } 
            }      
        }
    },  

    methods: {
       async makeNewSetup(event) {

            this.uploading = true

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
            
            this.uploading = false
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
            this.$store.dispatch('openActionModal', {text: 'setup deleted', color: 'red'})
        },
        share(setupId) {
            this.$store.dispatch('toggleShareModal', setupId)
        },
    }
}
</script>

<style scoped>

.setup-links-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    overflow: hidden;
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

input {
    cursor: pointer;
    height: 100%;
    width: 100%;
    opacity: 0;
}

.upload-btn-wrapper {
    margin: 20px 20px 0 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px dashed;
    width: 275px;
    height: 190px;
    cursor: pointer;
    opacity: 0.45;
  }
  .upload-btn-wrapper:hover {
    opacity: 1;
  }

</style>