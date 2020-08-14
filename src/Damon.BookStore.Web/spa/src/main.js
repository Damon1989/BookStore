// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import '@/styles/index.scss' // global css

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueCookies from 'vue-cookies';
import { getAccessToken } from "@/utils/auth";

/* Layout */
// import Layout from '@/layout';
Vue.config.productionTip = false

Vue.prototype.$axios = Axios;


//提交header中包含cookies,Abp vNext必须
Axios.defaults.withCredentials = true;
Vue.use(ElementUI);
Vue.use(VueAxios, Axios)
Vue.use(VueCookies);



router.beforeEach(async (to, from, next) => {
  if (checkUserIsLogin()) {
    next()
    store.dispatch("user/getInfo");
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (hasRoles) {
      next()
    } else {
      const { roles } = await store.dispatch("user/getInfo");
      const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
      router.addRoutes(accessRoutes)
    }

  } else {
    if (to.path == "/login") {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})

function checkUserIsLogin() {
  var data = getAccessToken();
  return data
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
