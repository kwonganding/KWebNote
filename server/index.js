//*****  初始化组件 *****/

//加载组件
let express = require('express');
//创建一个服务端服务实例server
let server = new express();
//启用json解析支持，解析body数据
server.use(express.json());

//***** 静态资源  *****/
// 使用内置的“express.static”实现静态文件代理，参数为资源地址。
// 第一个参数为url路由，

//图片静态资源
server.use('/file', express.static('./file'));

//管理后台"book_admin"的部署
server.use('/bookadmin', express.static('./book_admin'))


//*****  加载api路由 *****/

const path='/api';
// 基础api
const base = require('./api/base.js');
// 书籍模块api
const book = require('./api/book.js');
// 文件上传api
const file = require('./api/file.js');
// 订单管理api
const order = require('./api/order.js');

server.use(path, base);
server.use(path, book);
server.use(path, order);
server.use(file);

//*****  配置端口，启用监听端口 *****/
server.listen(3000, err => {
  if (!err)
    console.log('服务器启动成功，地址：http://localhost:3000')
})