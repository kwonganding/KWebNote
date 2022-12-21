import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

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
  let token = sessionStorage.getItem('token');
  if (token)
    cfg.headers['token'] = token;
  return cfg;
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
