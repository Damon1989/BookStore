import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout';
import store from '@/store';
import { getAccessToken } from '@/utils/auth';
import { getUserPermission } from '@/api/user';

Vue.use(Router);


const whiteList = ['/login', '/auth-redirect'];

export const asyncRoutes = [];

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  }, {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'exceptionpage.index',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: {
          title: 'exceptionpage.fourzeroone', noCache: true,
        },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'exceptionpage.fourzerofour', noCache: true },
      },
    ],
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
];


const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}


router.beforeEach((to, from, next) => {
  if (getAccessToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        store.dispatch('user/getInfo').then(({ roles, id }) => {
          const permissions = [];
          getUserPermission(id).then((res) => {
            res.groups.forEach((group) => {
              group.permissions.forEach((permission) => {
                if (permission.isGranted) {
                  permissions.push(permission.name);
                }
              });
            });
            store.dispatch(
              'permission/generatePermissions',
              permissions,
            );
          });


          store.dispatch('permission/generateRoutes', roles).then((accessRoutes) => {
            router.addRoutes(accessRoutes);
            next({ ...to, replace: true });
          });
        });
      }
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
  }
});

export default router;
