//图书的编辑页面，通过路由打开，动态路由参数传值，弃用
<template>
  <div style="margin-top:15px">
    <el-form :model="book" ref="bookForm" :rules="bookRules" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="book.name" placeholder="输入书籍名称" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者：" prop="author">
            <el-input v-model="book.author" placeholder="输入书籍作者" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="上架状态：" prop="status">
        <el-radio-group v-model="book.status">
          <el-radio border v-for="e in $consts.bookStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input v-model="book.introduction" maxlength="600" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <el-input v-model="book.img" placeholder="图片url地址"></el-input>
      </el-form-item>

      <el-form-item label>
        <div class="dialog-imgbox">
          <img :src="book.img" alt v-show="book.img" />
        </div>
      </el-form-item>
    </el-form>

    <div slot="footer" class="footer">
      <el-button @click="$router.go(-1)" icon="el-icon-circle-close">取消</el-button>
      <el-button @click="save" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
    </div>
  </div>
</template>
<script> 
export default {
  data: () => {
    return {
      saveLoading: false,

      book: {},
      dialogType: "新增",
      bookRules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        author: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },
  created() {
    const id = this.$route.params?.id;
    if (!id) {
      this.book.status = 'normal';
      return;
    }
    this.dialogType = "修改";
    //调用API获取最新的对象
    this.$axios.get('/api/book/id', { params: { id } }).then(res => {
      if (res.status == '200' && res.data.status == 'OK') {
        this.book = res.data.data;
      }
      else
        this.$message.error(res.data.message);
    })
  },
  methods: {
    save() {
      this.saveLoading = true;
      this.$refs.bookForm.validate((valid, mes) => {
        if (!valid) {
          this.$message.error('输入有误，请修改后重新提交！');
          return;
        }
        //调用后端api
        this.$axios.post('/api/book/save', this.book).then(res => {
          if (res.status == '200' && res.data.status == 'OK') {
            this.$message.success('保存成功');
            this.$router.go(-1);
          }
          else
            this.$message.error(res.data.message);
        })
      })
      this.saveLoading = false;
    },
  }
}
</script>

<style scoped lang='less'>
.dialog-imgbox {
  border: 1px dashed #0003;
  width: 150px;
  height: 100px;
  text-align: center;
  img {
    height: 100%;
    object-fit: contain;
  }
}
.footer {
  text-align: center;
}
</style>