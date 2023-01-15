
export default {
  namespaced: true,
  state: {
    cacheRoutes: []
  },
  mutations: {
    //更新用户信息
    Add(state, obj) {
      if (state.cacheRoutes.some(s => s.path === obj.path))
        return
      state.cacheRoutes.push(obj);
    },
    Remove(state, obj) {
      const i = state.cacheRoutes.findIndex(s => s.path === obj.path);
      if (i < 0)
        return;
      state.cacheRoutes.splice(i, 1);
    },
    RemoveAll(state) {
      // 移除所有，除了固定的
      const affixItems = state.cacheRoutes.filter(s => s.meta.affix);
      state.cacheRoutes = affixItems;
    },
    RemoveOther(state, obj) {
      // 移除其他的，不含固定、当前
      console.log(obj)
      state.cacheRoutes = state.cacheRoutes.filter(s => s.meta.affix || s.path === obj.path);
    }
  },
  actions: {
  },
}
