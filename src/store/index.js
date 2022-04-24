import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)

const TokenKey = 'tokenKey'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登陆用户的信息(token等数据)
    // user: JSON.parse(localStorage.getItem("TokenKey"))
    user: getItem(TokenKey)
  },
  getters: {},
  mutations: {
    setUser (state, userData) {
      state.user = userData

      // 为了防止用户刷新丢失数据，我们需要把数据备份到本地存储
      // window.localStorage.setItem('TokenKey', JSON.stringify(state.user))
      // 使用封装好的方法
      setItem(TokenKey, state.user)
    }
  },
  actions: {},
  modules: {}
})
