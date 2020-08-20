import Cookies from 'js-cookie'

const TokenKey = 'access_token'

const TokenTypeKey = 'token_type'

export function getAccessToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setAccessToken(token) {
  sessionStorage.setItem(TokenKey, token)
}

export function removeAccessToken() {
  sessionStorage.removeItem(TokenKey)
}

export function getTokenType() {
  return sessionStorage.getItem(TokenTypeKey)
}

export function setTokenType(tokenType) {
  sessionStorage.setItem(TokenTypeKey, tokenType)
}

export function removeTokenType() {
  sessionStorage.removeItem(TokenTypeKey)
}

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, token) {
  return Cookies.set(key, token)
}

export function removeToken(key) {
  return Cookies.remove(key)
}



import store from '@/store'
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
export function hasPermission (perms) {
    // let hasPermission = false
    console.log(store.state);
    console.log(store.state.permission);
    console.log(store.state.permission.permissions);
    let permissions = store.state.permission.permissions
    console.log(2);
    return permissions.includes(perms);

    // if(permissions.includes(perms))
    // for(let i=0, len=permissions.length; i<len; i++) {
    //     if(permissions[i] === perms) {
    //         hasPermission = true;
    //         break
    //     }
    // }
    // return hasPermission
}
