import {request} from "@/network/request"

export function getHomeBanner() {
  return request({
    url: '/banner'
  })
}

export function getHomeGoods(type, pn) {
  return request({
    url: '/books',
    method: "GET",
    params: {
      type: type,
      pn: pn
    }
  })
}
