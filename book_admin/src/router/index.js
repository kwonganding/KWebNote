import constants from '@/assets/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'
//路由配置
import baseRoutes from './routes'
//注册路由插件
Vue.use(VueRouter)
// 创建路由
const router = new VueRouter({
  mode: 'hash',           //模式
  base: process.env.BASE_URL,
  routes: baseRoutes,        //路由配置
})

// 路由全局守卫-导航前，登录token判断
router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    return next();
  // 除开登录页面，其他页面都验证token，如果没有token则跳转到登录页面
  // token不能放到store中，刷新时会丢失。即时做了持久化，在反序列化前也不可用
  const token = sessionStorage.getItem('admin_token');
  if (!token)
    return next('/login');
  else
    next();
})
router.afterEach((to, from) => {
  //更新网页标题
  document.title = constants.sysName + '-' + to.meta.title;
})

export default router
