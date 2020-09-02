const getters = {
  sidebar: state => state.app.sidebar,
  roles: state => state.user.roles,
  token: state => state.user.token,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
};
export default getters;
