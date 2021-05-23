<template>
  <div class="unsigned_home" style="max-width: 100vw; width: 100vw; overflow-x: hidden">
    <div class="uk-cover-container uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light" 
    style="height: 100vh; width: 100vw; overflow-x: hidden">
    
      <img src="../assets/wave.gif" 
      alt="" uk-cover />
      
      <div class="uk-flex uk-flex-center uk-flex-middle uk-animation-fade" 
      style="background: rgba(50, 50, 50, 0.45); height: 100vh; width: 100vw; z-index: 999">
    
        <div>
          <img class="uk-width-medium uk-height-medium" src="../assets/logo.png"  />
          <div>
              <div class="uk-button-group">
                  <a class="uk-button uk-button-danger" href="#signup-modal" uk-toggle>{{ $t('signup.title') }}</a>
                  <a class="uk-button uk-button-danger" href="#demo-modal" uk-toggle>{{ $t('unsigned_home.demo') }}</a>
                  <a href="#login-modal" uk-toggle class="uk-button uk-button-danger">{{ $t('signin.title') }}</a>
              </div>
          </div>
        </div>
    
      </div>
    
    </div>
    
    <br /><br /><br />

    <center>
      <h1>
        {{ $t('unsigned_home.features') }}
      </h1>
    </center>

    <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-margin-small" uk-grid>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-left">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: users; ratio: 2"></span>
                  <br />
                  {{ $t('unsigned_home.vc') }}
                </h3>
                <p>
                  {{ $t('unsigned_home.vc_text') }}
                </p>
            </center>
        </div>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-top">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: world; ratio: 2"></span>
                  <br />
                  {{ $t('unsigned_home.ms') }}
                </h3>
                <p>
                  {{ $t('unsigned_home.ms_text') }}
                </p>
            </center>
        </div>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-right">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: soundcloud; ratio: 2"></span>
                  <br />
                  {{ $t('unsigned_home.hqs') }}
                </h3>
                <p>
                  {{ $t('unsigned_home.hqs_text') }}
                </p>
            </center>
        </div>
    </div>

    <br /><br /><br />

    <center>
      <h3 style="width: 75vw">
        {{ $t('unsigned_home.descr') }}
      </h3>
      <h3>
        {{ $t('unsigned_home.reg') }}
      </h3>
      <div>
          <ul class="uk-list">
              <li>
                <h4>
                  {{ $t('unsigned_home.reg1') }}
                </h4>
              </li>
              <li>
                <h4>
                  {{ $t('unsigned_home.reg2') }}
                </h4>
              </li>
              <li>
                <h4>
                  {{ $t('unsigned_home.reg3') }}
                </h4>
              </li>
          </ul>
      </div>
    </center>

    <br />
    <center>
      <a class="uk-button uk-button-default uk-button-large"
        style="color: #000000" href="#demo-modal" uk-toggle>
        {{ $t('unsigned_home.try') }}
      </a>
    </center>
    <br />

    <div class="uk-height-medium uk-cover-container uk-flex uk-flex-center uk-flex-middle uk-light"
      style="background: rgba(30, 30, 30, 0.9)">
        <center>
          <h5>
            EasyVoice 2021
          </h5>
          <br>
          <div class="uk-button-group">
              <button class="uk-button uk-button-text uk-margin-right">{{ $t('signup.title') }}</button>
              <a uk-toggle class="uk-button uk-button-text uk-margin-left uk-margin-right"
              href="#demo-modal">
                {{ $t('unsigned_home.demo') }}
              </a>
              <button class="uk-button uk-button-text uk-margin-left">{{ $t('signin.title') }}</button>
          </div>
          <br><br>
          <select v-model="$i18n.locale" class="uk-select uk-width-small">
              <option v-for="(lang, i) in langs" 
              :key="`Lang${i}`" :value="lang">{{ fullLangs[i] }}</option>
          </select>
        </center>
    </div>

    <div id="demo-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <DemoVoiceOverForm />

        </div>
    </div>

    <div id="login-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <Login />

        </div>
    </div>

    <div id="signup-modal" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

            <button class="uk-modal-close-default" type="button" uk-close></button>

            <Signup />

        </div>
    </div>

  </div>
</template>

<script>
import DemoVoiceOverForm from './Demo.vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

export default {
  name: 'UnsignedHome',
  components: {
    DemoVoiceOverForm, Login, Signup
  },
  data: function () {
      return {
          langs: ['en', 'uk'],
          fullLangs: ['English', 'Українська']
      }
  },
  computed: {
    locale: function () {
        return this.$i18n.locale;
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
