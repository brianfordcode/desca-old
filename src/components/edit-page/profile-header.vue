<template>

<div
  class="container"
  v-if="profileDetails"
>
  <!-- PROF PIC -->
  <img class="prof-pic"
      draggable="false"
      :src="profileDetails.profPic.photoURL"
      referrerpolicy="no-referrer"
  />

  <!-- NAME AND LINKS -->
  <div style="margin-left: 10px;">

    <h1>{{ profileDetails.profName }}</h1>

    <div style="display: flex;">
      <div v-for="media in mediaList" :key="media">
        <a
          style="display: block; height: 25px; margin-right: 5px;"
          class="round-edges"
          :href="profileDetails.socialLinks[media]"
          target="_blank"
        >
          <img
            style="height: 100%;"
            :src="`/social-links/${media}-logo.png`"
            :alt="media"
          />
        </a>
      </div>
    </div>

  </div>

</div>

<loadingWheel v-else style="height: 100px; width:100px; margin: 20px 0 15px 0;" />

</template>

<script>
import loadingWheel from '../loading-wheel.vue'

  export default {
    components: { loadingWheel },
    computed: {
      profileDetails() {
        return this.$store.getters.getProfileDetails(this.$route.params.user)
      },
      mediaList() {
        const mediaArray = [ 'twitch', 'twitter', 'youtube', 'discord', 'facebook', 'website' ]
        const links = this.$store.getters.getProfileDetails(this.$route.params.user).socialLinks

        Object.keys(links).forEach(key => {
          if (links[key] == '') {
              mediaArray.splice(mediaArray.indexOf(key), 1)
          }
        });

        return mediaArray
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: 20px 0 15px 0;
    display: flex;
    align-items: center;
    width: max-content;
  }
  
  .prof-pic {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>