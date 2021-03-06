import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Api from '../views/Api.vue'
import Voicing from '../views/Voicing.vue'
import Organization from '../views/Organization.vue'
import InviteSignUp from '../views/InviteSignUp.vue'
import Voice from '../views/Voice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invite',
    name: 'Invite',
    component: InviteSignUp
  },
  {
    path: '/voice',
    name: 'Voice',
    component: Voice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/api',
    name: 'Api',
    component: Api,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/voicing',
    name: 'Voicing',
    component: Voicing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/organization',
    name: 'Organization',
    component: Organization,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
