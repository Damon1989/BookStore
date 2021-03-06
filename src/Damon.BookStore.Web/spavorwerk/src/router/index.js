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
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/role',
  //   // alwaysShow: true, // will always show the root menu
  //   name: 'system',
  //   meta: {
  //     title: 'system.index',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'], // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/user/index'),
  //       name: 'UserData',
  //       meta: { title: 'system.user', icon: 'dashboard', affix: true },
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/role/index'),
  //       name: 'RoleData',
  //       meta: { title: 'system.role', icon: 'dashboard', affix: true },
  //     },
  //   ],
  // },
  {
    path: '/advisor',
    component: Layout,
    redirect: '/advisor/list',
    // alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: 'advisor.manage',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/advisor/list'),
        name: 'advisorlist',
        meta: { title: 'advisor.list', icon: 'dashboard' },
      },
      {
        path: 'import',
        component: () => import('@/views/advisor/import'),
        name: 'advisorimport',
        meta: { title: 'advisor.import', icon: 'dashboard' },
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/advisor/edit'),
        name: 'advisordata',
        hidden: true,
        meta: { title: 'advisor.edit', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/list',
    // alwaysShow: true, // will always show the root menu
    name: 'manager',
    meta: {
      title: 'manager.manage',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/manager/list'),
        name: 'managerlist',
        meta: { title: 'manager.list', icon: 'dashboard', affix: true },
      },
      {
        path: 'import',
        component: () => import('@/views/manager/import'),
        name: 'managerimport',
        meta: { title: 'manager.import', icon: 'dashboard' },
      },
      {
        path: 'add',
        component: () => import('@/views/manager/add'),
        name: 'managerdata',
        hidden: true,
        meta: { title: 'manager.add', icon: 'dashboard' },
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/manager/edit'),
        name: 'managerdata',
        hidden: true,
        meta: { title: 'manager.edit', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/branch',
    component: Layout,
    redirect: '/branch/list',
    // alwaysShow: true, // will always show the root menu
    name: 'branch',
    meta: {
      title: 'branch.manage',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/branch/list'),
        name: 'branchlist',
        meta: { title: 'branch.list', icon: 'dashboard', affix: true },
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/branch/edit'),
        name: 'branchdata',
        hidden: true,
        meta: { title: 'branch.edit', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    // alwaysShow: true, // will always show the root menu
    name: 'order',
    meta: {
      title: 'order.manage',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: 'orderlist',
        meta: { title: 'order.list', icon: 'dashboard', affix: true },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/order/detail'),
        name: 'orderdata',
        hidden: true,
        meta: { title: 'order.detail', icon: 'dashboard' },
      },
      {
        path: 'import',
        component: () => import('@/views/order/import'),
        name: 'orderimport',
        meta: { title: 'order.import', icon: 'dashboard' },
      },
    ],
  },
  tableRouter,
  // componentsRouter,
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
        meta: { title: 'dashboard', icon: 'dashboard', affix: false },
      },
    ],
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel.manage',
      icon: 'excel'
    },
    children: [
      // {
      //   path: 'export-excel',
      //   component: () => import('@/views/excel/export-excel'),
      //   name: 'ExportExcel',
      //   meta: { title: 'Export Excel' }
      // },
      // {
      //   path: 'export-selected-excel',
      //   component: () => import('@/views/excel/select-excel'),
      //   name: 'SelectExcel',
      //   meta: { title: 'Export Selected' }
      // },
      // {
      //   path: 'export-merge-header',
      //   component: () => import('@/views/excel/merge-header'),
      //   name: 'MergeHeader',
      //   meta: { title: 'Merge Header' }
      // },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'excel.upload' }
      }
    ]
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
      if (store.getters.permission_routes == undefined) {
        store.dispatch('permission/generateRoutes', 'admin').then((accessRoutes) => {
          router.addRoutes(accessRoutes);
        });
      }
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    store.dispatch('user/getToken', this.form).then((res) => {
      store.dispatch('permission/generateRoutes', 'admin').then((accessRoutes) => {
        router.addRoutes(accessRoutes);
        next();
      });
    });
  }
});

export default router;
