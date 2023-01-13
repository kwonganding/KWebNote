//对axios的封装，导出axios，并附加api接口

// 地址配置
// 开发环境的跨域代理
const proxy = process.env.NODE_ENV === 'production' ? '' : '/server';
const URL = {
  proxy: proxy,
  login: '/api/login',
  stats_base: '/api/stats_base',
  stats_order: '/api/stats_order',
  stats_user: '/api/stats_user',
  book_list: '/api/book/list',
  book_id: '/api/book/id',
  book_save: '/api/book/save',
}

// 引入axios
import axios from 'axios';
//创建实例
let api = axios.create({
  baseURL: proxy,  //基础URL
  timeout: 9000,
});
api.URL = URL;

//拦截的封装，对请求、响应进行通用化的拦截处理

//请求拦截，可处理token、实现进度条效果
api.interceptors.request.use(function (cfg) {
  return cfg;
})
// 响应拦截，可判断响应状态
api.interceptors.response.use(res => {
  if (res.status === 200 && res.data?.status === 'OK')
    return Promise.resolve(res.data);
  else
    return Promise.reject(res.data?.message ? res.data.message : res.status);
}, err => {
  console.error(err);
  return Promise.reject(err.message);
})

api.login = function (param) {
  return api.post(URL.login, param);
}

api.stats_base = function () {
  return api.get(URL.stats_base);
}

api.stats_order = function () {
  return api.get(URL.stats_order);
}

api.stats_user = function () {
  return api.get(URL.stats_user);
}

api.book_list = function (param) {
  return api.post(URL.book_list, param);
}

api.book_id = function (param) {
  return api.get(URL.book_id, { param });
}

api.book_save = function (param) {
  return api.post(URL.book_save, param);
}



export default api;