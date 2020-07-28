import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import About from '@/components/About'
import BookList  from '@/components/BookList';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'Login',
      component: About
    },
    {
      path: '/booklist',
      name: 'BookList',
      component: BookList
    }
  ]
})
