import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './lang'
import './plugins/element.js'
import constants from './assets/constants'
//css
import './assets/css/iconfont.css'
import './assets/global.css'
import './assets/global.less'
import '@/../../util/js/util.js'

// 引入axios封装的api
// import api from './api/api';
import api from './api/mockapi.js';
// 挂载到vue上
Vue.prototype.$api = api;
// 全局设置

//注入全局资源
Vue.prototype.$consts = constants;

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  i18n,
  created: function () {
    SaveAndLoadStore();
    LoadUserConfig();
  }
}).$mount('#app')


//保存或加载vuex的数据
function SaveAndLoadStore() {
  //持久化store，避免刷新后的状态丢失
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem('bookadmin_vstore', JSON.stringify(store.state));
  });
  try {
    const vstore = sessionStorage.getItem('bookadmin_vstore');
    if (vstore)
      store.replaceState(Object.assign({}, store.state, JSON.parse(vstore)));
  }
  catch (ex) {
    console.log(ex)
  }
}

//加载用户配置信息
import { userConfig, themas } from '@/model/model'

function LoadUserConfig() {
  let vstr = localStorage.getItem('admin_userconfig');
  if (vstr) {
    Object.assign(userConfig, JSON.parse(vstr));
    userConfig.thema = themas.filter(s => s.name == userConfig.thema.name)[0];
    //语言
    i18n.locale = userConfig.language;
  }
}