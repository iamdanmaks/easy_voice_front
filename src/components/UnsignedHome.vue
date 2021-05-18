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
                  <button class="uk-button uk-button-danger">Sign Up</button>
                  <a class="uk-button uk-button-danger" href="#demo-modal" uk-toggle>
                    Demo
                  </a>
                  <a href="#login-modal" uk-toggle class="uk-button uk-button-danger">Sign In</a>
              </div>
          </div>
        </div>
    
      </div>
    
    </div>
    
    <br /><br /><br />

    <center>
      <h1>
        Features
      </h1>
    </center>

    <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match uk-margin-small" uk-grid>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-left">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: users; ratio: 2"></span>
                  <br />
                  Voice cloning
                </h3>
                <p>
                  You can add a new voice for the system by passing just a few seconds of speaker talking. 
                  It will be enough to get speakers basic voice parameters
                </p>
            </center>
        </div>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-top">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: world; ratio: 2"></span>
                  <br />
                  Multilingual support
                </h3>
                <p>
                  System includes some algorithms to scale for new languages as quickly as possible.
                </p>
            </center>
        </div>
        <div>
            <center class="uk-card uk-card-default uk-card-body uk-card-hover uk-animation-slide-right">
                <h3 class="uk-card-title">
                  <span uk-icon="icon: soundcloud; ratio: 2"></span>
                  <br />
                  High quality speech
                </h3>
                <p>
                  System can generate high quality speech using high tech machine learning models.
                </p>
            </center>
        </div>
    </div>

    <br /><br /><br />

    <center>
      <h3 style="width: 75vw">
        The system provides services for business. 
        You pay only for voiced texts, so your organization will be billed only when it uses the models actively.
      </h3>
      <h3>
        Get these features after registration:
      </h3>
      <div>
          <ul class="uk-list">
              <li>
                <h4>
                  1. Web app to manage the organization and measure your activity
                </h4>
              </li>
              <li>
                <h4>
                  2. Raw API access to voice texts faster
                </h4>
              </li>
              <li>
                <h4>
                  3. Program interface and libraries to intregrate our solutions into your system
                </h4>
              </li>
          </ul>
      </div>
    </center>

    <br />
    <center>
      <a class="uk-button uk-button-default uk-button-large"
        style="color: #000000" href="#demo-modal" uk-toggle>
        Try it now for free
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
              <button class="uk-button uk-button-text uk-margin-right">Sign Up</button>
              <a uk-toggle class="uk-button uk-button-text uk-margin-left uk-margin-right"
              href="#demo-modal">
                Demo
              </a>
              <button class="uk-button uk-button-text uk-margin-left">Sign In</button>
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

  </div>
</template>

<script>
import DemoVoiceOverForm from './Demo.vue'
import Login from './Login.vue'

export default {
  name: 'UnsignedHome',
  components: {
    DemoVoiceOverForm, Login
  },
  data: function () {
      return {
          langs: ['en', 'uk'],
          fullLangs: ['English', 'Українська']
      }
  }
}
</script>
