<template>
    <div class="container" v-if="$store.state.editDetailsOpen">
        <div class="details-box-wrapper">
            <div
                class="discard-changes-btn btn"
                @click="discardChanges()"
            >
            Discard Changes
            </div>
            <div
                class="submit-btn btn"
                @click="submit()"
            >
            Submit
            </div>
            <div
                class="logout-btn btn"
                @click="logOut()"
            >
            Log Out
            </div>
        </div>
    </div>

</template>

<script>
export default {
    created() {
    //   const routerUser = this.$route.params.user;
    //   this.$store.dispatch('fetchUserDetails', routerUser)
    },


    data() {
        return {

        }
    },

    methods: {
        discardChanges() {
            this.$store.dispatch('editDetailsOpen')
        },
        submit() {
            console.log('submit')
        },
        logOut() {
            !this.$store.state.loggedIn ? this.$store.dispatch('logIn') : this.$store.dispatch('logOut')
        }
    }

}


</script>

<style scoped>
.container {
    z-index: 10000000000;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.details-box-wrapper {
    background-color: rgba(255,255,255,0.85);
    height: 400px;
    width: 300px;
    border-radius: 10px;
    position: relative;
}

.btn {
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 6px;
    position: absolute;
    cursor: pointer;
}

.discard-changes-btn {
    right: 0;
    background-color: rgb(182, 13, 13);
    border-top-right-radius: 10px;
}

.submit-btn {
    bottom: 0;
    right: 0;
    background-color: rgb(11, 129, 25);
    border-bottom-right-radius: 10px;
}

.logout-btn {
    bottom: 0;
    left: 0;
    background-color: rgb(13, 16, 152);
    border-bottom-left-radius: 10px;
}




</style>