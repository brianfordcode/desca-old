<template>

      <div class="main-container">

        <!-- PROFILE NAME -->
        <div class="input">
            <p style="padding-right: 7px; font-weight: bold;">Name:</p>
            <input type="text" v-model="editProfileDetails.profName"/>
        </div>

        <!-- UPLOAD PROFILE PICTURE -->
        <div> 
          <img
            v-if="editProfileDetails.profPic.photoURL"
            class="prof-pic-preview circle"
            :src="editProfileDetails.profPic.photoURL"
            alt="prof-pic"
          >
          <spinningWheel v-else style="transform: scale(0.5); width: 60px; height: 50px;"/>
          
          <label for="input" class="upload-btn-wrapper">
            {{uploadProgress}}
            <input
            id="input"
              type="file"
              @change="uploadProfImg"
              accept=".jpg, .jpeg, .png"
              style="display: none;"
              :disabled="uploading"
            >
          </label>
        </div>

        <!-- CHANNELS -->
        <div v-for="media in mediaArray">
          <img style="height: 25px; padding-right:7px;" :src="`/social-links/${media}-logo.png`" :alt="media">
          <input v-model="editProfileDetails.socialLinks[media]" type="url">
        </div>
        
      </div>


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
      mediaArray: [ 'twitch', 'twitter', 'youtube', 'discord', 'facebook', 'website' ]

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

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .main-container > * {
    display: flex;
    align-items: center;
  }
  
  .main-container > *:not(:last-child) {
    margin-bottom: 12px;
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
    margin-right: 7px;
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
