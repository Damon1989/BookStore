// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setAccessToken, setTokenType } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from 'axios'
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
      axios
        .post("/oauth/connect/token", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.access_token != undefined) {
            setAccessToken(res.data.access_token);
            setTokenType(res.data.token_type);
            commit('SET_TOKEN', res.data.token)
            resolve(res)
          }
        })
        .catch(() => {
          reject()
        });


      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      // const { data } = response

      // if (!data) {
      //   reject('Verification failed, please Login again.')
      // }

      // const { roles, name, avatar, introduction } = data

      const roles = ['admin', 'deptAdmin'];

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      // commit('SET_INTRODUCTION', introduction)
      resolve(roles)
    }).catch(error => {
      reject(error)
    })
    // })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()

    //     // reset visited views and cached views
    //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //     dispatch('tagsView/delAllViews', null, { root: true })

    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
