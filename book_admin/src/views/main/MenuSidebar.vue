<template>
  <div>
    <div class="logo">
      <span>📖</span>
      <h1 v-show="!config.menuCollapse">{{$consts.sysName}}</h1>
    </div>
    <!-- 菜单 -->
    <el-menu router :collapse="config.menuCollapse" :default-active="$router.currentRoute.path">
      <el-menu-item v-for="item in menuItems" :index="item.path" :key="item.path">
        <i :class="item.meta.icon"></i>
        <!-- 名称用title插槽，折叠时才有效 -->
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { userConfig as config } from "@/model/model.js"

export default {
  data() {
    return {
      menuItems: [],
      config,
    }
  },
  created: function () {
    this.menuItems = this.$router.options.routes.find((v) => v.path == '/').children.filter(v => !v.meta.notshow);
  },
}
</script>

<style lang='less' scoped>
.logo {
  text-align: center;
  line-height: 50px;
  padding: 0 10px;
  span {
    font-size: 20px;
  }
  h1 {
    display: inline-block;
    margin: 0px;
    font-size: 18px;
    letter-spacing: 0.1em;
  }
}
</style>