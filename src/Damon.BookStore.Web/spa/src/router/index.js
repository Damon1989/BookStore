import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import About from '@/components/About'
import BookList  from '@/components/BookList';
import Role from '@/components/Role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
