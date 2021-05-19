import {request} from "@/network/request"

export function getHomeBanner() {
  return request({
    url: '/banner'
  })
}

