import { login, getInfo } from '@/api/user'
import { getToken,  setAccessToken, setTokenType } from '@/utils/auth'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { userNameOrEmailAddress, password } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("username", userNameOrEmailAddress);
      formData.append("password", password);
      formData.append("grant_type", "password");
      formData.append("scope", "BookStore");
      formData.append("client_id", "BookStore_App");
      formData.append("client_secret", "1q2w3e*");

      login(formData).then((res) => {
        if (res.access_token != undefined) {
          setAccessToken(res.access_token);
          setTokenType(res.token_type);
          commit('SET_TOKEN', res.access_token)
          console.log(1);
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },


  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        console.log(res);
        const { roles ,userName} = res;

        commit('SET_ROLES', roles)
        commit("SET_NAME",userName)
        console.log("name="+userName);
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
