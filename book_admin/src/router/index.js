// import { from } from 'core-js/core/array'
import constants from '@/assets/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    meta: { title: '主页' },
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true },//affix固定在标签栏
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/book',
        name: 'Books',
        meta: { title: '图书管理', icon: 'el-icon-notebook-2' },
        component: () => import('../views/book/Books.vue'),
      },
      {
        path: '/book/add',
        meta: { title: '新增书籍', notshow: true }, //notshow不显示在导航菜单
        component: () => import('../views/book/BookEdit.vue'),
      },
      {
        path: '/book/update/:id',
        meta: { title: '编辑书籍', notshow: true },
        component: () => import('../views/book/BookEdit.vue'),
      },
      {
        path: '/test',
        name: 'Test',
        meta: { title: 'Test-View', icon: 'el-icon-video-camera' },
        component: () => import('../views/Test.vue'),
      },
      {
        path: '/dic',
        name: 'DicList',
        meta: { title: '字典管理', icon: 'el-icon-s-order' },
        component: () => import('../views/dic/DicList.vue'),
      },
    ]
  },
]

// 创建路由

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
