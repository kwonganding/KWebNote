// 固定路由
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

/*
 * 路由属性说明：
 * name：组件名称，同组件申明时的name。在<keep-alive :include="cacheNames">中使用，用于确定缓存的组件范围
 * hidden：是否隐藏，不显示在导航菜单中
 * meta.title：标题
 * meta.icon：icon图标
 * meta.affix：是否固定，固定在标签栏
 */

// 路由配置
const baseRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    hidden: true,
    component: Login
  },
  {
    path: '/',
    hidden: true,
    component: Main,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true },
        component: () => import('../views/Home.vue'),
      }]
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', icon: 'el-icon-s-home', affix: true },
    component: () => import('../views/Home.vue'),
  },
  //书籍管理
  {
    path: '/book',
    component: Main,
    children: [

    ]
  },


  {
    path: '/404',
    name: 'Page404',
    meta: { title: '404' },
    hidden: true,
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/401',
    name: 'Page401',
    meta: { title: '401' },
    hidden: true,
    component: () => import('@/views/error/401.vue')
  },

]

const asyncRoutes = [

]

// 动态路由，菜单导航使用