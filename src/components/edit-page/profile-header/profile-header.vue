<template>
  <div class="container" v-if="profileDetails">
    <!-- PROF PIC -->
      <div class="prof-pic">
        <!-- WHY ERROR 403 SOMETIMES FOR MAIN IMG??? -->
        <img draggable="false" 
             style="width: 100px; height: auto;"
             :src="profileDetails.profPic"
             v-if="profileDetails.profPic"
        />
      </div>

      

      <div class="details">

        <!-- NAME -->
        <h1 class="prof-name">{{ profileDetails.profName }}</h1>

        <!-- LINKS -->
        <div class="links-wrapper">

          <!-- TWITCH -->
          <a
            v-if="profileDetails.socialLinks.twitchLink"
            :href="profileDetails.socialLinks.twitchLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/twitch-logo.png"
              alt="twitch"
            />
          </a>
          <!-- TWITTER -->
          <a
            v-if="profileDetails.socialLinks.twitterLink"
            :href="profileDetails.socialLinks.twitterLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/twitter-logo.png"
              alt="twitter"
            />
          </a>
          <!-- YOUTUBE -->
          <a
            v-if="profileDetails.socialLinks.youtubeLink"
            :href="profileDetails.socialLinks.youtubeLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/youtube-logo.png"
              alt="youtube"
            />
          </a>
          <!-- DISCORD -->
          <a
            v-if="profileDetails.socialLinks.discordLink"
            :href="profileDetails.socialLinks.discordLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/discord-logo.png"
              alt="discord"
            />
          </a>
          <!-- FACEBOOK -->
          <a
            v-if="profileDetails.socialLinks.facebookLink"
            :href="profileDetails.socialLinks.facebookLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/facebook-logo.png"
              alt="facebook"
            />
          </a>
          <!-- WEBSITE -->
          <a
            v-if="profileDetails.socialLinks.websiteLink"
            :href="profileDetails.socialLinks.websiteLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              src="/social-links/website-logo.png"
              alt="website"
            />
          </a>

        </div>
            
        <!-- EDIT DETAILS BUTTON -->
        <button
            class="edit-btn btn"
            @click="enterBtn()"
            ref="textToggle"
            v-if="$route.name != 'View'"
        >
        {{!this.editOpen ? "Change Profile Details" : 'SUBMIT'}}
        </button>


        <!-- PROFILE CHANGE DETAILS BOX -->
        <detailsChangeBox
          :editProfileDetails="editProfileDetails"
          v-if="editOpen"
        />

      </div>

</div>

<div v-else>loading</div>

</template>

<script>
import detailsChangeBox from './details-change-box.vue'

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}


  export default {
    created() {
      const routerUser = this.$route.params.user;
      this.$store.dispatch('fetchUserDetails', routerUser)
    },
    components: {
      detailsChangeBox
    },
    data() {
      return {
        editOpen: false,
        editProfileDetails: null,
      }
    },
    methods: {
      uploadProfImg() { 
        console.log('profile picture upload')
      },
      enterBtn() {
        this.editOpen = !this.editOpen

        if (this.editOpen) {
          this.editProfileDetails = copy(this.profileDetails)
        } else {
          this.$store.dispatch('changeDetails', { details: this.editProfileDetails, user: this.$store.state.user.uid})
        }
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
  .container {
    width: 800px;
    height: 80px;
    /* margin: 0 auto; */
    /* background-color: rgba(109, 109, 109, 0.5); */
    position: relative;
    display: flex;
    align-items: center;
    /* border-radius: 7px; */
    /* box-shadow: 0px 0px 33px -20px #000000; */
  }
  
  .prof-pic {
    position: absolute;
    height: 100px;
    width: auto;
    overflow: hidden;
    border-radius: 100px;
    background-color: grey;
    transform: translate(30px);
    box-shadow: 0px 0px 33px -20px #000000;
  }
  .prof-name {
    height: min-content;
    /* border: 1px solid blue; */
  }
  .details {
    transform: translateX(145px);
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
  }
  .edit-btn {
    /* position: absolute; */
    width: 150px;
    height: 25px;
  }
  .btn {
    background: green;
    color: white;
    padding: 5px;
    cursor: pointer;
    border: none;
    
  }
  .enter-btn {
    position: absolute;
    /* TODO: organize button layout better */
    bottom: 0;
    right: 0;
  }
  .sm-logo {
    height: 25px;
  }
  .links-wrapper a:not(:last-child) {
    margin-right: 5px;
  }

</style>