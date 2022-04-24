// 基于axios封装的请求模块
import axios from 'axios'
const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器

// 响应拦截器

// 把最基础的axios封装了一次，暴露出去
export default request
