import { request } from "./request";

export function login(username, password) { //登录接口
  return request({ //使用封装好的 axios 进行网络请求
    url: '/login',
    method: 'post',
    //跨域获取cookie，后端要设置Access-Control-Allow-Origin为源地址（即前端地址）
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

export function register(registerInfo) {
  return request({
    url: '/register',
    method: 'post',
    data: registerInfo
  })
}

export function changPassword(user, newPassword) {
  console.log(user)
  return request({
    url: '/changPassword',
    method: 'post',
    data: user,
    params: {
      newPassword
    }
  })
}
