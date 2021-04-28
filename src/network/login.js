import { request } from "./request";

export function login(username, password) { //登录接口
  return request({ //使用封装好的 axios 进行网络请求
    url: '/login',
    method: 'post',
    withCredentials: true,
    //params用的是字符串(类似于QueryString)，data用的是payload也就是对象
    // params: { //提交的数据
    //   username: username,
    //   password: password
    // }
    data: { //提交的数据
      username: username,
      password: password
    }
  })
}
