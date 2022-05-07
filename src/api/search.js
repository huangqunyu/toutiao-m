import request from "@/utils/request";
// 搜索联想
export const getSearchSuggestions = (q) => {
  return request({
    url: "/v1_0/suggestion",
    method: "GET",
    params: {
      // q: q,
      // 简写如下
      q,
    },
  });
};

// 搜索结果
export const getSearchResult = (params) => {
  return request({
    url: "/v1_0/search",
    method: "GET",
    params,
  });
};
