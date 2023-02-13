<template>
  <div class="doc">
    <h1>关于作者：</h1>
    <span style="display: flex;align-items: center;">
      <img src="@/../public/img/am.png" alt height="60px" />
      <el-link href="https://www.yuque.com/kanding" target="_blank" type="primary">&nbsp;语雀「 安木夕」</el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <el-link href="https://github.com/kwonganding" target="_blank" type="success">&nbsp;Github「 Kanding」</el-link>
      <el-link href="https://juejin.cn/user/2120322602780935" target="_blank" type="warning">&nbsp;掘金「 安木夕」</el-link>
    </span>

    <h1>项目说明：</h1>

    <p>图书后台管理系统，`Vue2`+`ElementUI`+`Express`+`Sqlite3`搭建的前端（后）练习Demo</p>

    <p>
      项目开源地址：
      <a href="https://github.com/kwonganding/KWebNote" target="_blank">KWebNote(github)</a>
    </p>
    <p>相关文档：还没写...🤣🤣🤣</p>
  </div>
</template>

<script>
export default {
  name: 'Doc'
}
</script>

<style lang="less" scoped>
.doc {
  margin: 10px;
  line-height: 36px;
  h1 {
    font-size: 1.5em;
    margin: 1.5em 0 0.5em;
  }
}
</style>