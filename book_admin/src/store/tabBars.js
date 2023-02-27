
export default {
  namespaced: true,
  state: {
    //注意：持久化vuex时，state需要序列化为JSON字符串，不支持组件，因此路由信息中不应包含component
    cacheRoutes: [], //缓存的路由，用于标签栏使用
    cacheNames: [],  //缓存的打开的路由名称，用于Keep-alive的缓存白名单
  },
  mutations: {
    add(state, obj) {
      if (!state.cacheRoutes.some(s => s.path === obj.path))
        //添加打开的路由，只需要path、name、mata
        state.cacheRoutes.push({ path: obj.path, name: obj.name, meta: obj.meta });
      state.cacheNames = state.cacheRoutes.map(s => s.name);
    },
    remove(state, obj) {
      const i = state.cacheRoutes.findIndex(s => s.path === obj.path);
      if (i < 0)
        return;
      state.cacheRoutes.splice(i, 1);
      state.cacheNames = state.cacheRoutes.map(s => s.name);
    },
    removeAll(state) {
      // 移除所有，除了固定的
      // 退出登录的时候调用
      const affixItems = state.cacheRoutes.filter(s => s.meta.affix);
      state.cacheRoutes = affixItems;
      state.cacheNames = state.cacheRoutes.map(s => s.name);
    },
    removeOther(state, obj) {
      // 移除其他的，不含固定、当前
      state.cacheRoutes = state.cacheRoutes.filter(s => s.meta.affix || s.path === obj.path);
      state.cacheNames = state.cacheRoutes.map(s => s.name);
    },
    removeName(state, obj) {
      //只移除缓存名字
      const i = state.cacheNames.findIndex(s => s === obj.name);
      if (i < 0)
        return;
      state.cacheNames.splice(i, 1);
    },
    clear(state) {
      //清空所有
      state.cacheRoutes = [];
      state.cacheNames = [];
    }
  },
  actions: {
  },
}
