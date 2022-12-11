<template>

    <div
        class="container"
        v-if="$store.state.shareModalOpen"
    >
        <div class="modal">
            <!-- BUTTONS -->
            <div
                class="close-btn btn"
                @click="close()"
            >
                Close
            </div>
            <div class="copy-btn btn">
                Copy Link
            </div>

            <!-- LINK -->
            <div class="link">Share Link</div>
        </div>
    </div>

</template>

<script>


export default {
    data() {
        return {

        }
    },
    methods: {
        close() {
            this.$store.dispatch('toggleShareModal')
        }
    }
}

</script>

<style scoped>

.container {
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999999999999999999;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    animation:  fadeIn .175s; 
}

.modal {
    background-color: rgba(255,255,255,0.85);
    height: 200px;
    width: 350px;
    border-radius: 15px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    animation:  fadeIn .25s; 
}

.btn {
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 6px;
    position: absolute;
    cursor: pointer;
}
.close-btn {
    top: 0;
    right: 0;
    background-color: rgb(182, 13, 13);
    border-top-right-radius: 10px;
}

.copy-btn {
    bottom: 0;
    right: 0;
    background-color: rgb(11, 129, 25);
    border-bottom-right-radius: 10px;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>