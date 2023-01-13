// 主框架页面：头部、导航，及内容页面的容器
<template>
  <el-container style="height:100%">
    <!-- 头部 -->
    <el-header height="50px" :style="config.thema" class="header">
      <el-button type="text" :icon="config.menuCollapse?'el-icon-s-unfold':'el-icon-s-fold'" v-on:click="config.menuCollapse=!config.menuCollapse"></el-button>

      <h2>📖{{$consts.sysName}}</h2>

      <!-- 先空着 -->
      <div style="flex:1"></div>

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

    <!-- 中间区域：导航栏+主内容区域 -->
    <el-container style="height: calc(100% - 80px);">
      <!-- 左侧 -->
      <el-aside width="auto">
        <!-- 菜单 -->
        <el-menu router :collapse="config.menuCollapse" :default-active="$router.currentRoute.path">
          <el-menu-item v-for="item in menuItems" :index="item.path" :key="item.path">
            <i :class="item.meta.icon"></i>
            <!-- 名称用title插槽，折叠时才有效 -->
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-wrapper">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="r in $route.matched" :key="r.name">{{r.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 页面内容的容器 -->
        <div shadow="never" class="main view-scroll">
          <!-- 加了切换动画、保存页面状态 -->
          <transition :name="config.routerAnimation?'fade-transform':''" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>

    <!-- footer -->
    <el-footer height="30px">{{$consts.footer}}</el-footer>

    <UserConfig ref="userConfig"></UserConfig>
  </el-container>
</template>

<script>
import UserConfig from "./mainview/UserConfig.vue"
import { userConfig as config } from "@/model/model.js"

export default {
  data: function () {
    return {
      menuItems: [],
      config,
    }
  },
  components: {
    UserConfig,
  },
  methods: {
    handleCommand(command) {
      console.dir(this);
      switch (command) {
        case 'logout':
          this.$confirm.warning("确定要退出登录吗？").then(() => {
            sessionStorage.removeItem('token');
            this.$router.push('/login');
          });
          break;
        case 'pwd':
          this.$alert.warning('还未实现pwd！');
          break
        case 'about':
          this.$alert.warning('还未实现about！');
          break
      }
    }
  },
  created: function () {
    this.menuItems = this.$router.options.routes.find((v) => v.path == '/').children.filter(v => !v.meta.notshow);
  },
}
</script>


<style scoped lang="less">
.header {
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  .el-button {
    font-size: 16px;
    color: inherit;
    opacity: 0.8;
    padding: 0 8px;
    &:hover,
    &:active {
      background-color: #fff4;
    }
  }
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
.el-divider {
  margin: 5px;
  width: auto;
}

.el-menu {
  text-align: left;
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
.el-menu-item.is-active {
  font-weight: bold;
}

.main-wrapper {
  padding: 10px;
  display: flex;
  flex-flow: column;
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
  }
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
  line-height: 30px;
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

