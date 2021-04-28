import {request} from "@/network/request"

export function addCount(bookID) {
  return request({
    url: "/addCount",
    method: 'put',
    params: {
      bookID
    }
  })
}

export function addItem(bookID, userID,) {
  return request({
    url: "/addItem",
    method: 'post',
    params: {
      bookID,
      userID
    }
  })
}

export function checkClick(bookID, checked) {
  return request({
    url: "/setCheck",
    method: 'put',
    params: {
      bookID,
      checked
    }
  })
}

export function checkAllClick(userID, checked) {
  return request({
    url: "/setAllCheck",
    method: 'put',
    params: {
      userID,
      checked
    }
  })
}
