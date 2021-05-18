<template>
  <div style="max-width: 100vw">
    <div v-if="isLoggedIn && !isMobile" class="uk-card uk-card-default uk-card-body uk-width-1-5" 
    style="height: 100vh;">
        <center>
          <avatar :username="$store.state.user.first_name + ' ' + $store.state.user.last_name"
          :size="120"></avatar>
          <h3 class="uk-text-lead" style="font-size: 16pt">
            {{ $store.state.user.first_name + ' ' + $store.state.user.last_name }} 
            <sup uk-icon="icon: bolt" uk-tooltip="title: Organization Admin"></sup>  
            <br>
            <span style="font-size: 14pt" class="uk-text-meta">
              {{ '@' + $store.state.user.username }}  
            </span>
          </h3>  
        </center>       
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Home</a>
            </li>
            <li v-if="$store.state.user.organization_admin">
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: users"></span> Organization</a>
            </li>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: database"></span> Voices</a>
            </li>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: soundcloud"></span> Text voicing</a>
            </li>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: cloud-download"></span> API</a>
            </li>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Profile</a>
            </li>
            <li class="uk-nav-divider"></li>
            <li v-on:click="logout"><a href="#"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Sign out</a></li>
        </ul>
        <div class="uk-position-bottom uk-width-1-1 uk-text-center" style="margin-bottom: 3vh">
          EasyVoice 2021
        </div>
    </div>
    <router-view style="max-width: 100vw"></router-view>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'App',
  components: {
    Avatar
  },
  data: () => ({
    
  }),
  mounted: function () {
      if (this.$store.getters.isLoggedIn) {
          if (this.$store.state.user == null) {
              this.$store.dispatch("getUser")
          }
          if (this.$store.state.user.organization_admin) {

          }
      }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isMobile() {     
      if (screen.width <= 760) {       
        return true     
      } else {       
        return false     
      }   
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout")
    }
  }
};
</script>
