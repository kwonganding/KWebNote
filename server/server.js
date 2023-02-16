//加载组件
let express = require('express');
//创建一个服务端服务实例server
let server = new express();

//定义一个get接口
server.get('/hello', (req, res) => {
  res.send('Hello World!')
})
//定义一个post接口
server.get('/send', (req, res) => {
  console.log(req.body); //post发送的数据
})
//*****  配置监听端口 *****/
server.listen(801, err => {
  if (!err)
    console.log('服务器启动成功，地址：http://localhost:801')
})



//引入express
let express = require('express');
//获取Express的路由
let router = express.Router();
//设置路由：获取单个book数据，get方式
router.get('/book/id', (req, res) => { })
// 导出路由router
module.exports = router;