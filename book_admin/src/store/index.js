import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局存储的用户信息
    user: { id: '', name: '', img: '', token: '', }
  },
  getters: {
  },
  mutations: {
    //更新用户信息
    setUser(state, obj) {
      state.user.name = obj.name;
      state.user.token = obj.token;
    }
  },
  actions: {
  },
  modules: {
  }
})
