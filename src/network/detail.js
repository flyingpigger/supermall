import {request} from "./request";

export function getDetail(id) {
  return request({
    url: "/book",
    methods: "GET",
    params: {
      id
    }
  });
}
