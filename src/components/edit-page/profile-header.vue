<template>
  <div class="container">
    
    <!-- PROF PIC -->
      <div class="prof-pic">
        <img draggable="false" 
             style="width: 120px; height: auto;"
             :src="$store.state.profileDetails.profPic"
             v-if="$store.state.user"
        />
      </div>

      <div class="details">

        <div
          class="name-live"
          style="display: flex; align-items: center"
        >

          <!-- NAME -->
          <h1 class="prof-name">{{ $store.state.profileDetails.profName ? $store.state.profileDetails.profName : $store.state.user.displayName }}</h1>

          <!-- live status -->
          <a
            :href="$store.state.profileDetails.socialLinks.twitchLink"
            v-if="$store.state.profileDetails.liveStatus"
            target="_blank"
          >
          !LIVE
          </a>

        </div>

        <!-- LINKS -->
        <div class="links-wrapper">

          <!-- TWITCH -->
          <a
            v-if="$store.state.profileDetails.socialLinks.twitchLink"
            :href="$store.state.profileDetails.socialLinks.twitchLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="twitchLogo"
              alt="twitch"
            />
          </a>
          <!-- TWITTER -->
          <a
            v-if="$store.state.profileDetails.socialLinks.twitterLink"
            :href="$store.state.profileDetails.socialLinks.twitterLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="twitterLogo"
              alt="twitter"
            />
          </a>
          <!-- YOUTUBE -->
          <a
            v-if="$store.state.profileDetails.socialLinks.youtubeLink"
            :href="$store.state.profileDetails.socialLinks.youtubeLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="youtubeLogo"
              alt="youtube"
            />
          </a>
          <!-- DISCORD -->
          <a
            v-if="$store.state.profileDetails.socialLinks.discordLink"
            :href="$store.state.profileDetails.socialLinks.discordLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="discordLogo"
              alt="discord"
            />
          </a>
          <!-- FACEBOOK -->
          <a
            v-if="$store.state.profileDetails.socialLinks.facebookLink"
            :href="$store.state.profileDetails.socialLinks.facebookLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="facebookLogo"
              alt="facebook"
            />
          </a>
          <!-- WEBSITE -->
          <a
            v-if="$store.state.profileDetails.socialLinks.websiteLink"
            :href="$store.state.profileDetails.socialLinks.websiteLink"
            target="_blank"
          >
            <img
              class="sm-logo"
              :src="websiteLogo"
              alt="website"
            />
          </a>

        </div>

      </div>
    
    <!-- EDIT DETAILS BUTTON -->
    <button
        class="edit-btn btn"
        @click="editOpen = !editOpen, enterBtn()"
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
          <input type="text" v-model="$store.state.profileDetails.profName"/>
        </div>

        <!-- UPLOAD PICTURE -->
        <button class="upload-btn btn" @click="uploadProfImg">Upload Profile Pic</button>

        <!-- TWITCH -->
        <div class="twitch input">
          <img :src="twitchLogo" alt="twitch"/>
          <input v-model="$store.state.profileDetails.socialLinks.twitchLink"
                  type="text"
          >
        </div>
        <!-- TWITTER -->
        <div class="twitter input">
          <img :src="twitterLogo" alt="twitter"/>
          <input v-model="$store.state.profileDetails.socialLinks.twitterLink"
                  type="text"
          >
        </div>
        <!-- YOUTUBE -->
        <div class="youtube input">
          <img :src="youtubeLogo" alt="youtube"/>
          <input v-model="$store.state.profileDetails.socialLinks.youtubeLink"
                  type="text"
          >
        </div>
        <!-- DISCORD -->
        <div class="discord input">
          <img :src="discordLogo" alt="discord"/>
          <input v-model="$store.state.profileDetails.socialLinks.discordLink"
                  type="text"
          >
        </div>
        <!-- FACEBOOK -->
        <div class="discord input">
          <img :src="facebookLogo" alt="discord"/>
          <input v-model="$store.state.profileDetails.socialLinks.facebookLink"
                  type="text"
          >
        </div>
        <!-- WEBSITE -->
        <div class="website input">
          <img :src="websiteLogo" alt="website"/>
          <input v-model="$store.state.profileDetails.socialLinks.websiteLink"
                  type="text"
          >
        </div>
        
        <!-- ALLOW LIVE STATUS -->
        <div class="allow-comments">
          <input type="checkbox"
                 v-model="$store.state.profileDetails.liveStatus"
          >
          <div style="display: flex; flex-direction: column; padding-left: 5px">
            <p>Live Status</p>
            <p style="font-size:10px;">(Let people know you're live!)</p>
          </div>
        </div>

        <!-- ALLOW COMMENTS -->
        <div class="allow-comments">
          <input type="checkbox"
                 v-model="$store.state.profileDetails.allowComments"
          >
          <p>Allow Comments</p>
        </div>

      </div>

    </div>


</div>

</template>

<script>

  export default {
    data() {
      return {
        editOpen: false,
        twitchLogo: require('@/assets/social-links/twitch-logo.png'),
        facebookLogo: require('@/assets/social-links/facebook-logo.png'),
        twitterLogo: require('@/assets/social-links/twitter-logo.png'),
        youtubeLogo: require('@/assets/social-links/youtube-logo.png'),
        discordLogo: require('@/assets/social-links/discord-logo.png'),
        websiteLogo: require('@/assets/social-links/website-logo.png'),
        
      }
    },
    methods: {
      uploadProfImg() { 
        console.log('profile picture upload')
      },
      enterBtn() {
        this.editOpen ? console.log('change details pushed') : this.$store.dispatch('changeDetails')
        
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
  
  
  