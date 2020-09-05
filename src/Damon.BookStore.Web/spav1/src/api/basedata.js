// eslint-disable-next-line import/prefer-default-export
export function getEnterprises() {
  return Promise.resolve(['美善品', '可宝', '知淳']);
}

export function getBranchCompanies() {
  return Promise.resolve(['分公司一', '分公司二', '分公司三']);
}

export function getPositionList() {
  return Promise.resolve(['SA', 'TL', 'BM', 'AM']);
}

export function getLevelList() {
  return Promise.resolve(['1星', '2星', '3星', '4星', '5星']);
}

export function getProvinceList() {
  return Promise.resolve(['上海市 ', '江苏省']);
}


export function getCityList() {
  return Promise.resolve(['上海市 ', '盐城市']);
}

export function getAreaList() {
  return Promise.resolve(['浦东新区 ', '东台市']);
}
