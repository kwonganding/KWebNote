# bookadmin 图书后台管理系统
图书后台管理系统，Vue+ElementUI为主的小型前后台一体Demo。
## 🌐前端：Vue+ElementUI
* 框架为Vue2，采用Vue-cli搭建，一步到位的Vue家族，还包括Vue-Router，VueX
* API调用Axios组件
* 图表用的Echart
```git
$ cnpm install axios  -S
$ cnpm install echarts -S
```
## 🟡后端：Express+Sqlite3

后台用Express+Sqlite3简单弄了一个，主要为配合前端提供一些简单的接口，实现的比较粗糙。
* 后端框架用Express搭建的，在Node环境下运行
```
```
* 数据库用的Sqlite3，不用安装数据库，npm安装JS插件就能跑，数据库文件也就是一个db文件。数据库管理工具用的是“”，手动创建表和一些示例数据。
```
$ cnpm install sqlite3 -S
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
