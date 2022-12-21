import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias:['/home'],
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  base:'/zfadmin/',
  routes,
})

// 路由全局守卫-导航前，登录token判断
router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    return next();
  const token = sessionStorage.getItem('token');
  if (!token)
    return next('/login');
  else
    next();
})

export default router
