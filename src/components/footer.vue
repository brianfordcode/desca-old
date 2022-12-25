<template>
    <div class="container">

        <div class="wrapper">

            <div class="page-links-wrapper">
                <router-link to="/">About</router-link>
                <router-link to="/">Contact</router-link>
                <router-link to="/">Blog</router-link>
                <router-link to="/">FAQ</router-link>
            </div>

            <div class="logo-links-wrapper">
                <img
                    id="logo"
                    src="/desca-logo.png"
                    alt="desca-logo"
                    @click="$router.push('/')"
                />

               <div class="social-links">
                    <a href="https://www.twitch.tv" target="_blank">
                        <img
                            class="sm-logo"
                            src="/social-links/twitch-logo.png"
                            alt="twitch"
                        />
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                        <img
                            class="sm-logo"
                            src="/social-links/facebook-logo.png"
                            alt="twitch"
                        />
                    </a>
                    <a href="https://www.discord.com" target="_blank">
                        <img
                            class="sm-logo"
                            src="/social-links/discord-logo.png"
                            alt="twitch"
                        />
                    </a>
               </div> 
               <div style="color: white; font-size: 14px;">&#169; {{new Date().getFullYear()}}</div>

            </div>

        </div>

    </div>

</template>

<script>
export default {

}
</script>

<style scoped>

.container {
    z-index: 10000000;
    margin-top: 50px;
    height: 100px;
    /* background: rgb(13, 13, 118); */
    background: linear-gradient(90deg, rgb(5, 146, 175) 0%, rgba(9,9,121,1) 45%, rgba(2,0,36,1)  100%);
    box-shadow: 0px 0px 33px -20px #2166b6;
    /* position: absolute; */
    /* bottom: 0; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

}

.wrapper {
    width: 100%;
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
}

.page-links-wrapper {
    display: grid;
    /* flex-direction: column; */
    /* border: 1px solid; */
    width: 150px;
    grid-template-columns: 1fr 1fr;
}

a {
    color: white;
    text-decoration: none;
}

#logo {
    width: 100px;
}

.social-links > *:not(:last-child) {
    margin-right: 5px;
}

.sm-logo {
    width: 20px;
}


</style>