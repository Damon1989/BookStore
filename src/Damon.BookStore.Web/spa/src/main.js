// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import i18n from '@/assets/i18n/index'

import router from './router'
import store from './store'

// import Axios from 'axios'
// import VueAxios from 'vue-axios'

import '@/styles/index.scss' // global css

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import VueCookies from 'vue-cookies'


Vue.config.productionTip = false

// Vue.prototype.$axios = Axios

// // 提交header中包含cookies,Abp vNext必须
// Axios.defaults.withCredentials = true
Vue.use(ElementUI)
// Vue.use(VueAxios, Axios)
// Vue.use(VueCookies)

// Vue.use(VueI18n)
// const i18n=new VueI18n({
//   locale:'zh',
//   messages:{
//     'zh': require('./assets/i18n/lang/zh'),   // 中文语言包
//     'en': require('./assets/i18n/lang/en')    // 英文语言包
//   }
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
