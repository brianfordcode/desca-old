<template>

<div class="loginhome-container" v-if="$store.state.loaded">

    <!-- WELCOME USER -->
    <!-- <h1
        style="color: black; padding: 10px;"
        v-if="$store.state.user"
    >
    Welcome {{ $store.state.user.displayName }}!
    </h1> -->

    <profileHeader style="z-index: 10000; margin: 35px auto 10px auto;"/>

    <h2 style="color: black; padding: 10px">My Setups:</h2>

    <div class="setup-links-container">
        <!-- LIST CONTAINER -->
        <div 
            class="setup-links"
            v-for="(setup, index) in $store.state.setups" 
            :key="setup.id"
        >
            <!-- SETUP CONTAINER -->
            <div
                class="setup-image-container"
                @mouseover="showButtons(index)"
                @mouseleave="resetButtons()"
            >
                <!-- IMAGE -->
                <img
                    draggable="false"
                    class="setup-image"
                    :src="setup.imageURL"
                    alt="main-img"
                />
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
                                    @click="$store.dispatch('deleteSetup', setup.id), resetButtons()"
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
                    <router-link :to="`/edit/${setup.id}`">
                        <div
                            class="btn edit-btn"
                            v-if="!modalOpen"
                        >
                        Edit
                        </div>
                    </router-link>
                    <!-- PREVIEW -->
                    <router-link :to="`/preview/${setup.id}`">
                        <div
                            class="btn preview-btn"
                            v-if="!modalOpen"
                        >
                        Preview
                        </div>
                    </router-link>
                    <!-- SHARE BTN -->
                    <div
                        class="btn share-btn"
                        v-if="!modalOpen"
                    >
                    Share
                    </div>
                </div>
                    
                
            </div>
            
        </div>

        <!-- PLACEHOLDER -->
        <div
            @click="makeNewSetup"
            class="placeholder"
        >
        Add a Setup!
        </div>

    </div>

</div>

<div v-else>loading</div>

    <!-- <div>{{ $store.state.setups }}</div> -->

</template>

<script>
import profileHeader from '../components/edit-page/profile-header.vue'

export default {

    components: { profileHeader },
    data() {
        return {
            modalOpen: false,
            selectedSetup: null,
        }
    },

    methods: {
        makeNewSetup() {

            const id = 'user' + this.$store.state.user.uid + '-date' + Date.now()  + '-setup' + (this.$store.state.setups.length + 1);
            
            const setup = {    
                user: this.$store.state.user.uid,
                timeCreated: Date.now(),
                id,
                imageURL: `https://picsum.photos/seed/${id}/333/255`,
                items: []
            }
            this.$store.dispatch('addSetup', setup)

            this.modalOpen = false;
            
            // open new setup
            this.$router.push(`/edit/${id}`)
        },
        showButtons(index) {
            this.selectedSetup = index
        },
        resetButtons() {
            this.selectedSetup = null
            this.modalOpen = false
        }
    }
}
</script>

<style scoped>

.loginhome-container {
    max-width: 1200px;
    margin: 60px auto 0 auto;
}

.setup-links-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 50px;
    margin: 0 auto 50px 20px;
    
}

.setup-image-container {
    position: relative;
    height: 250px;
    width: 326.47px;
}

.setup-image {
    height: 250px;
    box-shadow: 0px 0px 33px -20px #000000;
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

.preview-btn {
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
    border: 2px dashed;
    height: 250px;
    width: 326.47px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0.5;
    cursor: pointer;
}

.placeholder:hover {
    opacity: 1;
}

</style>