import {request} from "@/network/request"

export function postOrder(content) {
  return request({
    url: '/postOrder',
    method: 'POST',
    data: content
  })
}

export function myOrder(uid) {
  return request({
    url: '/myOrders',
    params: {
      uid
    }
  })
}

export function payForOrder(oid) {
  return request({
    url: '/payForOrder',
    method: 'PUT',
    params: {
      oid
    }
  })
}

export function receiveOrder(oid) {
  return request({
    url: '/orderReceived',
    method: 'PUT',
    params: {
      oid
    }
  })
}
