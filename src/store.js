import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 消息通知需要用的岗位和分组集合
    stationAndGroup: [],
    // 消息通知人员列表
    userList: [],
    // 工厂名称
    client_name: ''
  },
  mutations: {
    getStationAndGroup (state, data) {
      state.stationAndGroup = data
    },
    getUserList (state, data) {
      state.userList = data
    },
    setClientName (state, data) {
      state.client_name = data
    }
  },
  actions: {

  }
})
