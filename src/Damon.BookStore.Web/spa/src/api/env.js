import request from '@/utils/request'

export function changeLang(lang) {
  return request({
    url: "/api/navigation/changelanguage?culture="+lang+'&uiCulture='+lang,
    method: "get"
  })
}
