import request from '@/utils/request';
export function getManagerList() {
  const pageIndex = 0;
  const pageSize = 1000;
  const division = 'TM';
  const title = 'BM';
  return request({
    url: `/ids.svc/api/Organization/salesUser/getAll?v=1.0&pageindex=
    ${pageIndex}&pagesize=${pageSize}&division=${division}&title=${title}`,
    type: 'get',
  });
}


export function submitDistrictManager(data) {
  return request({
    url: '/api/ZoneWithoutStoreRelations?v=1.0',
    method: 'post',
    data
  })
}

export function getDistrictManagerList(query) {
  const { pageIndex, pageSize, division } = query;
  var url = `/api/ZoneWithoutStoreRelations?v=1.0&pageIndex=${pageIndex - 1}&pageSize=${pageSize}
  &division=${division}`;
  return request({
    url,
    method: 'get',
  })
}
