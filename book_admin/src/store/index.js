import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: '', name: '', img: '', token: '', }
  },
  getters: {
  },
  mutations: {
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
