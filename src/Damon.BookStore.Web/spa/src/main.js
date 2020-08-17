// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueI18n from 'vue-i18n'

import router from './router'
import store from './store'

import Axios from 'axios'
import VueAxios from 'vue-axios'

import '@/styles/index.scss' // global css

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueCookies from 'vue-cookies'
import { getAccessToken } from '@/utils/auth'

Vue.config.productionTip = false

Vue.prototype.$axios = Axios

// // 提交header中包含cookies,Abp vNext必须
// Axios.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.use(VueAxios, Axios)
Vue.use(VueCookies)

Vue.use(VueI18n)
const i18n=new VueI18n({
  locale:'zh',
  messages:{
    'zh': require('./assets/i18n/lang/zh'),   // 中文语言包
    'en': require('./assets/i18n/lang/en')    // 英文语言包
  }
})


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (getAccessToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('hasRoles' + hasRoles)
      if (hasRoles) {
        next()
      } else {
        store.dispatch('user/getInfo').then(({ roles }) => {
          store.dispatch('permission/generateRoutes', roles).then((accessRoutes) => {
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
