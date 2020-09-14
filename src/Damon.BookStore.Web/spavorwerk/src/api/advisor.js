import request from '@/utils/request';


/* eslint-disable import/prefer-default-export */


export function getImportList() {
  const datalist = [{
    id: 1,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽0',
    phoneNumber: '13589784586',
    grade: '5星',
    registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
    valid: true,
    validMsg: '成功',
  }, {
    id: 2,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽1',
    phoneNumber: '13589784586',
    grade: '5星',
    registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
    valid: true,
    validMsg: '成功',
  }, {
    id: 3,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽2',
    phoneNumber: '13589784586',
    grade: '---',
    registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
    valid: false,
    validMsg: '顾问等级无效',
  }, {
    id: 4,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽3',
    phoneNumber: '13589784586',
    grade: '5星',
    registerAddress: '---',
    valid: false,
    validMsg: '注册地无效',
  }, {
    id: 5,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽4',
    phoneNumber: '13589784586',
    grade: '5星',
    registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
    valid: false,
    validMsg: '顾问不存在',
  },
  {
    id: 6,
    enterprise: '美善品',
    num: '10402213',
    jobNum: '2SH061.03',
    name: '王小丽4',
    phoneNumber: '13589784586',
    grade: '5星',
    registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
    valid: false,
    validMsg: '顾问不存在',
  }];
  return Promise.resolve(
    datalist,
  );
}


export function getList(query) {
  const { pageIndex, pageSize, division, title, realName, phoneNumber } = query;
  return request({
    url: `/ids.svc/api/Organization/salesUser/getAll?v=1.0&pageindex=
    ${pageIndex - 1}&pagesize=${pageSize}&division=${division}&title=${title}
    &realName=${realName}&phoneNumber=${phoneNumber}`,
    type: 'get',
  });
}


