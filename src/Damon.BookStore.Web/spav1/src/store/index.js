import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const modulesFiles = require.context('./modules', true, /\.js$/);


const modules = modulesFiles.keys().reduce((moduleList, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  // eslint-disable-next-line no-param-reassign
  moduleList[moduleName] = value.default;
  return moduleList;
}, {});


const store = new Vuex.Store({
  modules,

});

export default store;
