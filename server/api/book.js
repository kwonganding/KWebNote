// 书籍管理
//引入express
let express = require('express');
//获取Express的路由
let router = express.Router();
//引入db库
const db = require('../db/db.js');

//获取book列表，带分页、查询条件
router.post('/book/list', (req, res) => {
  //构造sql，查询总数量的“sqlTotal”，以及查询列表的“sql”
  //共用where
  let sqlTotal = 'select count(id) as total from books';
  let sql = 'select id,name,author,tag,price,comments,imgs,status,lasttime from books';
  let wheresql = ' where 1=1';
  let params = [];
  if (req.body.status) {
    wheresql += " and status=?";
    params.push(req.body.status);
  }
  if (req.body.name) {
    wheresql += " and name like ?";
    params.push("%" + req.body.name + "%");
  }
  if (req.body.author) {
    wheresql += " and author like ?";
    params.push("%" + req.body.author + "%");
  }
  if (req.body.catgroy) {
    wheresql += " and catgroy = ?";
    params.push(req.body.catgroy);
  }
  sql += wheresql;
  sqlTotal += wheresql;
  let total = 0;
  try {
    //查询总数
    db.all(sqlTotal, params, (err, rows) => {
      total = rows[0]?.total;
    });
    //查询数据，分页
    sql += " limit ?,?";
    params.push((req.body.index - 1) * req.body.size, req.body.size)
    db.all(sql, params, function (err, rows) {
      res.send({ status: 'OK', data: rows, total });
    })
  }
  catch (err) {
    console.log(err);
    res.send({ status: 'Error', message: 'err' });
  }
})

//设置路由：获取单个book数据，get方式
router.get('/book/id', (req, res) => {
  //sql语句
  let sql = "select id,name,author,introduction,imgs,status,catgory,price,tag,comments,createtime,lasttime from books where id =?";
  //调用db封装的查询api，返回数据
  db.queryData(sql, [req.query.id], (resData, rows) => {
    resData.data = rows[0];
    res.send(resData);
  });
})

//设置路由：新增、修改，post方式
router.post('/book/save', (req, res) => {
  let sql = '';
  // 参数，在sql中用？占位（按照顺序）
  let params = [req.body.name, req.body.author, req.body.introduction, req.body.imgs, req.body.status, req.body.catgory, req.body.price, req.body.tag, req.body.comments, req.body.createtime ?? Date.now(), Date.now()];
  //update 修改数据
  if (req.body.id) {
    sql = "update books set name=?,author=?,introduction=?,imgs=?,status=?,catgory=?,price=?,tag=?,comments=?,createtime=?,lasttime=? where id=?";
    params.push(req.body.id);
  }
  else //insert 新增数据 (name,author,introduction,img,status) 
    sql = "insert into books values(NULL,?,?,?,?,?,?,?,?,?,?,?)";
  db.executeSql(sql, params, resData => {
    if (resData.status == 'OK')
      resData.message = '保存成功';
    res.send(resData);
  });
})

module.exports = router;