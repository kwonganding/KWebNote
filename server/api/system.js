//系统管理功能API

let express = require('express');
let router = express.Router();
const db = require('../db/db.js');

// 获取所有字典类型列表
router.get('/sys/dictype/list', (req, res) => {
  const sql = 'select id,code,name,tree from dictype';
  db.queryData(sql, null, (resData, rows) => {
    resData.data = rows;
    res.send(resData);
  })
})

// 获取指定类型编码的字典数据
router.get('/sys/dicdata/list', (req, res) => {
  const sql = 'select id,name,code,sort,pid from dicdata where code =?';
  const params = [req.query.code]
  db.queryData(sql, params, (resData, rows) => {
    resData.data = rows;
    res.send(resData);
  })
})

router.post('/sys/dicdata/save', (req, res) => {
  let sql = '';
  const params = [req.body.name, req.body.code, req.body.sort, req.body.pid ?? 0];
  //upate
  if (req.body.id) {
    sql = 'update dicdata set name=?,code=?,sort=?,pid=? where id=?';
    params.push(req.body.id);
  }
  //insert
  else
    sql = 'insert into dicdata values(NULL,?,?,?,?)'
  //do
  db.executeSql(sql, params, resData => {
    if (resData.status == 'OK')
      resData.message = '保存成功';
    res.send(resData);
  })
})

router.post('/sys/dicdata/delete', (req, res) => {
  const sql = "delete from dicdata where id=?";
  const params = [req.body.id];
  db.executeSql(sql, params, resData => {
    if (resData.status == 'OK')
      resData.message = '删除成功';
    res.send(resData);
  })
})

module.exports = router;