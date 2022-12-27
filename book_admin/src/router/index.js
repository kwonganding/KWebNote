// import { from } from 'core-js/core/array'
import constants from '@/assets/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: '主页',
    component: () => import('../views/Main.vue'),
    redirect: '/home',
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
        path: '/book/add',
        name: '新增书籍',
        meta: { notshow: true }, //不显示在导航菜单汇总
        component: () => import('../views/book/BookEdit.vue'),
      },
      {
        path: '/book/update/:id',
        name: '编辑书籍',
        meta: { notshow: true }, //不显示在导航菜单汇总
        component: () => import('../views/book/BookEdit.vue'),
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
  // 除开登录页面，其他页面都验证token，如果没有token则跳转到登录页面
  // token不能放到store中，刷新时会丢失。即时做了持久化，在反序列化前也不可用
  const token = sessionStorage.getItem('token');
  if (!token)
    return next('/login');
  else
    next();
})
router.afterEach((to, from) => {
  //更新网页标题
  document.title = constants.sysName + '-' + to.name;
})

export default router
