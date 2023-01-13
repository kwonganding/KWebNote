<template>
  <el-drawer title="系统设置" :visible.sync="visible" size="300px" :modal="false">
    <b>主题（Header）：</b>
    <el-radio-group v-model="config.thema" class="thema-box config-box">
      <el-radio v-for="t in themas" :label="t" :style="t" :key="t.name" class="item">{{t.name}}</el-radio>
    </el-radio-group>
    <b>是否启用路由动画：</b>
    <el-switch v-model="config.routerAnimation" class="config-box" active-text="启用"></el-switch>
    <b>语言（Language）：</b>
    <el-radio-group v-model="config.language" class="config-box">
      <el-radio label="cn" >中文</el-radio>
      <el-radio label="zh" >English</el-radio>
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
    }
  }
}
</script>

<style lang='less' scoped>
b {
  // margin: 10px;
  display: block;
}
.config-box {
  margin: 10px 0 20px 0;
}
.thema-box {
  .item {
    padding: 6px 12px;
    margin: 5px;
  }
}


.drawer-box {
  padding: 10px;
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
  b {
    margin: 10px 0;
  }
}
</style>