<template>
  <div class="uk-flex" style="max-width: 100vw">
    <div v-if="isLoggedIn && !isMobile" class="uk-card uk-card-default uk-card-body" 
    style="width: 20 vw; height: 100vh; ; position: fixed">
        <center>
          <avatar :username="$store.state.user.first_name + ' ' + $store.state.user.last_name"
          :size="120"></avatar>
          <h3 class="uk-text-lead" style="font-size: 16pt">
            {{ $store.state.user.first_name + ' ' + $store.state.user.last_name }} 
            <sup v-if="$store.state.user.organization_admin" 
            uk-icon="icon: bolt" :uk-tooltip="'title: ' + $store.state.organization.name + ' Admin'"></sup>
            <br>
            <span style="font-size: 14pt" class="uk-text-meta">
              {{ '@' + $store.state.user.username }}  
            </span>
          </h3>  
        </center>       
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li>
              <router-link to="/">
                <span class="uk-margin-small-right" uk-icon="icon: home"></span> Home
              </router-link>
            </li>
            <li v-if="$store.state.user.organization_admin">
              <router-link to="/organization">
                <span class="uk-margin-small-right" uk-icon="icon: users"></span> Organization
              </router-link>
            </li>
            <li>
              <router-link to="/voice">
                <span class="uk-margin-small-right" uk-icon="icon: database"></span> Voices
              </router-link>
            </li>
            <li>
              <router-link to="/voicing">
                <span class="uk-margin-small-right" uk-icon="icon: soundcloud"></span> Text voicing
              </router-link>
            </li>
            <li>
              <router-link to="/api">
                <span class="uk-margin-small-right" uk-icon="icon: cloud-download"></span> API
              </router-link>
            </li>
            <li>
              <a href="#"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Profile</a>
            </li>
            <li class="uk-nav-divider"></li>
            <li v-on:click="logout"><a href="#"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Sign out</a></li>
        </ul>
        <div class="uk-position-bottom uk-width-1-1 uk-text-center" style="margin-bottom: 3vh;">
          EasyVoice 2021
        </div>
    </div>
    <router-view style="width: 79vw; margin-left: 21vw;" v-if="isLoggedIn"></router-view>
    <router-view v-if="!isLoggedIn"></router-view>

    <div id="upgrade-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <UpgradeModal />

        </div>
    </div>

    <div id="org-edit-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <EditOrganization />

        </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import UpgradeModal from './components/UpgradeModal.vue'
import EditOrganization from './components/EditOrganization.vue'

export default {
  name: 'App',
  components: {
    Avatar, UpgradeModal, EditOrganization
  },
  data: () => ({
    
  }),
  mounted: function () {
      if (this.$route.query.token && this.$route.query.confirm) {
        var _this = this;
        this.$http
        .get('http://34.118.9.73:8080/api/user/confirm?token=' + this.$route.query.token)
        .then(resp => {
            _this.$store.dispatch("setToken", resp.data.Authorization)
            _this.$router.push("/");
            window.location.reload(true);
        })
      }
      if (this.$store.getters.isLoggedIn) {
          if (this.$store.state.user == null) {
              this.$store.dispatch("getUser")
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
      this.$router.push("/");
    }
  }
};
</script>
