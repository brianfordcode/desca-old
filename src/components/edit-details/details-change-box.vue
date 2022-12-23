<template>

      <form class="details-text">

        <!-- PROFILE NAME -->
        <div class="name-input input">
            <p style="padding-right: 5px; font-weight: bold;">Name:</p>
            <input type="text" v-model="editProfileDetails.profName"/>
        </div>

        <!-- UPLOAD PROFILE PICTURE -->
        <div> 
          <img
            v-if="editProfileDetails.profPic.photoURL"
            class="prof-pic-preview"
            :src="editProfileDetails.profPic.photoURL"
            alt="prof-pic"
          >
          <spinningWheel v-else style="transform: scale(0.5); width: 60px; height: 50px;"/>
          
          <label for="input" class="upload-btn-wrapper btn">
            {{uploadProgress}}
            <input
            id="input"
              type="file"
              @change="uploadProfImg"
              accept=".jpg, .jpeg, .png"
              style="display: none;"
            >
          </label>
        </div>

        <p style="font-weight: bold; transform: translateX(-85%);">Your Channels:</p> 
        <!-- TWITCH -->
        <div class="twitch input">
            <img src="/social-links/twitch-logo.png" alt="twitch" title="twitch"/>
            <input v-model="editProfileDetails.socialLinks.twitch" type="url" required>
        </div>
        <!-- TWITTER -->
        <div class="twitter input">
            <img src="/social-links/twitter-logo.png" alt="twitter" title="twitter"/>
            <input v-model="editProfileDetails.socialLinks.twitter" type="url">
        </div>
        <!-- YOUTUBE -->
        <div class="youtube input">
            <img src="/social-links/youtube-logo.png" alt="youtube" title="youtube"/>
            <input v-model="editProfileDetails.socialLinks.youtube" type="url">
        </div>
        <!-- DISCORD -->
        <div class="discord input">
            <img src="/social-links/discord-logo.png" alt="discord" title="discord"/>
            <input v-model="editProfileDetails.socialLinks.discord" type="url">
        </div>
        <!-- FACEBOOK -->
        <div class="facebook input">
            <img src="/social-links/facebook-logo.png" alt="facebook" title="facebook"/>
            <input v-model="editProfileDetails.socialLinks.facebook" type="url">
        </div>
        <!-- WEBSITE -->
        <div class="website input">
            <img src="/social-links/website-logo.png" alt="website" title="website"/>
            <input v-model="editProfileDetails.socialLinks.website" type="url">
        </div>


      </form>


</template>

<script>
import {uploadPic, downloadPic} from "/Users/brianford/Documents/desca/src/manage-pic.js"
import spinningWheel from '../loading-wheel.vue'

export default {
  props: {
    editProfileDetails: {
        type: Object,
    },
  },
  components: { spinningWheel },
  data() {
    return {
      uploading: false,
    }
  },
  methods: {
    async uploadProfImg(event) {
      this.uploading = true
      this.editProfileDetails.profPic.photoURL = null;
      const profPicId = 'profPic' + '-' + Date.now();
      const user = this.$store.state.user
      const key = `${user.uid}/${profPicId}`
      const image = event.target.files[0]
      await uploadPic(key, image)
      const url = await downloadPic(key)
      this.editProfileDetails.profPic.photoURL = url
      this.editProfileDetails.profPic.profPicId = profPicId
      this.uploading = false
    },

  },
  computed: {
    uploadProgress() {
      const uploadProgress = this.$store.state.uploadProgress

      if (!this.uploading) {
        return 'Change Profile Pic'
      } else if (this.uploading) {
          if (isNaN(uploadProgress)) {
            return uploadProgress
          } else {
            return 'Uploading: ' + uploadProgress + '%'
          } 
      }         
    }

  }
}
</script>

<style scoped>

  .details-text {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
    border: 1px solid;
    padding: 5px;
  }

  .input img {
    height: 25px;
    padding-right: 7px
  }

  .prof-pic-preview {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .upload-btn-wrapper {
    margin: 10px 0;
    background: green;
    color: white;
    padding: 3px 7px;
    cursor: pointer;
    width: 135px;
    text-align: center;
  }
</style>

<!-- TODO: REQUIRE URL (HTTPS://, ETC) IN CHANNEL INPUTS -->