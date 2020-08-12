import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import Login from '@/components/Login'
import About from '@/components/About'
// import BookList  from '@/components/BookList';
import Role from '@/components/Role'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: Layout,
      children:[
        {
          path:'home',
          component:()=>import('@/views/home/index'),
          name:'Home'
        }
      ]
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
      // redirect: '/booklist',
      component: Layout,
      children:[
        {
          path:'/',
          component:()=>import('@/views/book/index'),
          name:'Booklist'
        }
      ]
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
