/* eslint-disable no-shadow */
import { login, getOAuthAccessToken, getInfo, logout } from '@/api/user';
import { getToken, setAccessToken, setTokenType, removeAccessToken, removeTokenType } from '@/utils/auth';
import { resetRouter } from '@/router';

const SET_TOKEN = 'SET_TOKEN';
const SET_NAME = 'SET_NAME';
const SET_ROLES = 'SET_ROLES';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
};

const mutations = {
  [SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  [SET_NAME]: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('grant_type', 'password');
      formData.append('scope', 'BookStore');
      formData.append('client_id', 'BookStore_App');
      formData.append('client_secret', '1q2w3e*');

      login(formData).then((res) => {
        if (res.access_token !== undefined) {
          setAccessToken(res.access_token);
          setTokenType(res.token_type);
          commit(SET_TOKEN, res.access_token);
          resolve(res);
        }
      }).catch((error) => {
        resolve(error);
      });
    });
  },
  getToken({ commit }) {
    return new Promise((resolve) => {
      // const formData = new FormData();
      // formData.append('username', username);
      // formData.append('password', password);
      // formData.append('grant_type', 'password');
      // formData.append('scope', 'BookStore');
      // formData.append('client_id', 'BookStore_App');
      // formData.append('client_secret', '1q2w3e*');

      getOAuthAccessToken().then((res) => {
        if (res !== undefined) {
          setAccessToken(res);
          // setTokenType(res.token_type);
          commit(SET_TOKEN, res);
          resolve(res);
        }
      }).catch((error) => {
        resolve(error);
      });
    });
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        const { roles, userName } = res;
        commit(SET_ROLES, roles);
        commit(SET_NAME, userName);
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit(SET_TOKEN, '');
        commit(SET_ROLES, []);
        removeAccessToken();
        removeTokenType();
        resetRouter();
        resolve();
      })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
