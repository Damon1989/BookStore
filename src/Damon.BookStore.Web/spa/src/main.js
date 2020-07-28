// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
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
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueAxios,Axios)
console.log(Vue);
console.log(Vue.http);
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
