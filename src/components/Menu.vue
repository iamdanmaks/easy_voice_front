<template>
    <div class="uk-card uk-card-default uk-card-body">
        <center>
          <a href="#user-modal" uk-toggle style="text-decoration: none;">
            <avatar :username="$store.state.user.first_name + ' ' + $store.state.user.last_name"
            :size="120"></avatar>
          </a>
          <h3 class="uk-text-lead" style="font-size: 16pt">
            {{ $store.state.user.first_name + ' ' + $store.state.user.last_name }} 
            <sup v-if="$store.state.user.organization_admin" 
            uk-icon="icon: bolt" :uk-tooltip="'title: ' + $store.state.organization.name + $t('user.status')"></sup>
            <br>
            <span style="font-size: 14pt" class="uk-text-meta">
              {{ '@' + $store.state.user.username }}  
            </span>
          </h3>  
        </center>       
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li>
              <router-link to="/">
                <span class="uk-margin-small-right" uk-icon="icon: home"></span> {{ $t('menu.home') }}
              </router-link>
            </li>
            <li v-if="$store.state.user.organization_admin">
              <router-link to="/organization">
                <span class="uk-margin-small-right" uk-icon="icon: users"></span> {{ $t('menu.org') }}
              </router-link>
            </li>
            <li>
              <router-link to="/voice">
                <span class="uk-margin-small-right" uk-icon="icon: database"></span> {{ $t('menu.voice') }}
              </router-link>
            </li>
            <li>
              <router-link to="/voicing">
                <span class="uk-margin-small-right" uk-icon="icon: soundcloud"></span> {{ $t('menu.voicing') }}
              </router-link>
            </li>
            <li>
              <router-link to="/api">
                <span class="uk-margin-small-right" uk-icon="icon: cloud-download"></span> {{ $t('menu.api') }}
              </router-link>
            </li>
            <li class="uk-nav-divider"></li>
            <li v-on:click="logout"><a href="#"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> {{ $t('menu.out') }}</a></li>
        </ul>
        <div class="uk-position-bottom uk-width-1-1 uk-text-center" style="margin-bottom: 3vh;">
          EasyVoice 2021
          <br>
          <select v-model="$i18n.locale" class="uk-select uk-width-small">
              <option v-for="(lang, i) in langs" 
              :key="`Lang${i}`" :value="lang">{{ fullLangs[i] }}</option>
          </select>
        </div>
    </div>
</template>
<script>
import Avatar from 'vue-avatar'

export default {
    name: 'Menu',
    components: {
        Avatar
    },
    data: function () {
      return {
        langs: ['en', 'uk'],
        fullLangs: ['English', 'Українська']
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
        },
        locale: function () {
            return this.$i18n.locale;
        }
    },
    methods: {
        logout: function () {
          this.$store.dispatch("logout")
          this.$router.push("/");
        }
    },
    watch: {
        locale: function (val) {
            if (val == 'en') {
                localStorage.setItem('locale', 'en_UK');
                this.$http.defaults.headers.common['Accept-Language'] = 'en_UK';
                this.$store
                .dispatch('setLocale', 'en')
            }
            else if (val == 'uk') {
                localStorage.setItem('locale', 'uk_UA');
                this.$http.defaults.headers.common['Accept-Language'] = 'uk_UA';
                this.$store
                .dispatch('setLocale', 'uk')
            }
        }
    }
}
</script>