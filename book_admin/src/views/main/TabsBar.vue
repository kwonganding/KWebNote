<template>
  <div class="tabs-bar">
    <router-link
      class="item"
      v-for="r in cachedRoutes"
      :to="r"
      :key="r.path"
      :class="isActive(r)?'active':''"
      @contextmenu.prevent.native="showMenu(r,$event)"
    >
      <i :class="r.meta.icon"></i>
      {{r.meta?.lang ? $t('menu.' + r.meta.lang) : r.meta?.title}}
      <i
        class="el-icon-close close"
        v-if="!isAffix(r)"
        @click.prevent.stop="handleClose(r)"
      ></i>
    </router-link>

    <!-- 页签按钮的右键菜单 -->
    <el-card class="menu" v-show="tagMenu.visible" :style="{left:tagMenu.left+'px',top:tagMenu.top+'px'}">
      <ul>
        <li @click="refresh(selectedTag)" v-show="isActive(selectedTag)">
          <i class="el-icon-refresh"></i> 刷新
        </li>
        <li @click="handleClose()" v-show="!isAffix(selectedTag)">
          <i class="el-icon-close"></i> 关闭
        </li>
        <li @click="handleCloseOther()">
          <i class="el-icon-circle-close"></i> 关闭其他
        </li>
        <li @click="handleCloseAll">
          <i class="el-icon-error"></i> 关闭所有
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagMenu: { visible: false, top: 0, left: 0, },
      selectedTag: {},
    }
  },
  computed: {
    cachedRoutes: function () { return this.$store.state.tabBars.cacheRoutes },
  },
  mounted() {
    //初始化固定标签，固定首页
    this.initialAffix();
    //添加当前标签
    this.addTag();
  },
  watch: {
    //监测路由变化
    $route() {
      this.addTag();
    },
    'tagMenu.visible': function () {
      if (this.tagMenu.visible)
        window.addEventListener('click', this.closeMenu);
      else
        window.removeEventListener('click', this.closeMenu);
    }
  },
  methods: {
    // 是否活动标签
    isActive(route) {
      return route.path === this.$route.path;
    },
    // 是否固定标签
    isAffix(route) {
      return route.meta && route.meta.affix;
    },
    initialAffix() {
      //初始化固定的标签页
      const affixs = this.$router.options.routes.filter((v) => v.meta?.affix);
      affixs.forEach(v => {
        this.$store.commit('tabBars/add', v);
      });
    },
    // 显示标签的右键菜单
    showMenu(tag, event) {
      this.selectedTag = tag;
      this.tagMenu.visible = true;
      this.tagMenu.top = event.clientY;
      this.tagMenu.left = event.clientX;
    },
    // 刷新，重新加载？
    // 缓存排除；不显示到标签链
    refresh(tag) {
      //移除去掉缓存，再重定向跳转到当前页面
      this.$store.commit('tabBars/removeName', this.$route);
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + tag.path
        })
      })
    },
    closeMenu() {
      this.tagMenu.visible = false;
    },
    addTag() {
      //添加到缓存路由中，排除跳转页面，
      if (this.$route.name === 'Redirect')
        return;
      this.$store.commit('tabBars/add', this.$route);
    },
    handleClose(tag) {
      tag ??= this.selectedTag;
      const index = this.cachedRoutes.indexOf(tag);
      this.$store.commit('tabBars/remove', tag);
      if (this.isActive(tag)) {
        if (this.cachedRoutes[index])
          this.$router.push(this.cachedRoutes[index]);
        else
          this.$router.push(this.cachedRoutes[index - 1].path);
      }
      // 如果关闭的是当前：则显示下一个，否则前一个。
      // 如果关闭的不是当前激活项，则不管
      // 前面始终会有一个固定的首页
    },
    handleCloseOther() {
      this.$store.commit('tabBars/removeOther', this.selectedTag);
      // 如果选中的是激活，则不跳转；否则跳转到选中项
      if (!this.isActive(this.selectedTag)) {
        this.$router.push(this.selectedTag);
      }
    },
    handleCloseAll() {
      this.$store.commit('tabBars/removeAll');
      //路由到剩下的
      if (!this.isActive(this.cachedRoutes[0])) {
        this.$router.push(this.cachedRoutes[0] ?? '/');
      }
    },
  }
}

</script>

<style lang='less' scoped>
.tabs-bar {
  list-style-type: none;
  display: flex;
  margin: 20px 20px 0 0px;
  line-height: 30px;
  font-size: 14px;
  .item {
    padding: 0 10px;
    margin: 0 1px;
    cursor: pointer;
    min-width: 80px;
    text-align: center;
    text-decoration: none;
    color: inherit;
    position: relative;
    border-radius: 2px 2px 0 0;
    &:nth-of-type(n + 2):not(.active):before {
      content: "⋮";
      position: absolute;
      left: -3px;
      color: #fff5;
    }
    .close {
      display: none;
    }
    &:hover {
      background-color: #0001;
    }
    &:hover .close:hover {
      background: #4443;
      color: red;
    }
  }
  .item.active {
    background-color: #fff;
    color: #0c43f7;
    font-weight: bold;
    margin-right: -1px; //遮住分隔符“⋮”
    position: relative;
    & .close {
      display: initial;
      position: relative;
      left: 3px;
    }
    // 加一点连接凹槽弧度效果
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      position: absolute;
      left: -5px;
      bottom: 0;
      background: radial-gradient(circle at 0 0, transparent 5px, #fff 6px);
    }
    &::after {
      content: "";
      width: 5px;
      height: 5px;
      position: absolute;
      right: -5px;
      bottom: 0;
      background: radial-gradient(circle at 100% 0, transparent 5px, #fff 6px);
    }
  }
}

.menu {
  list-style-type: none;
  position: absolute;
  color: #000;
  font-size: 14px;
  padding: 0px;
  z-index: 2004;
  li {
    padding: 0 8px;
    line-height: 32px;
    min-width: 140px;
    cursor: pointer;
    &:hover {
      background-color: #0001;
    }
  }
}
</style>