// 编辑的弹框组件（Plus版），覆盖父视图，不影响其他功能
<template>
  <el-dialog v-loading="loading" :visible="visible" :show-close="false" class="dialogPlus" width="100%" top="0" :modal="false">
    <!-- 标题栏：标题+按钮 -->
    <div slot="title" style="display:flex;justify-content:space-between;">
      <span style="font-weight:bold;line-height: 32px;">
        <i class="el-icon-edit"></i>
        {{dialogType}} -书籍信息
      </span>
      <!-- 按钮 -->
      <span>
        <el-button @click="visible=false" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="save" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
      </span>
    </div>

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
  </el-dialog>
</template>

<script>
//Vue组件
import Editor from '@/components/Editor.vue'
import ImgUpload from '@/components/ImgUpload.vue'
// JS组件
import { formatTime } from '@/../../util/js/date.js'

export default {
  components: { Editor, ImgUpload },
  data: () => {
    return {
      visible: false,
      loading: false, //页面数据加载状态
      saveLoading: false, //保存状态
      item: {}, //待编辑的数据
      itemRules: { name: { required: true, message: '必填' } }, //验证规则
      dialogType: "新增",
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
        this.$api.api(this.item).then(res => {
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
      //参数为空，为新增
      if (!item) {
        this.item = {};
        return;
      }
      //修改模式，更新待修改数据item
      this.dialogType = "修改";
      this.loading = true;
      this.$api.api({ id: item.id }).then(res => {
        // this.item = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });

      //TODO:******* 测试数据 *******/
      setTimeout(() => {
        this.item = item;
      }, 100);
    },
  }
}
</script>

// style样式在 ./assets/global.less