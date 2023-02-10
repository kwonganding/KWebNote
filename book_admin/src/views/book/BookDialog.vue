// 编辑的弹框组件，常规弹窗模式
<template>
  <el-dialog v-loading="loading" :visible="visible" :show-close="false" :fullscreen="fullscreen" width="1160px" top="10vh">
    <!-- 标题栏：标题+按钮 -->
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

    <!-- 表单 -->
    <el-form :model="item" ref="itemForm" :rules="itemRules" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="item.name" placeholder="输入书籍名称" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者：" prop="author">
            <el-input v-model="item.author" placeholder="输入书籍作者" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图书分类：" prop="catgory">
            <TreeSelect style="width:100%" :data="bookTypes" v-model="item.catgory"></TreeSelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签：" prop="tag">
            <el-select v-model="item.tag" style="width:100%" clearable>
              <el-option v-for="tag in bookTags" :key="tag.id" :label="tag.name" :value="tag.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="价格：" prop="price">
            <el-input v-model.number="item.price" placeholder="输入价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上架状态：" prop="status">
            <el-radio-group v-model="item.status">
              <el-radio border v-for="e in $consts.bookStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图片：">
        <ImgUpload v-model="item.imgs"></ImgUpload>
      </el-form-item>

      <el-form-item label="内容简介：">
        <Editor :html.sync="item.introduction"></Editor>
      </el-form-item>
      <el-row v-show="item.id">
        <el-col :span="12">
          <el-form-item label="创建时间：" prop="price">
            <span>{{formatTime(item.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新时间：" prop="tag">
            <span>{{formatTime(item.lasttime,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 底部操作按钮 -->
    <div slot="footer" style="text-align:center">
      <el-button @click="visible=false" icon="el-icon-circle-close">取消</el-button>
      <el-button @click="save" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script> 
//Vue组件
import Editor from '@/components/Editor.vue'
import ImgUpload from '@/components/ImgUpload.vue'
import TreeSelect from '@/components/TreeSelect'
// JS组件
import { Book, bookRules } from '@/model/model.js'
import { formatTime } from '@/../../util/js/date.js'
import { queryDicData, TYPES } from '@/api/dicdata.js'

export default {
  components: { Editor, ImgUpload, TreeSelect },
  data: () => {
    return {
      visible: false,
      fullscreen: false,
      loading: false, //页面数据加载状态
      saveLoading: false, //保存状态
      item: {}, //待编辑的数据
      itemRules: bookRules, //验证规则
      dialogType: "新增",
      //字典选项数据
      //字典选项数据
      bookTags: [],
      bookTypes: [],
    }
  },

  methods: {
    formatTime,
    //保存
    save() {
      this.$refs.itemForm.validate((valid, mes) => {
        if (!valid) {
          this.$message.error('输入有误，请修改后重新提交！');
          return;
        }
        //调用后端api
        this.saveLoading = true;
        this.$api.book_save(this.item).then(res => {
          this.$message.success('保存成功');
          //触发一个自定义事件，通知更新
          this.$emit('updated');
          this.visible = false;
        }).catch(err => {
          this.$message.error(err);
        }).finally(() => { this.saveLoading = false });
      })
    },
    //外部使用，调用show()方法显示当前组件
    //不传入参数为新增，否则修改
    show(item) {
      this.visible = true;
      this.loadDicData();
      //参数为空，为新增
      if (!item) {
        this.item = new Book();
        return;
      }
      //修改模式，更新待修改数据item
      this.dialogType = "修改";
      this.loading = true;
      this.$api.book_id({ id: item.id }).then(res => {
        this.item = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });
    },
    //加载字典数据
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