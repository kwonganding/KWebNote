<template>
  <el-drawer :title="$t('userConfig.title')" :visible.sync="visible" size="300px" :modal="false">
    <!-- 主题 -->
    <b>{{$t('userConfig.thema')}}</b>
    <ul class="teama-box" @click="handleThemaClick($event)">
      <li v-for="t in themas" :style="t" :key="t.name" :class="t.name==config.thema.name?'active':''">{{t.name}}</li>
    </ul>
    <!-- 路由切换动画 -->
    <b>{{$t('userConfig.routeAnimation')}}</b>
    <el-switch v-model="config.routerAnimation" class="config-box" :active-text="$t('userConfig.enable')"></el-switch>
    
    <!-- 多语言 -->
    <b>{{$t('userConfig.language')}}</b>
    <el-radio-group v-model="config.language" class="config-box">
      <el-radio label="zh">中文</el-radio>
      <el-radio label="en">English</el-radio>
    </el-radio-group>
  </el-drawer>
</template>

<script>
import { userConfig as config, themas } from "@/model/model.js"

export default {
  data() {
    return {
      visible: false,
      config,
      themas,
    }
  },
  created() {
    //监听配置变更，持久化存储到本地
    this.$watch('config', () => {
      localStorage.setItem('admin_userconfig', JSON.stringify(this.config));
      //手动更新语言
      this.$i18n.locale = this.config.language;
    }, { deep: true })
  },
  methods: {
    show() {
      this.visible = true;
    },
    //点击选中
    handleThemaClick(event) {
      if (event.target.tagName !== 'LI')
        return;
      const name = event.target.innerText;
      config.thema = themas.filter(s => s.name == name)[0];
    }
  }
}
</script>

<style lang='less' scoped>
.drawer-box {
  padding: 10px;
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
}

b {
  margin-bottom: 15px;
  display: block;
  &:nth-of-type(n + 2) {
    margin-top: 30px;
  }
}

.teama-box {
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  list-style-type: none;
  li {
    display: inline-block;
    margin: 5px;
    padding: 4px 10px;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &::before {
      content: "☐";
      font-size: 1.1em;
      margin-right: 3px;
    }
    &.active::before {
      content: "☑";
    }
  }
}
</style>