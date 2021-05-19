import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './i18n'
import VeeValidate from 'vee-validate'
import Axios from 'axios'
import Vuetify from 'vuetify';
import JsonViewer from 'vue-json-viewer';


Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(Vuetify);
Vue.use(JsonViewer);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
const locale = localStorage.getItem('locale');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

if (locale) {
  Vue.prototype.$http.defaults.headers.common['Accept-Language'] = locale
}
else {
  Vue.prototype.$http.defaults.headers.common['Accept-Language'] = 'en_UK'
}

new Vue({
  router,
  store,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
