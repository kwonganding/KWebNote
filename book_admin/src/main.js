import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/default.css'

// 引入echarts
import * as echarts from 'echarts';
// 在Vue原型上挂载$echarts，在vue示例中this.$echarts
Vue.prototype.$echarts = echarts;

// 引入axios
import axios from 'axios';
// 挂载到vue上
Vue.prototype.$axios = axios;
// 全局设置
axios.defaults.baseURL = '';
axios.interceptors.request.use(function (cfg) {
  let token = store.state.user.token;
  if (token)
    cfg.headers['token'] = token;
  return cfg;
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created: function () {
    //持久化store，避免刷新后的状态丢失
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem('vstore', JSON.stringify(this.$store.state));
    });
    try {
      const vstore = sessionStorage.getItem('vstore');
      if (vstore)
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(vstore)));
    }
    catch (ex) {
      console.log(ex)
    }
  }
}).$mount('#app')
