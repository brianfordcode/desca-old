<template>

    <div
        class="container"
        v-if="$store.state.shareModal.open"
    >
        <div class="modal round-edges">
            <!-- BUTTONS -->
            <div
                class="red btn top-right-btn"
                @click="close()"
                title="close"
            >
            &#x2715;
            </div>
            <div
                class="green btn bottom-right-btn"
                @click="copyLink()"
                title="copy"
            >
                <img style="height: 15px;" src="../assets/nav-icons/copy-icon.png" alt="copy-icon">
            </div>

            <!-- LINK -->
            <div style="text-align: center; width: 100%">
                <p style="margin-bottom: 10px; font-weight:bold;">Share this Setup!</p>
                <textarea class="link" disabled :value="setupId"></textarea>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    data() {
        return {
            setup: null,
        }
    },
    created() {

    },
    methods: {
        close() {
            this.$store.dispatch('toggleShareModal')
        },
        copyLink() {
            console.log(this.setupId)
        }
    },
    computed: {
        setupId() {
            const setupId = !this.$route.params.setupId ? this.$store.state.shareModal.setupId : this.$route.params.setupId 

            return 'https://www.desca.io/' + this.$route.params.user + '/' + setupId
            
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    animation:  fadeIn .25s; 
}
.link {
    outline: none;
    border: 1px solid;
    padding: 5px;
    width: 80%;
    resize: none;
  }

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>