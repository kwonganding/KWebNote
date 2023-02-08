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
export default [
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
    meta: { title: '主页', lang: 'main' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/doc',
        name: 'Doc',
        component: () => import('@/views/Doc.vue'),
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
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        hidden: true,
        component: () => import('@/views/Redirect.vue')
      },
    ]
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', lang: 'home', icon: 'el-icon-s-home', affix: true },
  },
  {
    path: '/doc',
    name: 'Doc',
    meta: { title: '文档', lang: 'doc', icon: 'el-icon-thumb', affix: true },
  },
  //书籍管理
  {
    path: '/book',
    component: Main,
    meta: { title: '书籍管理', lang: 'book', icon: 'el-icon-notebook-2' },
    name: '书籍管理',
    children: [
      {
        path: '/books',
        name: 'Books',
        meta: { title: '图书管理', lang: 'book', icon: 'el-icon-notebook-2' },
        component: () => import('@/views/book/Books.vue'),
      },
      {
        path: '/book/add',
        hidden: true,
        meta: { title: '新增书籍', icon: 'el-icon-add' }, //notshow不显示在导航菜单
        component: () => import('@/views/book/BookEdit.vue'),
      },
      {
        path: '/book/update/:id',
        hidden: true,
        meta: { title: '编辑书籍', icon: 'el-icon-edit' },
        component: () => import('@/views/book/BookEdit.vue'),
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Main,
    meta: { title: '订单管理', lang: 'order', icon: 'el-icon-s-shop' },
    children: [
      {
        path: '/test',
        name: 'Test',
        meta: { title: 'Test-View', lang: 'order', icon: 'el-icon-video-camera' },
        component: () => import('@/views/Test.vue'),
      },
    ]
  },
  // 系统管理
  {
    path: '/sys',
    component: Main,
    meta: { title: '系统管理', lang: 'sysManagement', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '/test',
        name: 'Test',
        meta: { title: 'Test-View', icon: 'el-icon-video-camera' },
        component: () => import('@/views/Test.vue'),
      },
      {
        path: '/dic',
        name: 'Dictionary',
        meta: { title: '字典管理', icon: 'el-icon-s-order' },
        component: () => import('@/views/dic/Dictionary.vue'),
      },
    ]
  },
  { path: '*', redirect: '/404', meta: { title: '404' }, },

]

// 动态路由，菜单导航使用