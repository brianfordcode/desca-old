<template>

    <!-- PROFILE ICON AND LOG IN/OUT -->
    <div class="prof-img-container" v-if="profileDetails" @click="openProfDetails()" title="edit details">
        <img
            class="profile-icon"
            :src="profileDetails.profPic.photoURL"
            alt="prof-icon"
        >
        <div class="log-in-btn">&#9660;</div>
    </div>

    <!-- PROF ICON WHEN NOT LOGGED IN -->
    <img
        v-else-if="!$store.state.loggedIn"
        src="/profile-icon.png"
        alt="not-logged-in"
        title="Log In"
        style="cursor: pointer; margin-right: 25px;"
        @click="logIn()"
    >


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

            <changeDetails :editProfileDetails="editProfileDetails" style="margin: 45px;"/>
        
        </div>
    </div>

</template>

<script>
import changeDetails from './details-change-box.vue'

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
    components: { changeDetails },

    methods: {
        logIn() {
            this.$store.dispatch('logIn')
        },
        openProfDetails() {
            this.editProfileDetails = copy(this.profileDetails)
            this.editDetailsToggle = true
        },
        discardChanges() {

            const user = this.$store.state.user
            const profPicId = this.profileDetails.profPic.profPicId
            
            if (profPicId && profPicId != this.editProfileDetails.profPic.profPicId) { 
                this.$store.dispatch('deleteProfPic', {user, profPicId})
            }
            
            this.editDetailsToggle = false
        },
        submit() {

            const user = this.$store.state.user
            const profPicId = this.profileDetails.profPic.profPicId
            
            if (profPicId && profPicId != this.editProfileDetails.profPic.profPicId) { 
                this.$store.dispatch('deleteProfPic', {user, profPicId})
            }

            this.$store.dispatch('changeDetails', { details: this.editProfileDetails, user: this.$store.state.user.uid})
            
            this.editDetailsToggle = false
        },
        logOut() {
            this.editDetailsToggle = false
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
    animation:  fadeIn .175s; 
}

.details-box-wrapper {
    background-color: rgba(255,255,255,0.85);
    /* height: 450px; */
    width: 300px;
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

.discard-changes-btn {
    bottom: 0;
    left: 0;
    background-color: rgb(182, 13, 13);
    border-bottom-left-radius: 10px;
}

.submit-btn {
    bottom: 0;
    right: 0;
    background-color: rgb(11, 129, 25);
    border-bottom-right-radius: 10px;
}

.logout-btn {
    right: 0;
    top: 0;
    background-color: rgb(13, 16, 152);
    border-top-right-radius: 10px;
}
.prof-img-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    height: auto;
    margin-right: 25px;
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

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>