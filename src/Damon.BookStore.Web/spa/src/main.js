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

import VueCookies from 'vue-cookies';

Vue.config.productionTip = false

Vue.prototype.$axios = Axios;


//提交header中包含cookies,Abp vNext必须
Axios.defaults.withCredentials = true;
// Axios.defaults.baseURL="https://localhost:44397/";
// Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueAxios, Axios)
Vue.use(VueCookies);

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

Axios.interceptors.request.use(
  config => {

    if(checkUserIsLogin()){
      var token= Vue.$cookies.get("access_token");
      var token_type=Vue.$cookies.get("token_type");
      config.headers={"Authorization":token_type+" "+token}
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
    console.log(response);
    console.log(document.cookie);
    // 定时刷新access-token
    //  if (!response.data.value && response.data.data.message === 'token invalid') {
    //   // 刷新token
    //   // store.dispatch('refresh').then(response => {
    //   //  sessionStorage.setItem('access_token', response.data)
    //   // }).catch(error => {
    //   //  throw new Error('token刷新' + error)
    //   // })
    //  }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)


router.beforeEach((to, from, next) => {
  if (checkUserIsLogin()) {
    next()
  } else {
    if(to.path=="/login"){
      next()
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
})

function checkUserIsLogin() {
  var data = Vue.$cookies.get("access_token");
  return data
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
