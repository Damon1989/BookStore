import request from '@/utils/request'

export function getList(query) {
  const { skipCount, pageSize } = query;
  var url = "/api/identity/roles?SkipCount=" + skipCount + "&MaxResultCount=" + pageSize;
  return request({
    url: url,
    method: 'get',
  })
}

export function get(id) {
  return request({
    url: "/api/identity/roles/" + id,
    method: "get"
  })
}

export function add(data) {
  return request({
    url: "/api/identity/roles",
    method: "post",
    data
  })
}

export function edit(data) {
  return request({
    url: "/api/identity/roles/" + data.id,
    method: "put",
    data
  })
}


export function deleteRole(id) {
  return request({
    url: "/api/identity/roles/" + id,
    method: "delete",
  })
}

export function getRolePermission(role) {
  return request({
    url: "/api/permission-management/permissions?providerName=R&providerKey=" + role,
    method: "get"
  })
}


export function addRolePermission(role, data) {
  return request({
    url: "/api/permission-management/permissions?providerName=R&providerKey=" + role,
    method: "put",
    data
  })
}
