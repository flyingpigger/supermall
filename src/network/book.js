import {request} from "./request"

export function getBooksByType(type, pn) {
  return request({
    url: '/books',
    method: "GET",
    params: {
      type: type,
      pn: pn
    }
  })
}

export function getBooks(pn) {
  return request({
    url: "/allBooks/" + pn
  })
}

export function searchBook(keyWord) {
  return request({
    url: '/searchBook',
    method: "GET",
    params: {
      keyWord: keyWord
    }
  })
}

