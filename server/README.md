# 后端服务Node/Express/Sqlite

后端服务实现的比较简单，仅仅只是为了满足前端的最小需要。实现了登录、文件上传下载、一些数据的增删改查等基础功能，正式后端服务中的权限、安全、性能并没有考虑，主要是也不太熟悉。用Node做一个简单的后端服务还是比较容易的，前端开发还是有必要了解一下，不仅要和前端同行卷，更要往外卷，卷起来！—— 跟自己卷就行了！（不得不）持续学习，（被迫）不断进步！

![image.png](https://cdn.nlark.com/yuque/0/2023/png/393451/1676521706343-e14f9434-64dc-4479-a8d9-a4a7d01258f1.png#averageHue=%23f0f0f0&clientId=ued2b8607-ce94-4&from=paste&height=273&id=u16ec40b7&name=image.png&originHeight=273&originWidth=273&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35347&status=done&style=none&taskId=ucd3d75ee-90eb-4c12-b286-d14c2498db5&title=&width=273)

🔸**技术路线**：

- Node.js，开发运行环境`v16.17.1`
- express，Web组件`v4.18`
- sqlite3，数据库

🔸**相关组件**：

- `express.static`：静态资源托管，express提供的，无需额外安装。
- `multer`：文件上传

🔸**源代码地址**：[Github / KWebNote](https://github.com/kwonganding/KWebNote)，[Gitee / KWebNote](https://gitee.com/kanding/KWebNote)，后台服务端代码在目录📁[server]下。

---

