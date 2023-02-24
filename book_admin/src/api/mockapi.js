//对axios的封装，导出axios，并附加api接口

// 地址配置
// 开发环境的跨域代理
const proxy = '.';
const URL = {
  proxy: proxy,
  upload: proxy + '/upload',
  login: '/api/login',
  stats_base: '/api/stats_base',
  stats_order: '/api/stats_order',
  stats_user: '/api/stats_user',
  book_list: '/api/book/list',
  book_id: '/api/book/id',
  book_save: '/api/book/save',
  dictype: '/api/sys/dictype/list',
  dicdata: '/api/sys/dicdata/list',
  dicdata_save: '/api/sys/dicdata/save',
  dicdata_delete: '/api/sys/dicdata/delete',
  order_list: '/api/order/list',
  order_save: '/api/order/save',
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

//一个空的、没有价值的api
api.api = function (param) {
  return Promise.resolve({ data: [], total: 10 });
}

api.login = function (param) {
  return Promise.resolve({ status: 'OK', message: 'mock接口！登录成功', token: param.name });
}

api.stats_base = function () {
  return Promise.resolve({
    status: 'OK', message: 'mock接口！', data: {
      user: 33224,
      book: 1334,
      order: 213,
      money: 1552.24,
    }
  });
}

api.stats_order = function () {
  return Promise.resolve({
    status: 'OK', message: 'mock接口！', data: [
      { name: '1月', value: 33 },
      { name: '2月', value: 46 },
      { name: '3月', value: 245 },
      { name: '4月', value: 322 },
      { name: '5月', value: 78 },
      { name: '6月', value: 178 },
      { name: '7月', value: 278 },
    ]
  });
}

api.stats_user = function () {
  return Promise.resolve({
    status: 'OK', message: 'mock接口！', data: [
      { name: '1月', value: 121 },
      { name: '2月', value: 146 },
      { name: '3月', value: 245 },
      { name: '4月', value: 478 },
      { name: '5月', value: 1278 },
      { name: '6月', value: 3450 },
      { name: '7月', value: 7890 },
      { name: '8月', value: 10000 },
      { name: '9月', value: 24567 },
    ]
  });
}

// 书籍管理
api.book_list = function (param) {
  let data = [
    { "id": 1, "name": "深入理解C#(第3版)1", "author": "Jon Skeet", "tag": "买它！", "price": 1333.2, "comments": 1444, "imgs": "/file/1676274037258-2.png,/file/1676274041436-è±¡.gif,/file/1676274045118-gif007.gif", "status": "normal", "lasttime": 1676274046921 },
    { "id": 2, "name": "O'Reilly：框架设计（第3版）（影印版）", "author": "[美] 瑞奇特 Jeffrey Richte\n", "tag": "新上市", "price": 1333.2, "comments": 2223, "imgs": "/file/1676274067754-wallhaven-5g7ew7.jpg", "status": "normal", "lasttime": 1676274069315 },
    { "id": 3, "name": "项目管理知识体系指南", "author": "[美] 项目管理协会", "tag": "新上市", "price": 16, "comments": 11, "imgs": "/file/1676274080582-klogo.png", "status": "normal", "lasttime": 1676274081991 }
  ];

  return Promise.resolve({ status: 'OK', message: 'mock接口！!', data, total: 33 });
}
api.book_id = function (param) {
  let data = { "id": 1, "name": "深入理解C#(第3版)1", "author": "Jon Skeet", "tag": "买它！", "price": 1333.2, "comments": 1444, "imgs": "/file/1676274037258-2.png,/file/1676274041436-è±¡.gif,/file/1676274045118-gif007.gif", "status": "normal", "lasttime": 1676274046921 };
  return Promise.resolve({ status: 'OK', message: 'mock接口！!', data });
}
api.book_save = function (param) {
  return Promise.resolve({ status: 'OK', message: 'mock接口！!' });
}

//字典管理
api.dictype = function () {
  return Promise.resolve({
    status: 'OK', message: 'mock接口！!', data: [
      { "id": 1, "code": "bookTag", "name": "商品标签", tree: 0 }, { "id": 2, "code": "bookType", "name": "书籍分类", tree: 1 }
    ]
  });
}
api.dicdata = function (param) {
  let data = [];
  switch (param.code) {
    case 'bookType':
      data = [
        { "id": 5, "name": "科技", "code": "bookType", "sort": 1, "pid": 0 },
        { "id": 6, "name": "计算机/网络", "code": "bookType", "sort": 1, "pid": 5 },
        { "id": 7, "name": "人文历史", "code": "bookType", "sort": 2, "pid": 0 },
        { "id": 8, "name": "医学12333", "code": "bookType", "sort": 2, "pid": 5 },
        { "id": 25, "name": "小说", "code": "bookType", "sort": 1, "pid": 7 },
        { "id": 26, "name": "历史", "code": "bookType", "sort": 2, "pid": 7 },
        { "id": 27, "name": "宗教1", "code": "bookType", "sort": 3.1, "pid": 0 },
        { "id": 29, "name": "佛教", "code": "bookType", "sort": 3, "pid": 27 },
        { "id": 30, "name": "基督教", "code": "bookType", "sort": 2, "pid": 27 }
      ];
      break;
    case 'bookTag':
      data = [
        { "id": 1, "name": "促销", "code": "bookTag", "sort": 1, "pid": 0 }, { "id": 2, "name": "热卖", "code": "bookTag", "sort": 2, "pid": 0 },
        { "id": 3, "name": "新上市", "code": "bookTag", "sort": 3, "pid": 0 }, { "id": 4, "name": "买它！", "code": "bookTag", "sort": 4, "pid": 0 },
        { "id": 31, "name": "售罄", "code": "bookTag", "sort": 5, "pid": 0 }
      ];
      break
  }

  return Promise.resolve({
    status: 'OK', message: 'mock接口！!', data
  });
}
api.dicdata_save = function (param) {
  return Promise.resolve({ status: 'OK', message: 'mock接口！!', data: [] });
}
api.dicdata_delete = function (param) {
  return Promise.resolve({ status: 'OK', message: 'mock接口！', data: [] });
}

//订单
api.order_list = function (param) {
  return Promise.resolve({
    status: 'OK', message: 'mock接口！', "data": [
      { "id": 1, "uid": 1, "name": "admin", "money": 113, "products": "[{\"name\":\"论语\",\"price\":155,\"total\":1},{\"name\":\"论语2\",\"price\":15,\"total\":2}]", "status": "unpay", "createtime": 1675319639624 },
      { "id": 2, "uid": 1, "name": "admin", "money": 1334, "products": "[{\"name\":\"论语\",\"price\":155,\"total\":1},{\"name\":\"论语2\",\"price\":15,\"total\":2}]", "status": "canceled", "createtime": 1675319639624 },
      { "id": 3, "uid": 2, "name": "ading", "money": 333, "products": "[{\"name\":\"论语\",\"price\":155,\"total\":1},{\"name\":\"论语2\",\"price\":15,\"total\":2}]", "status": "done", "createtime": 1675319639624 }
    ],
    "total": 3
  });
}
export default api;