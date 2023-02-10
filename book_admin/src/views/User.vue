<template>
  <div class="page">
    <p class="h">个人信息</p>
    <el-form :model="user" label-width="100px">
      <el-form-item label="头像">
        <ImgUpload v-model="user.img" :limit="1"></ImgUpload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.name" placeholder></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.pwd" type="password" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="save">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload.vue'

export default {
  name: 'User',
  components: { ImgUpload },
  data() {
    return {
      user: { img: '/file/f1.jpg', name: '小卤蛋' }
    }
  },
  methods: {
    save() {
      this.$message.warning('别点了，这个没实现！')
    }
  }
}
</script>

<style lang='less' scoped>
.page {
  margin: 10px;
  .h {
    line-height: 40px;
  }
  form {
    width: 600px;
  }
}
</style>