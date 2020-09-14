// eslint-disable-next-line import/prefer-default-export

import request from '@/utils/request';

export function getDivisions() {
  var data = [
    { code: 'KS', name: '可宝' },
    { code: 'TM', name: '美善品' },
    { code: 'TI', name: '知淳' },
  ]
  return Promise.resolve(data);
}

export function getBranchCompanies() {
  return Promise.resolve(['分公司一', '分公司二', '分公司三']);
}

export function getPositionList() {
  var data = [
    { code: 'SA', name: '销售顾问' },
    { code: 'TL', name: '销售主任' },
  ]
  return Promise.resolve(data);
}


export function getSourceList() {
  return Promise.resolve(['全部', '官网预约', '小程序导入', '天猫导入']);
}

export function getOrderStatusList() {
  return Promise.resolve(['全部', '待分配', '待接单', '处理中', '已完成']);
}

export function getGradeList() {
  return Promise.resolve(['1星', '2星', '3星', '4星', '5星']);
}

export function getProvinceList() {
  return request({
    url: 'ws/district/v1/getchildren?key=YGDBZ-WXNC4-FL3UW-D2P4G-6C35J-5OFXQ',
    method: 'get',
  });
}


const specialCities = [
  {
    id: '110000',
    fullname: '北京市'
  },
  {
    id: '120000',
    fullname: '天津市'
  },
  {
    id: '310000',
    fullname: '上海市'
  },
  {
    id: '500000',
    fullname: '重庆市'
  },
  {
    id: '810000',
    fullname: '香港特别行政区'
  },
  {
    id: '820000',
    fullname: '澳门特别行政区'
  },
]

export function getSpecialCities() {
  return Promise.resolve(specialCities);
}

export function getCityList(province) {
  var specialCity = specialCities.filter(c => c.id == province);
  if (specialCity.length == 1) {
    return Promise.resolve({
      status: 0,
      result: [[specialCity[0]]]
    })
  } else {
    return request({
      url: `ws/district/v1/getchildren?key=YGDBZ-WXNC4-FL3UW-D2P4G-6C35J-5OFXQ&id=${province}`,
      method: 'get',
    });
  }
}

export function getDistrictList(city) {

  return request({
    url: `ws/district/v1/getchildren?key=YGDBZ-WXNC4-FL3UW-D2P4G-6C35J-5OFXQ&id=${city}`,
    method: 'get',
  });
}


export function getAddressList() {
  return request({
    url: '/ws/district/v1/list?key=YGDBZ-WXNC4-FL3UW-D2P4G-6C35J-5OFXQ',
    method: 'get',
  });
}
