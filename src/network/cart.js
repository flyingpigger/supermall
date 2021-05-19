import {request} from "@/network/request"

export function getCart(uid) {
  return request({
    url: "/getCart",
    params: {
      uid
    }
  })
}

export function addCount(bid, uid) {
  return request({
    url: "/addCount",
    method: 'PUT',
    params: {
      bid,
      uid
    }
  })
}

export function minusCount(bid, uid) {
  return request({
    url: "/minusCount",
    method: 'PUT',
    params: {
      bid,
      uid
    }
  })
}

export function addItem(bid, uid) {
  return request({
    url: "/addItem",
    method: 'POST',
    params: {
      bid,
      uid
    }
  })
}

export function deleteItem(bid, uid) {
  return request({
    url: "/deleteItem",
    method: 'DELETE',
    params: {
      bid,
      uid
    }
  })
}

export function checkClick(bid, checked, uid) {
  return request({
    url: "/setCheck",
    method: 'PUT',
    params: {
      bid,
      checked,
      uid
    }
  })
}

export function checkAllClick(uid, checked) {
  return request({
    url: "/setAllCheck",
    method: 'PUT',
    params: {
      uid,
      checked
    }
  })
}
