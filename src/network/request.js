import axios from "axios";

// 对网络请求进行封装，如果有一天某一个第三方网络请求框架不再使用或维护，便于项目后期维护修改
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     // 创建axios的实例
//     const instance = axios.create({
//       baseURL: "http://152.136.185.210:7878/api/m5",
//       timeout: 5000
//     })
//     // 发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
export function request(config) {
  // 创建axios的实例,不同的实例属性的值可以不同，处理各自的事务
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })
  // axios请求拦截器
  instance.interceptors.request.use(config => {
    // 请求拦截器的作用：
    // config中的一些信息不符合服务器的要求，需要处理
    // 比如每次发送请求时，在界面显示请求图标
    // 某些网络请求，比如登录（token），必须携带一些特殊信息
    // 拦截处理之后要把config返回
    return config
  }, err => {
    console.log(err)
  })
  // axios响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  // 发送真正的网络请求,axios.create返回的就是一个promise对象
  return instance(config)
}