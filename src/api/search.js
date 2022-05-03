// 搜索联想

import request from '@/utils/request'
export const getSearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      // q: q,
      // 简写如下
      q
    }
  })
}
