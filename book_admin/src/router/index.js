// import { from } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录页面',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: '主页',
    component: () => import('../views/Main.vue'),
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: '首页',
        meta: { icon: 'el-icon-s-home' },
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/book',
        name: '图书管理',
        meta: { icon: 'el-icon-notebook-2' },
        component: () => import('../views/book/Books.vue'),
      },
      {
        path: '/book',
        name: '图书分类',
        meta: { icon: 'el-icon-notebook-2' },
        component: () => import('../views/book/Books.vue'),
      },
      {
        path: '/book',
        name: '订单管理',
        meta: { icon: 'el-icon-notebook-2' },
        component: () => import('../views/book/Books.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/bookadmin/',
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
router.afterEach((to, from) => {
  //更新网页标题
  document.title = '图书馆管理系统-' + to.name;
})

export default router
