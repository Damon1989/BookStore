import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)
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
  }
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
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '异常页面',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  }
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
