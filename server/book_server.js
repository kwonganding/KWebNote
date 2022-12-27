///////////////////// 准备 ////////////////////////////
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
//加载sqlite并创建数据库实例
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('book_db.db');
//?sqlite参数化，用问号"?"占位，参数值用数组组装。


///////////////////// 配置api ////////////////////////////

//登录：/login
server.post('/login', (req, res) => {
    console.log(req.body);
    //构造sql查询
    let sql = 'select id,name from user_info where name=? and pwd=?';
    let params = [req.body.uname, req.body.upwd];
    db.all(sql, params, function (err, row) {
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
server.get('/stats_order', (req, res) => {
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
server.get('/stats_user', (req, res) => {
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

//获取book列表，带分页、查询条件
server.post('/book/list', (req, res) => {
    //构造sql，查询总数量的“sqlTotal”，以及查询列表的“sql”
    //共用where
    let sqlTotal = 'select count(id) as total from books';
    let sql = 'select id,name,author,introduction,img,status from books';
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
    sql += wheresql;
    sqlTotal += wheresql;
    let total = 0;
    try {
        //查询总数
        db.all(sqlTotal, params, (err, rows) => {
            total = rows[0]?.total;
            console.log(err);
        });
        //查询数据，分页
        sql += " limit ?,?";
        params.push((req.body.index - 1) * req.body.size, req.body.size)
        db.all(sql, params, function (err, rows) {
            res.send({ status: 'OK', data: rows, total });
            console.log(err);
        })
    }
    catch (err) {
        console.log(err);
        res.send({ status: 'Error', message: 'err' });
    }
})

//获取单个book数据
server.get('/book/id', (req, res) => {
    let sql = "select id,name,author,introduction,img,status from books where id =?";
    db.all(sql, [req.query.id], (err, rows) => {
        res.send({ status: 'OK', data: rows ? rows[0] : null });
    })
})


//新增、修改
server.post('/book/save', (req, res) => {
    let sql = '';
    let params = [req.body.name, req.body.author, req.body.introduction, req.body.img, req.body.status];
    if (req.body.id) {//update
        sql = "update books set name=?,author=?,introduction=?,img=?,status=? where id=?";
        params.push(req.body.id);
    }
    else //(name,author,introduction,img,status) 
        sql = "insert into books values(NULL,?,?,?,?,?)";
    db.run(sql, params, (result, err) => {
        console.log(result, err);
        if (err) {
            res.send({ status: 'Error', message: 'err' });
        }
        else
            res.send({ status: 'OK', data: result, message: '保存成功' });
    });
})