import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth/connect/token',
    method: 'post',
    data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export function logout(){
  return request({
    url:"/api/account/logout"
  })
}

export function getOauthUserInfo(){
  return request({
    url:'/oauth/connect/userinfo',
    method: 'get',
  })
}

export function getInfo(){
  return request({
    url: '/api/app/book/user',
    method: 'get',
  })
}

export function getUser(id){
  return request({
    url: "/api/identity/users/" + id,
    method: 'get',
  })
}


export function getUserRoles(id){
  return request({
    url: "/api/identity/users/" + id + "/roles",
    method: 'get',
  })
}

export function addUser(data){
  return request({
    url: "/api/identity/users",
    method: "post",
    data
  })
}

export function editUser(data){
  return request({
    url: "/api/identity/users/" +data.id,
    method: "put",
    data
  })
}

export function deleteUser(id){
  return request({
    url: "/api/identity/users/" +id,
    method: "delete"
  })
}

export function getUserList(query) {
  const { skipCount, pageSize } = query;
  var url = "/api/identity/users?SkipCount=" + skipCount + "&MaxResultCount=" + pageSize;
  return request({
    url: url,
    method: 'get',
  })
}



export function getUserPermission(userId) {
  return request({
    url: "/api/permission-management/permissions?providerName=U&providerKey=" + userId,
    method: "get"
  })
}


export function addUserPermission(userId, data) {
  return request({
    url: "/api/permission-management/permissions?providerName=U&providerKey=" + userId,
    method: "put",
    data
  })
}
