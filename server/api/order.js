// 订单

let express = require('express');
let router = express.Router();
const db = require('../db/db.js');


//获取order列表，带分页、查询条件
router.post('/order/list', (req, res) => {
  //构造sql，查询总数量的“sqlTotal”，以及查询列表的“sql”
  //共用where
  let sqlTotal = 'select count(id) as total from [order]';
  let sql = 'select o.id,o.uid,u.name,o.money,o.products,o.status,o.createtime from [order] o join user_info u on u.id =o.uid';
  let wheresql = ' where 1=1';
  let params = [];
  if (req.body.status) {
    wheresql += " and status=?";
    params.push(req.body.status);
  }
  if (req.body.uid) {
    wheresql += " and uid=?";
    params.push(req.body.uid);
  }
  if (req.body.products) {
    wheresql += " and products like ?";
    params.push("%" + req.body.products + "%");
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

//新增、修改
router.post('/order/save', (req, res) => {
  let sql = '';
  let params = [req.body.uid, req.body.money, JSON.stringify(req.body.products), req.body.status, req.body.createtime ?? Date.now()];
  if (req.body.id) {//update
    sql = "update [order] set uid=?,money=?,products=?,status=?,createtime=? where id=?";
    params.push(req.body.id);
  }
  else //(name,author,introduction,img,status) 
    sql = "insert into [order] values(NULL,?,?,?,?,?)";
  db.executeSql(sql, params, resData => {
    if (resData.status == 'OK')
      resData.message = '保存成功';
    res.send(resData);
  });
})



module.exports = router;