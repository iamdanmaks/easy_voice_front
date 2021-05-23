<template>
  <div class="uk-flex" style="max-width: 100vw">
    <Menu v-if="isLoggedIn && !isMobile" style="width: 20 vw; height: 100vh; position: fixed" />
    <router-view style="width: 79vw; margin-left: 21vw;" v-if="isLoggedIn && !isMobile"></router-view>
    <router-view class="uk-margin-left" v-if="isLoggedIn && isMobile">
    </router-view>
    <router-view v-if="!isLoggedIn"></router-view>

    <div v-if="isLoggedIn && isMobile" id="nav" uk-offcanvas="mode: push; overlay: true">
        <Menu style="height: 100vh;" />
    </div>

    <button type="button" v-if="isMobile"
      style="position: absolute; width: 5vh; height: 5vh; border-radius: 50%; border: 1px solid black; bottom: -22vh; right: -17vw" 
      uk-toggle="target: #nav" uk-icon="icon: menu"></button>

    <div v-if="isLoggedIn" id="upgrade-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <UpgradeModal />

        </div>
    </div>

    <div v-if="isLoggedIn" id="org-edit-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <EditOrganization />

        </div>
    </div>

    <div v-if="isLoggedIn" id="voice-add-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <VoiceAdd />

        </div>
    </div>

    <div v-if="isLoggedIn && $store.state.user != null" id="user-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <User />

        </div>
    </div>

    <div v-if="isLoggedIn && $store.state.user != null" id="edit-voice-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <VoiceEdit />

        </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import UpgradeModal from './components/UpgradeModal.vue'
import EditOrganization from './components/EditOrganization.vue'
import VoiceAdd from './components/VoiceAdd.vue'
import VoiceEdit from './components/VoiceEdit.vue'
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    UpgradeModal, EditOrganization, VoiceAdd, VoiceEdit, Menu, User
  },
  data: () => ({
    
  }),
  mounted: function () {
      var locale = localStorage.getItem('locale');
      if (locale == null)
        locale = 'en_UK';
      this.$store.dispatch('setLocale', locale.split('_')[0])
      this.$i18n.locale = locale;
      
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
          if (this.$store.state.organization == null) {
              this.$store.dispatch("getOrg")
          }
          if (this.$store.state.voices.length == 0) {
            this.$store.dispatch("getVoices", this.$store.state.organization.public_id)
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
  }
};
</script>
