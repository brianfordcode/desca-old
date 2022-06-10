<template>
  <div class="container" v-if="$store.state.user">
    
    <!-- PROF PIC -->
      <div class="prof-pic">
        <img draggable="false" 
             style="width: 120px; height: auto;"
             :src="profileDetails.profPic"
        />
      </div>

      <div class="details">

        <div
          class="name-live"
          style="display: flex; align-items: center"
        >

          <!-- NAME -->
          <h1 class="prof-name">{{ profileDetails.profName }}</h1>

          <!-- live status -->
          <a
            :href="profileDetails.socialLinks.twitchLink"
            v-if="profileDetails.liveStatus"
            target="_blank"
          >
          !LIVE
          </a>

        </div>

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

      </div>

    <!-- EDIT DETAILS BUTTON -->
    <button
        class="edit-btn btn"
        @click="enterBtn()"
        ref="textToggle"
        v-if="$route.name != 'View'"
    >
    {{!this.editOpen ? "Change Details" : 'SUBMIT'}}
    </button>

    <!-- details box -->
    <div class="details-box"
         v-if="editOpen"
    >
      <div class="details-text">

        <!-- PROFILE NAME -->
        <div class="name-input input">
          <p style="padding-right: 5px">Name</p>
          <input type="text" v-model="profileDetails.profName"/>
        </div>

        <!-- UPLOAD PICTURE -->
        <button class="upload-btn btn" @click="uploadProfImg">Upload Profile Pic</button>

        <!-- TWITCH -->
        <div class="twitch input">
          <img src="/social-links/twitch-logo.png" alt="twitch"/>
          <input v-model="profileDetails.socialLinks.twitchLink"
                  type="text"
          >
        </div>
        <!-- TWITTER -->
        <div class="twitter input">
          <img src="/social-links/twitter-logo.png" alt="twitter"/>
          <input v-model="profileDetails.socialLinks.twitterLink"
                  type="text"
          >
        </div>
        <!-- YOUTUBE -->
        <div class="youtube input">
          <img src="/social-links/youtube-logo.png" alt="youtube"/>
          <input v-model="profileDetails.socialLinks.youtubeLink"
                  type="text"
          >
        </div>
        <!-- DISCORD -->
        <div class="discord input">
          <img src="/social-links/discord-logo.png" alt="discord"/>
          <input v-model="profileDetails.socialLinks.discordLink"
                  type="text"
          >
        </div>
        <!-- FACEBOOK -->
        <div class="facebook input">
          <img src="/social-links/facebook-logo.png" alt="facebook"/>
          <input v-model="profileDetails.socialLinks.facebookLink"
                  type="text"
          >
        </div>
        <!-- WEBSITE -->
        <div class="website input">
          <img src="/social-links/website-logo.png" alt="website"/>
          <input v-model="profileDetails.socialLinks.websiteLink"
                  type="text"
          >
        </div>
        
        <!-- ALLOW LIVE STATUS -->
        <div class="allow-comments">
          <input type="checkbox"
                 v-model="profileDetails.liveStatus"
          >
          <div style="display: flex; flex-direction: column; padding-left: 5px">
            <p>Live Status</p>
            <p style="font-size:10px;">(Let people know you're live!)</p>
          </div>
        </div>

        <!-- ALLOW COMMENTS -->
        <div class="allow-comments">
          <input type="checkbox"
                 v-model="profileDetails.allowComments"
          >
          <p>Allow Comments</p>
        </div>

      </div>

    </div>


</div>

</template>

<script>

function copy(value) {
  return JSON.parse(JSON.stringify(value))
}


  export default {
    data() {
      return {
        editOpen: false,

        profileDetails: copy(this.$store.state.profileDetails),

      }
    },
    methods: {
      uploadProfImg() { 
        console.log('profile picture upload')
      },
      enterBtn() {
        this.editOpen = !this.editOpen
        if (!this.editOpen) { this.$store.dispatch('changeDetails', this.profileDetails) }
        console.log(this.$store.state.user.uid)
        console.log(this.$store.state.profileDetails.user)
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 800px;
    height: 80px;
    margin: 0 auto;
    background-color: rgba(109, 109, 109, 0.5);
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 7px;
    box-shadow: 0px 0px 33px -20px #000000;
  }
  
  .prof-pic {
    position: absolute;
    height: 120px;
    width: 120px;
    overflow: hidden;
    border-radius: 100px;
    background-color: grey;
    transform: translate(10px);
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
    position: absolute;
    bottom: 0;
    right: 0;
    width: 110px;
    height: 25px;
    /* border-bottom-right-radius: 7px; */
  }
  .btn {
    background: green;
    color: white;
    padding: 5px;
    cursor: pointer;
    border: none;
    
  }
  .details-box {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(80px);
    background-color: rgba(0,0,0,0.75);
    z-index: 100000;
    color: white;
  }
  .enter-btn {
    position: absolute;
    bottom: 0;
    right: 0;
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
  .input img {
    height: 25px;
    padding-right: 7px
  }
  .sm-logo {
    height: 25px;
  }
  .links-wrapper a:not(:last-child) {
    margin-right: 5px;
  }
  .allow-comments > p {
    padding-left: 5px;
  }
  input {
    outline: none;
    border: none;
    padding: 5px;
  }
  .name-live a {
    text-decoration: none;
    color: rgb(209, 0, 0);
    border: 1px solid rgb(209, 0, 0);
    height: min-content;
    padding: 2px 2px 0 2px;
    margin-left:20px;
  }
</style>