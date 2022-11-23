<template>

    <div class="details-box">
      
      <form class="details-text">

        <!-- PROFILE NAME -->
        <div class="name-input input">
            <p style="padding-right: 5px">Name</p>
            <input type="text" v-model="editProfileDetails.profName"/>
        </div>

        <!-- UPLOAD PROFILE PICTURE -->
        <label for="input" class="upload-btn-wrapper btn">
          upload profile pic
          <input
            id="input"
            type="file"
            @change="uploadProfImg"
            accept=".jpg, .jpeg, .png"
            style="display: none;"
          >
        </label>

        <!-- TWITCH -->
        <div class="twitch input">
            <img src="/social-links/twitch-logo.png" alt="twitch"/>
            <input v-model="editProfileDetails.socialLinks.twitchLink" type="url">
        </div>
        <!-- TWITTER -->
        <div class="twitter input">
            <img src="/social-links/twitter-logo.png" alt="twitter"/>
            <input v-model="editProfileDetails.socialLinks.twitterLink" type="url">
        </div>
        <!-- YOUTUBE -->
        <div class="youtube input">
            <img src="/social-links/youtube-logo.png" alt="youtube"/>
            <input v-model="editProfileDetails.socialLinks.youtubeLink" type="url">
        </div>
        <!-- DISCORD -->
        <div class="discord input">
            <img src="/social-links/discord-logo.png" alt="discord"/>
            <input v-model="editProfileDetails.socialLinks.discordLink" type="url">
        </div>
        <!-- FACEBOOK -->
        <div class="facebook input">
            <img src="/social-links/facebook-logo.png" alt="facebook"/>
            <input v-model="editProfileDetails.socialLinks.facebookLink" type="url">
        </div>
        <!-- WEBSITE -->
        <div class="website input">
            <img src="/social-links/website-logo.png" alt="website"/>
            <input v-model="editProfileDetails.socialLinks.websiteLink" type="url">
        </div>


      </form>

    </div>


</template>

<script>
import {uploadPic, downloadPic} from "/Users/brianford/Documents/desca/src/manage-pic.js"

export default {
  props: {
    editProfileDetails: {
        type: Object,
    },
    profPic: {
      type: String
    }
  },
  methods: {
    async uploadProfImg(event) {

      const profPicUpload = 'profPic' + '-' + Date.now();
      const user = this.$store.state.user.uid
      const key = `${user}/${profPicUpload}`

      await uploadPic(key, event.target.files[0])
      const profPic = await downloadPic(key)

      this.profPic = profPic

      // console.log(typeof(this.profPic))

    },
  },
}
</script>

<style scoped>

  .details-box {
    position: absolute;
    background-color: rgba(0,0,0,0.75);
    z-index: 100000;
    color: white;
  }

  .details-text {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .details-text > * {
    display: flex;
    align-items: center;
  }
  
  .details-text > *:not(:last-child) {
    margin-bottom: 12px;
  }

  .sm-logo {
    height: 25px;
  }

  input {
    outline: none;
    border: none;
    padding: 5px;
  }

  .input img {
    height: 25px;
    padding-right: 7px
  }

  .upload-btn-wrapper {
    background: green;
    padding: 3px 7px;
    cursor: pointer;
  }
</style>

<!-- TODO: CHANGE PROFILE PIC IMAGE BUTTON FUNCTIONALITY -->