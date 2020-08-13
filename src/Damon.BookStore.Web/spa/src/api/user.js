import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth/connect/token',
    method: 'post',
    data,
    headers: { "Content-Type": "multipart/form-data" },
  })
}


export function getInfo(){
  return request({
    url: '/api/app/book/user',
    method: 'get',
  })
}
