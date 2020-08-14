import Vue from 'vue';
import Router from 'vue-router';


/* Layout */
import Layout from '@/layout';

Vue.use(Router);
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'home',
      //   component: () => import('@/views/home/Index'),
      //   name: 'Home',
      //   meta: {
      //     title: 'Home',
      //     roles: ['admin'] // or you can only set roles in sub nav
      //   }
      // },
      {
        path: 'user',
        component: () => import('@/views/user/Index'),
        name: 'DirectivePermission',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/role/Index'),
        name: 'RolePermission',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },

  // {
  //   path: '/home',
  //   component: Layout,
  //   // hidden: false,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/home/index'),
  //       // meta: { title: 'Error Log', icon: 'bug',roles:["admin"] }
  //       meta: { title: 'home', icon: 'dashboard', affix: true,roles:["admin"] }
  //     }
  //   ]
  // },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/booklist',
  //   component: Layout,
  //   redirect: '/booklist',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/book/index'),
  //       name: 'Booklist',
  //       meta: { title: 'booklist', icon: 'dashboard', affix: true,roles:["admin"] }
  //     }
  //   ]
  // },
  // {
  //   path: '/role',
  //   component: Layout,
  //   redirect: '/role',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/role/index'),
  //       name: 'Role',
  //       meta: { title: 'role', icon: 'dashboard', affix: true,roles:["admin"] }
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/user/index'),
  //       name: 'User',
  //       meta: { title: 'user', icon: 'dashboard', affix: true,roles:["admin"] }
  //     }
  //   ]
  // },
]

export const constantRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   // hidden: false,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/home/index'),
  //       meta: { title: '静态home', icon: 'bug',roles:["admin"] }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/booklist',
  //   component: Layout,
  //   redirect: '/booklist',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/book/index'),
  //       name: 'Booklist',
  //       meta: { title: '静态BookList', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/role',
  //   component: Layout,
  //   redirect: '/role',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/role/index'),
  //       name: 'Role',
  //       meta: { title: '静态Role', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user',
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/user/index'),
  //       name: 'User',
  //       meta: { title: '静态user', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})


const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
