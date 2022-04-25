// 文章请求模块
import request from '@/utils/request'

// 请求获取文章 列表数据
export const getArticle = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    // ES6可以简写
    // params: params,
    params
  })
}
