# bookadmin 图书后台管理系统

图书后台管理系统，`Vue2`+`ElementUI`+`Express`+`Sqlite3`搭建的前端（后）练习Demo

## 🌐前端：`Vue2`+`ElementUI`
* 框架为`Vue2`，采用`Vue-cli`搭建，一步到位的Vue家族，还包括`Vue-Router`，`VueX`
* UI组件库为 `ElementUI`
* API调用为`Axios`组件
* 图表用的`Echart`

```bash
$ vue add element
$ cnpm install axios  -S
$ cnpm install echarts -S
```
## 🟡后端：`Express`+`Sqlite3`

后台用`Express`+`Sqlite3`简单弄了一个简单的服务，主要为配合前端提供一些简单的接口，实现的比较粗糙。
* 后端框架用`Express`搭建的，在Node环境下运行

```bash
$ cnpm install express --save

$ node book_server.js
服务器启动成功，地址：http://localhost:8081
```

```JavaScript
//加载组件
let express = require('express');
//创建一个服务端服务实例server
let server = new express();
//启用json解析支持，解析body数据
server.use(express.json());
//配置端口，启用监听端口
server.listen(8081, err => {
    if (!err)
        console.log('服务器启动成功，地址：http://localhost:8081')
})

//登录：/login
server.post('/login', (req, res) => {
    console.log(req.body);
})
```

* 数据库用的`Sqlite3`，不用安装数据库环境，npm安装JS插件就能跑，数据库文件也就是一个db文件。数据库管理工具用的是轻量级的“Sqliteman”，在工具里手动创建表和一些示例数据。

```bash
$ cnpm install sqlite3 -S
```
```JavaScript
//加载sqlite并创建数据库实例
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('book_db.db');
db.run(sql, params, (result, err) => {
        console.log(result, err);
    });
```

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
