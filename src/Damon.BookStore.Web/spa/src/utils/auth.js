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
