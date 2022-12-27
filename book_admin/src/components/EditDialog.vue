<template>
  <el-dialog :visible="visible" :show-close="false" :fullscreen="fullscreen" width="300px">
    <template #title>
      <span>
        <i :class="icon"></i>
        {{title}}
      </span>
      <span style="float:right;margin-top:-5px">
        <el-button icon="el-icon-full-screen" type="text" @click="fullscreen=!fullscreen" title="全屏"></el-button>
        <el-button icon="el-icon-close" type="text" @click="visible=false" title="关闭"></el-button>
      </span>
    </template>

    <slot></slot>

    <div slot="footer">
      <el-button @click="visible=false" icon="el-icon-circle-close">取消</el-button>
      <el-button @click="$emit('doSave')" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      visible: false,
      fullscreen: false,
      saveLoading: false,
    }
  },
  props: {
    icon: { default: 'el-icon-edit' },
    title:[String]
  }
}
</script>