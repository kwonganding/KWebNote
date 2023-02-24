//加载组件
let express = require('express');
//创建一个服务端服务实例server
let server = new express();
server.use(express.json());

//定义一个get接口
server.get('/hello', (req, res) => {
  res.send('Hello World!')
})
//定义一个post接口
server.get('/send', (req, res) => {
  console.log(req.body); //post发送的数据
})

//管理后台"book_admin"的部署
//静态资源
server.use('', express.static('../../kwebs/book_admin'));

// const fs = require('fs')
// const rpath = require('path')
//前端路由的重定向
// server.get('/bookadmin/*', function(req, res) {
//   const html = fs.readFileSync(rpath.resolve(__dirname, '../server/book_admin/index.html'), 'utf-8')
//   res.send(html)
// })


//*****  配置监听端口 *****/
server.listen(801, err => {
  if (!err)
    console.log('服务器启动成功，地址：http://localhost:801')
})
