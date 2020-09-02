/* eslint-disable no-shadow */
import { asyncRoutes, constantRoutes } from '@/router';

const SET_ROUTES = 'SET_ROUTES';
const SET_PERMISSIONS = 'SET_PERMISSIONS';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasMenuPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasMenuPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
  permissions: [],
};

const mutations = {
  [SET_ROUTES]: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  [SET_PERMISSIONS]: (state, permissions) => {
    state.permissions = permissions;
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit(SET_ROUTES, accessedRoutes);
      resolve(accessedRoutes);
    });
  },
  generatePermissions({ commit }, permissions) {
    return new Promise((resolve) => {
      commit(SET_PERMISSIONS, permissions);
      resolve(permissions);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
