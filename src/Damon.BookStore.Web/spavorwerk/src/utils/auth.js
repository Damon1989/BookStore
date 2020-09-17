import Cookies from 'js-cookie';

import store from '@/store';

const TokenKey = 'access_token';

const TokenTypeKey = 'token_type';

var Storage = {
  name: 'storage',
  //设置缓存
  setItem(params) {
    let obj = {
      name: '',
      value: '',
      expires: "",
      startTime: new Date().getTime()//记录何时将值存入缓存，毫秒级
    }
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      let type = Object.prototype.toString.call(options.value);
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (Object.prototype.toString.call(options.value) == '[object Object]') {
        options.value = JSON.stringify(options.value);
      }
      if (Object.prototype.toString.call(options.value) == '[object Array]') {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  },
  //拿到缓存
  getItem(name) {
    let item = localStorage.getItem(name);
    if (item == null) return false;
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      let date = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name);
        return false;
      } else {
        //缓存未过期，返回值
        return item.value;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item;
    }
  },
  //移出缓存
  removeItem(name) {
    localStorage.removeItem(name);
  },
  //移出全部缓存
  clear() {
    localStorage.clear();
  }
}


export function getAccessToken() {
  return Storage.getItem(TokenKey);
}

export function setAccessToken(token) {
  Storage.setItem({
    name: TokenKey,
    value: token,
    expires: 3600000
  })
}

export function removeAccessToken() {
  Storage.removeItem(TokenKey);
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


