let express = require('express');
let path = require('path');

let server = new express();
server.use(express.json()); //启用json解析支持，解析body数据

//添加监控
server.listen(8081, err => {
    if (!err)
        console.log('服务器启动成功，地址：http://localhost:8081')
})

//sqlite
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('book_db.db');

//**********  配置api ********** */

//登录：/login
server.post('/login', (req, res) => {
    console.log(req.body);
    //构造sql
    let sql = `select id,name from user_info where name='${req.body.uname}' and pwd='${req.body.upwd}'`
    db.all(sql, function (err, row) {
        if (row && row.length > 0)
            res.send({ status: 'OK', token: row[0].id, message: '登录成功' });
        else
            res.send({ status: 'Error', message: '用户名或密码错误' });
        if (err) console.log(err);
    })
})

//首页统计信息，基础信息：/stats_base
server.get('/stats_base', (req, res) => {
    res.json({
        status: 'OK', message: '', data: {
            user: 33224,
            book: 1334,
            order: 213,
            money: 1552.24,
        }
    })
})
//首页统计信息，订单信息：/chart_order
server.get('/chart_order', (req, res) => {
    res.json({
        status: 'OK', message: '', data: [
            { name: '1月', value: 33 },
            { name: '2月', value: 46 },
            { name: '3月', value: 245 },
            { name: '4月', value: 322 },
            { name: '5月', value: 78 },
            { name: '6月', value: 178 },
            { name: '7月', value: 278 },
        ]
    })
})
//首页统计信息，用户信息：/chart_user
server.get('/chart_user', (req, res) => {
    res.json({
        status: 'OK', message: '', data: [
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
    })
})
//商品列表：/books
server.get('/books', (req, res) => {
    console.log(req.query);
    //sql: select id,name,author,introduction,img from books
    let where='';
    let sql = `select id,name,author,introduction,img from books limit (${req.query.index - 1}*${req.query.size}),${req.query.size}`;
    let sqltotal = 'select count(id) as total from books';
    let total = 0;
    try {
        db.all(sqltotal, (err, rows) => {
            total = rows[0]?.total;
        });
        db.all(sql, function (err, rows) {
            res.send({ status: 'OK', data: rows, total });
        })
    }
    catch (err) {
        res.send({ status: 'Error', message: 'err' });
    }
})

//新增、修改
server.post('/books/save', (req, res) => {
    let info = req.body;
    let sql = '';
    if (info.id) //update
        sql = `update books set name="${info.name}",author="${info.author}",introduction="${info.introduction}",img="${info.img}" where id="${info.id}"`;
    else
        sql = `insert into books(name,author,introduction,img) values("${info.name}","${info.author}","${info.introduction}","${info.img}")`;
    db.run(sql, (result, err) => {
        console.log(result, err);
        if (err) {
            res.send({ status: 'Error', message: 'err' });
        }
        else
            res.send({ status: 'OK', data: result, message: '保存成功' });
    });

})