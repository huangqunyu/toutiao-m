// 基于axios封装的请求模块
import axios from 'axios'
// 把Vuex的容器加载进来
import store from '@/store/index.js'
const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    // 请求发起会会经过这里
    // const { user } = store.state
    // if (user && user.token) {
    //     config.headers.Authorization = `Bearer ${store.state.user.token}`
    // }
    if (store.state.user && store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 这里务必返回config,否则请求就停在这么出不去了
    return config
  },
  function (error) {
    // 如果请求出错了(还没有发出去),会进入这里
    return Promise.reject(error)
  }
)

// 响应拦截器

// 把最基础的axios封装了一次，暴露出去
export default request
