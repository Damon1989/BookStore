import Cookies from 'js-cookie'

const TokenKey = 'access_token'

const TokenTypeKey="token_type"

export function getAccessToken() {
  return Cookies.get(TokenKey)
}

export function setAccessToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeAccessToken() {
  return Cookies.remove(TokenKey)
}

export function getTokenType(){
  return Cookies.get(TokenTypeKey)
}

export function setTokenType(tokenType){
  return Cookies.set(TokenTypeKey,tokenType)
}

export function removeTokenType(){
  return Cookies.remove(TokenTypeKey)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
