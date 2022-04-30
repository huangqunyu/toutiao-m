// 频道请求模块
import request from '@/utils/request'

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    methods: 'GET'
  })
}

// 添加用户频道
export const addUserChannel = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户指定频道频道
export const deleteUserChannel = (channelID) => {
  return request({
    url: `/v1_0/user/channels/${channelID}`,
    method: 'DELETE'
  })
}
