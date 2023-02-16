<template>
  <div class="doc">
    <h1>关于作者：</h1>
    <span style="display: flex;align-items: center;">
      <img src="@/../public/img/am.png" alt height="60px" />
      <el-link href="https://www.yuque.com/kanding" target="_blank" type="primary">&nbsp;语雀「 安木夕」</el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
      <el-link href="https://github.com/kwonganding" target="_blank" type="success">&nbsp;Github「 Kanding」</el-link>
      <el-link href="https://juejin.cn/user/2120322602780935" target="_blank" type="warning">&nbsp;掘金「 安木夕」</el-link>
    </span>

    <el-divider></el-divider>
    <h1>项目说明：</h1>

    <p>这是一个比较典型的管理后台练习项目，包含登录、框架页、导航路由、标签、数据管理、字典管理等基础功能。管理后台的业务大多是数据管理CRUD功能，就只是是简单实现了几个模块，针对CRUD，整理了一个模板页。</p>
    <b>🔸技术路线：</b>
    <ul>
      <li>Vue v2.*</li>
      <li>ElementUI v2.*</li>
    </ul>
    <b>🔸相关组件：</b>
    <ul>
      <li>vuex：状态管理</li>
      <li>vue-router：前端路由</li>
      <li>axios：api调用</li>
      <li>echarts：图标组件</li>
      <li>i18n：多语言国际化vue-i18nv8.*版本</li>
      <li>@wangeditor：富文本编辑器</li>
      <li>Less：CSS预处理器/语言</li>
    </ul>
    <b>🔸源代码地址：</b>
    <span>
      <a href="https://github.com/kwonganding/KWebNote" target="_blank">Github / KWebNote</a>，管理后台代码在目录📁
      <a href="https://github.com/kwonganding/KWebNote/tree/main/book_admin" target="_blank">book_admin</a>下。
    </span>

    <el-divider></el-divider>
    <h1>相关文档：</h1>
    <ul>
      <li>
        <el-link href="https://www.yuque.com/kanding" target="_blank" type="primary">图书商城全栈Vue+Element+Node项目练习</el-link>
      </li>
      <li>
        <el-link href="https://www.yuque.com/kanding" target="_blank" type="primary">图书商城全栈①管理后台Vue2/ElementUI</el-link>
      </li>
    </ul>
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
  line-height: 2em;
  h1 {
    font-size: 1.5em;
    margin: 1.5em 0 0.5em;
  }
  p {
    text-indent: 2em;
  }
  ul {
    margin-left: 2.5em;
    margin-bottom: 1em;
  }
}
</style>