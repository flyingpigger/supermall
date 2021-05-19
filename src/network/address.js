import {request} from "@/network/request"

export function getAddressList(uid) {
  return request({
    url: "/profile/addressList",
    methods: "GET",
    params: {
      uid
    }
  })
}

export function postAddress(content) {
  return request({
    url: "/profile/addAddress",
    method: 'POST',
    data: content
  })
}

export function putAddress(content) {
  return request({
    url: "/profile/editAddress",
    method: 'PUT',
    data: content
  })
}

export function deleteAddress(content) {
  return request({
    url: "/profile/deleteAddress",
    method: 'DELETE',
    data: content
  })
}

export function getDefaultAddress(uid) {
  return request({
    url: "/defaultAddress",
    methods: "GET",
    params: {
      uid
    }
  })
}
