// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './App'
import router from './router'
// import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.prototype.$axios = Axios;

//提交header中包含cookies,Abp vNext必须
Axios.defaults.withCredentials=true;
// Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueAxios,Axios)

// Vue.http.interceptors.push(function (request, next) {
//   //跨域携带cookie
//   request.credentials=true;

//   next(function(response){
//     if(response.body.code==401){
//       console.log("-----------11111111111");
//     }
//     return response;
//   })
// })

// Axios.interceptors.request.use(
//   config => {
//     debugger
//     console.log("request");
//     console.log(document.cookie);
//   //  config.baseURL = '/api/'
//   //  config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
//   //  config.timeout = 6000
//   //  let token = sessionStorage.getItem('access_token')
//   //  let csrf = store.getters.csrf
//   //  if (token) {
//   //   config.headers = {
//   //    'access-token': token,
//   //    'Content-Type': 'application/x-www-form-urlencoded'
//   //   }
//   //  }
//   //  if (config.url === 'refresh') {
//   //   config.headers = {
//   //    'refresh-token': sessionStorage.getItem('refresh_token'),
//   //    'Content-Type': 'application/x-www-form-urlencoded'
//   //   }
//   //  }
//    return config
//   },
//   error => {
//    return Promise.reject(error)
//   }
//  )
 //在 response 拦截器实现

// Axios.interceptors.response.use(
//   response => {
//     debugger
//     console.log(response);
//     console.log(document.cookie);
//    // 定时刷新access-token
//   //  if (!response.data.value && response.data.data.message === 'token invalid') {
//   //   // 刷新token
//   //   // store.dispatch('refresh').then(response => {
//   //   //  sessionStorage.setItem('access_token', response.data)
//   //   // }).catch(error => {
//   //   //  throw new Error('token刷新' + error)
//   //   // })
//   //  }
//    return response
//   },
//   error => {
//    return Promise.reject(error)
//   }
//  )

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
