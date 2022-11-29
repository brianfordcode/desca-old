<template>

    <!-- PROFILE ICON AND LOG IN/OUT -->
    <div class="prof-img-container" v-if="profileDetails" @click="openProfDetails()" title="edit details">
        <img
            class="profile-icon"
            :src="profileDetails.profPic"
            
            alt="prof-icon"
        >
        <p class="log-in-btn">&#9660;</p>
    </div>


    <!-- MODAL -->
    <div class="modal-container" v-if="editDetailsToggle">
        <div class="details-box-wrapper">

            <!-- BUTTONS -->
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

            <detailsChangeBox :editProfileDetails="editProfileDetails"/>
        
        </div>
    </div>

</template>

<script>
import detailsChangeBox from './profile-header/details-change-box.vue'

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}

export default {
    data() {
        return {
            editProfileDetails: null,
            editDetailsToggle: false,
        }
    },
    components: { detailsChangeBox },

    methods: {
        logIn() {
            if (!this.$store.state.loggedIn) { this.$store.dispatch('logIn') }
        },
        openProfDetails() {
            this.editDetailsToggle = !this.editDetailsToggle
            this.editProfileDetails = copy(this.profileDetails)
        },
        discardChanges() {
            this.editDetailsToggle = !this.editDetailsToggle
        },
        submit() {
            this.editProfileDetails.profPic = this.$store.getters.getProfileDetails(this.$route.params.user).profPic //IF NEW PROFPIC IS UPLOADED
            this.$store.dispatch('changeDetails', { details: this.editProfileDetails, user: this.$store.state.user.uid})

            this.editDetailsToggle = false
        },
        logOut() {
            this.$store.dispatch('logOut')

        }
    },
    computed: {
        profileDetails() {
            return this.$store.getters.getProfileDetails(this.$route.params.user)
        }
    }

}


</script>

<style scoped>
.modal-container {
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.details-box-wrapper {
    background-color: rgba(255,255,255,0.85);
    height: 420px;
    width: 300px;
    border-radius: 15px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    top: 0;
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
.prof-img-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    height: auto;
}

.profile-icon {
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
    width: 30px;
}

.log-in-btn {
    margin-left:5px;
    color: white;
    cursor: pointer
}


</style>