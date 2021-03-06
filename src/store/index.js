import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: null,
    organization: null,
    filledIn: true,
    voices: [],
    editVoice: null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    set_token(state, token) {
      state.status = 'success'
      state.token = token
    },
    set_filled_in_false(state) {
      state.filledIn = false
    },
    set_filled_in_true(state) {
      state.filledIn = true
    },
    auth_error(state) {
      state.status = 'error'
    },
    set_user(state, user) {
      state.user = user
    },
    user_restored(state, user) {
      state.status = 'success'
      state.user = user
    },
    org_restored(state, organization) {
      state.status = 'success'
      state.organization = organization
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = null
      state.organization = null
    },
    set_token(state, token) {
      state.status = 'success'
      state.token = token
    },
    set_voices(state, voices) {
      state.status = 'success'
      state.voices = voices
    },
    editVoice(state, voice) {
      state.editVoice = voice
    },
    locale_request(state, locale) {
      state.locale = locale;
    }
  },
  getters: {
    isLoggedIn: state => !!state.token && state.filledIn
  },
  actions: {
    setToken({ commit }, tkn) {
      const token = 'Bearer ' + tkn
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token

      commit('set_token', token)
      commit('set_filled_in_false')
    },
    setFilledIn({ commit }) {
      commit('set_filled_in_true')
    },
    editVoice({ commit }, voice) {
      commit('editVoice', voice)
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://34.118.9.73:8080/api/user/', data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://34.118.9.73:8080/api/auth/login', data: user, method: 'POST' })
          .then(resp => {
            axios
            .get('http://34.118.9.73:8080/api/user/', { headers: { Authorization: 'Bearer ' + resp.data.Authorization } })
            .then(response => {
              const user_info = response.data

              axios
              .get('http://34.118.9.73:8080/api/organization/', { headers: { Authorization: 'Bearer ' + resp.data.Authorization } })
              .then(rsp => {
                commit('set_user', user_info)
                commit('org_restored', rsp.data)
              })
              .catch(err => {
                console.log(err.response.data.message);
              })
            })
            .catch(err => {
              console.log(err.response.data.message);
            })

            const token = 'Bearer ' + resp.data.Authorization
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    getOrg({ commit }) {
      return new Promise((resolve, reject) => {
          axios
          .get('http://34.118.9.73:8080/api/organization/')
          .then(rsp => {
            const org = rsp.data
            commit('org_restored', org)
          })
          .catch(err => {
            console.log(err.response.data.message);
          })
        })
    },
    getVoices({ commit }, public_id) {
      return new Promise((resolve, reject) => {
        axios
        .get('http://34.118.9.73:8080/api/voice/?organization=' + public_id)
        .then(resp => {
            var flags = [], output = [], l = resp.data.length, i;
            for(i = 0; i < l; ++i) {
                if( flags[resp.data[i].public_id])
                    continue;

                flags[resp.data[i].public_id] = true;
                output.push(resp.data[i]);
            }
            commit('set_voices', output)
        })
      });
    },
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://34.118.9.73:8080/api/user/', method: 'GET' })
          .then(resp => {
            axios
            .get('http://34.118.9.73:8080/api/organization/')
            .then(rsp => {
              const org = rsp.data
              commit('user_restored', resp.data)
              commit('org_restored', org)
            })
            .catch(err => {
              console.log(err.response.data.message);
            })
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    setLocale({ commit }, locale) {
      return new Promise((resolve, reject) => {
        commit('locale_request', locale)
      })
    },
  },
  modules: {
  }
})
