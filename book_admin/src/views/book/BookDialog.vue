// 图书编辑的弹框组件，常规模式
<template>
  <el-dialog :visible="visible" :show-close="false" :fullscreen="fullscreen" width="800px">
    <template #title>
      <span>
        <i class="el-icon-edit"></i>
        {{dialogType}} -书籍信息
      </span>
      <span style="float:right;margin-top:-5px">
        <el-button icon="el-icon-full-screen" type="text" @click="fullscreen=!fullscreen" title="全屏"></el-button>
        <el-button icon="el-icon-close" type="text" @click="visible=false" title="关闭"></el-button>
      </span>
    </template>

    <div v-loading="loading">
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

      <div slot="footer" style="text-align:center">
        <el-button @click="visible=false" icon="el-icon-circle-close" round>取消</el-button>
        <el-button @click="save" type="primary" icon="el-icon-success" round :loading="saveLoading">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script> 

export default {
  data: () => {
    return {
      visible: false,
      fullscreen: false,
      loading: false,
      saveLoading: false,

      book: {},
      dialogType: "新增",
      bookRules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        author: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
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
            //触发一个自定义事件，通知更新成功
            this.$emit('updated')
          }
          else
            this.$message.error(res.data.message);
          this.saveLoading = false;
          this.visible = false;
        })
      })
    },
    add(book) {
      this.book = book;
      this.book.status = 'normal';
      this.dialogType = '新增';
      this.visible = true;
    },
    update(book) {
      this.dialogType = "修改";
      this.visible = true;
      //调用API获取最新的对象
      this.loading = true;
      this.$axios.get('/api/book/id', { params: { id: book.id } }).then(res => {
        if (res.status == '200' && res.data.status == 'OK') {
          this.book = res.data.data;
        }
        else
          this.$message.error(res.data.message);
        this.loading = false;
      })
    }
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
</style>