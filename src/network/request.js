import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://localhost:8888",
    // baseURL: "http://192.168.1.104:8888",
    timeout: 3000
  })
  // 2.axios的拦截器
  instance.interceptors.request.use(
      config => {
        // console.log(config)
        // 1.比如config中的一些信息不符合服务器的要求

        // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

        // 3.某些网络请求(比如登录(token))，必须携带一些特殊的信息
        return config
      },
      err => {
        // console.log(err)
      }
  )
  instance.interceptors.response.use(
      res => {
        return res.data
      },
      error => {
        console.log(error)
      }
  )

  // 3.返回实例
  return instance(config)
}
