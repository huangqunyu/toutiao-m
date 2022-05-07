import request from "@/utils/request";
// import store from '@/store'

export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    // url: `/v1_0/sms/codes/${mobile}`,
    url: `/v1_0/sms/codes/${mobile}`,
    // params: {
    //     mobile
    // }
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // 专门用来发送请求头数据的
    // headers: {
    //     // 注意：该接口需要权限访问
    //     // token的数据格式 Bearer token数据

    //     Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

// 关注用户
export const addFollow = (userId) => {
  return request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target: userId,
    },
  });
};

// 取消关注用户
export const deleteFollow = (userId) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: "DELETE",
  });
};
