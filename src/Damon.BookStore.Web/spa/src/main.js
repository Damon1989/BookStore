// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueCookies from 'vue-cookies';
import { getAccessToken } from "@/utils/auth";

/* Layout */
import Layout from '@/layout';
Vue.config.productionTip = false

Vue.prototype.$axios = Axios;


//提交header中包含cookies,Abp vNext必须
Axios.defaults.withCredentials = true;
Vue.use(ElementUI);
Vue.use(VueAxios, Axios)
Vue.use(VueCookies);

Axios.interceptors.request.use(
  config => {
    if (checkUserIsLogin()) {
      var token = Vue.$cookies.get("access_token");
      var token_type = Vue.$cookies.get("token_type");
      config.headers = { "Authorization": token_type + " " + token }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//  在 response 拦截器实现

Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)


router.beforeEach((to, from, next) => {
  if (checkUserIsLogin()) {
    next()
    const hasRoles = store.getters.roles && store.getters.roles.length > 0;
    if (hasRoles) {
      // next()
    } else {

//       // const { roles }=store.dispatch("user/getInfo");
//       //    console.log(1);
//       //   //  const { roles } = store.getters.roles;
//       //    console.log(roles);
//       //    console.log(2);
//          const roles=['admin','deptAdmin'];
//          console.log(1);
//         // const accessRoutes= store.dispatch("permission/generateRoutes",roles);
//         console.log(2);
// const accessRoutes = [

//   {
//     path: '/icon',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/home/index'),
//         name: 'Icons',
//         meta: { title: 'Icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },



//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

//         router.addRoutes(accessRoutes);
//         console.log(3);
//         next({...to,replace:true});

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
