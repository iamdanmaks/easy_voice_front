import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
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
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = null
    },
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://34.118.9.73:8080/api/auth/login', data: user, method: 'POST' })
          .then(resp => {
            axios
            .get('http://34.118.9.73:8080/api/user/', { headers: { Authorization: 'Bearer ' + resp.data.Authorization } })
            .then(response => {
              const user_info = response.data
              commit('set_user', user_info)
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
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://34.118.9.73:8080/api/user/', method: 'GET' })
          .then(resp => {
            commit('user_restored', resp.data)
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
  },
  modules: {
  }
})
