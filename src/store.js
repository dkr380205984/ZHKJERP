import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 消息通知需要用的岗位和分组集合
    stationAndGroup: [],
    // 消息通知人员列表
    userList: []
  },
  mutations: {
    getStationAndGroup (state, data) {
      state.stationAndGroup = data
    },
    getUserList (state, data) {
      state.userList = data
    }
  },
  actions: {

  }
})
