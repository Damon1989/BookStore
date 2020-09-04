import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout';
import store from '@/store';
import { getAccessToken } from '@/utils/auth';
import { getUserPermission } from '@/api/user';
import tableRouter from './modules/table';
import componentsRouter from './modules/components';

Vue.use(Router);


const whiteList = ['/login', '/auth-redirect'];

export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    // alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: 'system.index',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'UserData',
        meta: { title: 'system.user', icon: 'dashboard', affix: true },
      },
      {
        path: 'role',
        component: () => import('@/views/role/index'),
        name: 'RoleData',
        meta: { title: 'system.role', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/adviser',
    component: Layout,
    redirect: '/adviser/list',
    // alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: 'adviser.manage',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/adviser/list'),
        name: 'adviserlist',
        meta: { title: 'adviser.list', icon: 'dashboard', affix: true },
      },
      {
        path: 'import',
        component: () => import('@/views/adviser/import'),
        name: 'import',
        meta: { title: 'adviser.import', icon: 'dashboard' },
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/adviser/edit'),
        name: 'RoleData',
        hidden: true,
        meta: { title: 'adviser.edit', icon: 'dashboard', hidden: true },
      },
    ],
  },
  tableRouter,
  componentsRouter,
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help',
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' },
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true,
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' },
  //     },
  //   ],
  // },
];

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'exceptionpage.index',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'exceptionpage.fourzeroone', noCache: true },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'exceptionpage.fourzerofour', noCache: true },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
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
