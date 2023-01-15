<template>
  <el-drawer title="系统设置" :visible.sync="visible" size="300px" :modal="false">
    <b>主题（Header）：</b>
    <ul class="teama-box" @click="handleThemaClick($event)">
      <li v-for="t in themas" :style="t" :key="t.name" :class="t.name==config.thema.name?'active':''">{{t.name}}</li>
    </ul>

    <b>是否启用路由动画：</b>
    <el-switch v-model="config.routerAnimation" class="config-box" active-text="启用"></el-switch>
    <b>语言（Language）：</b>
    <el-radio-group v-model="config.language" class="config-box">
      <el-radio label="cn">中文</el-radio>
      <el-radio label="zh">English</el-radio>
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
      localStorage.setItem('admin-userconfig', JSON.stringify(this.config));
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