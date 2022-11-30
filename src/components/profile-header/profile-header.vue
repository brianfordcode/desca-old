<template>
  <div
    class="container"
    v-if="profileDetails"
  >
    <!-- PROF PIC -->
        <img class="prof-pic"
            draggable="false"
            :src="profileDetails.profPic"
            v-if="profileDetails.profPic"
            referrerpolicy="no-referrer"
        />

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

      </div>

</div>

<loadingWheel v-else style="height: 100px; width:100px; margin: 40px;" />

</template>

<script>
import detailsChangeBox from './details-change-box.vue'
import loadingWheel from '../loading-wheel.vue'


  export default {
    created() {
      const routerUser = this.$route.params.user;
      this.$store.dispatch('fetchUserDetails', routerUser)
    },
    components: { detailsChangeBox, loadingWheel },
    data() {
      return {
        editProfileDetails: null,
      }
    },
    methods: {
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
    margin: 20px 0 15px 0;
    position: relative;
    display: flex;
    align-items: center;
    min-width: max-content;
  }
  
  .prof-pic {
    height: 100px;
    width: 100px;
    min-width: 100px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 0px 33px -20px #000000;
  }
  
  .prof-name {
    height: min-content;
  }

  .details {
    margin-left: 10px;
  }

  .sm-logo {
    height: 25px;
  }

  .links-wrapper a:not(:last-child) {
    margin-right: 5px;
  }

</style>