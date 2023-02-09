// 图书编辑的弹框组件，常规模式
<template>
  <el-dialog :visible="visible" :show-close="false" :fullscreen="fullscreen" width="1160px" top="10vh">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="图书分类：" prop="catgory">
              <TreeSelect style="width:100%" :data="bookTypes" v-model="book.catgory"></TreeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签：" prop="tag">
              <el-select v-model="book.tag" style="width:100%" clearable>
                <el-option v-for="item in bookTags" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="价格：" prop="price">
              <el-input v-model.number="book.price" placeholder="输入价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上架状态：" prop="status">
              <el-radio-group v-model="book.status">
                <el-radio border v-for="e in $consts.bookStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片：">
          <ImgUpload v-model="book.imgs"></ImgUpload>
        </el-form-item>

        <el-form-item label="内容简介：">
          <Editor :html.sync="book.introduction" height="300px"></Editor>
        </el-form-item>
        <el-row v-show="book.id">
          <el-col :span="12">
            <el-form-item label="创建时间：" prop="price">
              <span>{{parseTime(book.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新时间：" prop="tag">
              <span>{{parseTime(book.lasttime,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" style="text-align:center">
        <el-button @click="visible=false" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="save" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script> 

import { Book, bookRules } from '@/model/model.js'
import Editor from '@/components/Editor.vue'
import ImgUpload from '@/components/ImgUpload.vue'
import TreeSelect from '@/components/TreeSelect'

import { parseTime } from '@/../../util/js/date.js'
import { queryDicData, TYPES } from '@/api/dicdata.js'

export default {
  components: { Editor, ImgUpload, TreeSelect },
  data: () => {
    return {
      visible: false,
      fullscreen: false,
      loading: false,
      saveLoading: false,
      book: {},
      dialogType: "新增",
      bookRules,
      //字典选项数据
      bookTags: [],
      bookTypes: [],
    }
  },

  methods: {
    parseTime,
    save() {
      this.$refs.bookForm.validate((valid, mes) => {
        if (!valid) {
          this.$message.error('输入有误，请修改后重新提交！');
          return;
        }
        //调用后端api
        this.saveLoading = true;
        this.$api.book_save(this.book).then(res => {
          this.$message.success('保存成功');
          //触发一个自定义事件，通知更新成功
          this.$emit('updated');
          this.visible = false;
        }).catch(err => {
          this.$message.error(err);
        }).finally(() => { this.saveLoading = false });
      })
    },
    //外部调用-打开编辑框
    show(book) {
      this.visible = true;
      this.loadDicData();
      //参数为空，新增
      if (!book) {
        this.book = new Book();
        return;
      }
      //更新
      this.dialogType = "修改";
      //调用API获取最新的对象
      this.loading = true;
      this.$api.book_id({ id: book.id }).then(res => {
        this.book = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });
    },
    loadDicData() {
      queryDicData(TYPES.bookTag)
        .then(data => this.bookTags = data)
        .catch(err => { console.log(err) });
      queryDicData(TYPES.bookType, true)
        .then(data => this.bookTypes = data);
    }
  }
}
</script>