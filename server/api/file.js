// 文件上传
let express = require('express');
let router = express.Router();
let multer = require('multer');

// 申明multer实例，并配置文件保存路径、文件名
let upload = multer({
  storage: multer.diskStorage({
    //文件存储位置
    destination: function (req, file, callback) {
      callback(null, './file/')
    },
    //文件命名
    filename: function (req, file, callback) {
      callback(null, Date.now() + '-' + file.originalname);
    }
  })
});
// 配置文件上传接口
router.post('/upload', upload.single('file'), function (req, res, next) {
  if (!req.file) {
    res.json({ status: 'Error', message: '文件上传错误：文件不存在' });
    return;
  }
  let file = req.file;
  //返回响应消息：文件的相对URL地址
  res.json({
    status: 'OK',
    name: file.filename,
    url: '/file/' + file.filename,
  });
});

//注意这里的 upload.single('file'),"file"应该和表单提交字段名保持一致，否则可能报错“MulterError: Unexpected field”

module.exports = router;