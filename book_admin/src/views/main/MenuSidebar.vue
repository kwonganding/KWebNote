<template>
  <div class="sidebar">
    <div class="logo" :style="config.thema">
      <span>📖</span>
      <h1 :class="config.menuCollapse?'collapse':''">{{$t('sysName')}}</h1>
    </div>
    <!-- 菜单 -->
    <el-menu router class="view-scroll" :collapse="config.menuCollapse" :default-active="$route.path">
      <MenuItem v-for="item in menuItems" :item="item" :key="item.path" />
    </el-menu>
  </div>
</template>

<script>
import { userConfig as config } from "@/model/model.js"
import MenuItem from './MenuItem.vue'

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menuItems: [],
      config,
    }
  },
  computed: {
    // activeMenu() {

    // }
  },
  created: function () {
    this.menuItems = this.$router.options.routes.filter((v) => !v.hidden);
  },
}
</script>

<style lang='less' scoped>
@import "@/assets/var.less";
.sidebar {
  height: calc(100% - @header-height);
}

.logo {
  line-height: 50px;
  height: 50px;
  padding: 0 10px 0 12px;
  span {
    font-size: 28px;
  }
  h1 {
    display: inline-block;
    margin: 0px;
    font-size: 18px;
    letter-spacing: 0.1em;
    transition: all 0.5s ease-out;
    &.collapse {
      opacity: 0;
      width: 0px;
      height: 0px;
      overflow: hidden;
    }
  }
}
.el-menu {
  text-align: left;
  height: 100%;
  overflow-x: hidden;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>

<style>
.sidebar .el-menu-item.is-active {
  font-weight: bold;
  background-color: #409eff12;
}
/* .el-menu--vertical:not(.el-menu--collapse) {
  width: 200px;
} */
</style>
