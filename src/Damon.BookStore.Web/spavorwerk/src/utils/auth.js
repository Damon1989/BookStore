import Cookies from 'js-cookie';


import store from '@/store';

const TokenKey = 'access_token';

const TokenTypeKey = 'token_type';

export function getAccessToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setAccessToken(token) {
  sessionStorage.setItem(TokenKey, token);
}

export function removeAccessToken() {
  sessionStorage.removeItem(TokenKey);
}

export function getTokenType() {
  return sessionStorage.getItem(TokenTypeKey);
}

export function setTokenType(tokenType) {
  sessionStorage.setItem(TokenTypeKey, tokenType);
}

export function removeTokenType() {
  sessionStorage.removeItem(TokenTypeKey);
}

export function getToken(key) {
  return Cookies.get(key);
}

export function setToken(key, token) {
  return Cookies.set(key, token);
}

export function removeToken(key) {
  return Cookies.remove(key);
}
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param perms
 */
export function hasPermission(perms) {
  const permissions = store.state.permission.permissions;
  return permissions.includes(perms);
}
