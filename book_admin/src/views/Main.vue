// 主框架页面：头部、导航，及内容页面的容器
<template>
  <el-container style="height:100%">
    <el-container class="main-aside">
      <!-- 左侧 ：logo+导航菜单 -->
      <el-aside :width="config.menuCollapse?'auto':'200px'">
        <MenuSidebar />
      </el-aside>

      <!-- 右侧 ：头部+主内容-->
      <el-container>
        <!-- 头部 -->
        <el-header :style="config.thema" class="header">
          <!-- 标签工具栏 -->
          <div style="flex:1;overflow:hidden">
            <TabsBar ref="tabsBar"></TabsBar>
          </div>

          <el-button type="text" icon="el-icon-setting" v-on:click="$refs.userConfig.show()" title="系统设置"></el-button>

          <el-dropdown class="header-userbox" @command="handleCommand">
            <span>
              <img src="https://pic1.zhimg.com/80/v2-5a36e8dbd1ec84d633fdd9789a0b1470_720w.webp" alt="头像" />
              [ {{$store.state.user.name}} ]
              <i class="el-icon-arrow-down el-icon--right" style="font-size:12px"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="about">关于</el-dropdown-item>
              <el-divider></el-divider>
              <el-dropdown-item command="logout" icon="el-icon-circle-close">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <!-- 主内容区域 -->
        <el-main class="main-wrapper">
          <!-- 面包屑 -->
          <div class="breadcrumb-bar">
            <el-button
              type="text"
              :icon="config.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
              v-on:click="config.menuCollapse=!config.menuCollapse"
            ></el-button>
            <el-breadcrumb separator="/" style="display:inlne-block">
              <el-breadcrumb-item v-for="r in $route.matched" :key="r.name">{{r.meta?.lang ? $t('menu.' + r.meta.lang) : r.meta?.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 页面内容的容器 -->
          <div class="main view-scroll">
            <!-- 加了切换动画、保存页面状态 -->
            <transition :name="config.routerAnimation?'fade-transform':''" mode="out-in">
              <keep-alive :include="cacheNames">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- footer -->
    <el-footer height="30px">{{$consts.footer}}</el-footer>

    <UserConfig ref="userConfig"></UserConfig>
  </el-container>
</template>

<script>
import UserConfig from "./main/UserConfig.vue"
import MenuSidebar from "./main/MenuSidebar.vue"
import TabsBar from "./main/TabsBar"
import { userConfig as config } from "@/model/model.js"

export default {
  data: function () {
    return {
      menuItems: [],
      config,
    }
  },
  computed: {
    cacheNames() {
      return this.$store.state.tabBars.cacheNames;
    }
  },
  components: {
    UserConfig, TabsBar, MenuSidebar
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$confirm.warning("确定要退出登录吗？").then(() => {
            sessionStorage.removeItem('token');
            this.$router.push('/login');
          }).catch(() => { });
          break;
        case 'pwd':
          this.$alert.warning('还未实现pwd！');
          break
        case 'about':
          this.$alert.warning('还未实现about！');
          break
      }
    },
  },
  created: function () {
    this.menuItems = this.$router.options.routes.filter(v => !v.hidden);
  },
}
</script>

<style scoped lang="less">
@import "@/assets/var.less";

.main-aside {
  height: calc(100% - @footer-height);
}

.header {
  line-height: @header-height;
  height: @header-height !important;
  padding: 0px;
  display: flex;

  h2 {
    display: inline-block;
    margin: 0px;
    font-size: 18px;
    letter-spacing: 0.1em;
  }
  .header-userbox {
    color: inherit;
    margin: 0 10px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}

.el-button {
  font-size: 18px;
  color: inherit;
  opacity: 0.8;
  padding: 0 8px;
  &:focus {
    color: inherit;
  }
  &:hover {
    background-color: #fff3;
    color: #0003;
  }
}
.el-divider {
  margin: 5px;
  width: auto;
}

.breadcrumb-bar {
  display: flex;
  height: 30px;
  line-height: 30px;
  .el-breadcrumb {
    line-height: inherit;
  }
}

.main-wrapper {
  padding: 10px;
  display: flex;
  flex-flow: column;
  .main {
    margin: 5px 0 0 0;
    border: 1px solid #ebeef5;
    padding: 5px;
    height: 100%;
    position: relative;
    overflow: hidden auto;
  }
}

.el-footer {
  line-height: @footer-height;
  background-color: #e9eef3;
  text-align: center;
  font-size: 14px;
}

// 路由切换动画
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>



