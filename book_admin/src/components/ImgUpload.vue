<template>
  <div>
    <el-upload
      ref="upload"
      :action="$api.URL.upload"
      list-type="picture-card"
      :multiple="true"
      accept="image/*"
      name="file"
      :limit="limit"
      :class="{hide:uploadHide}"
      :file-list="fileList"
      :on-exceed="onOutOfLimit"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="handeleBefore"
    >
      <!-- 上传按钮 -->
      <i slot="default" class="el-icon-plus"></i>
      <!-- 提示内容 -->
      <div slot="tip" style="font-size:0.8em">支持最多{{limit}}张图片，每张图片不超过{{maxSize}}Kb</div>
      <!-- file模板 -->
      <div slot="file" slot-scope="{file}" class="imgbox" :class="{success:file.status}">
        <!-- 缩略图的路径，如果相对路径则添加代理前缀-->
        <img :src="proxyURL(file.url)" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <!-- 嵌套的dialog，需要设置append-to-body，嵌入自身到body元素 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body custom-class="imgdialog">
      <img :src="proxyURL(dialogImageUrl)" alt style="max-width: 100%;max-heigt: 100%;object-fit:contain" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    value: { type: String, default: '' },    //文件路径集合字符串，逗号隔开
    limit: { type: Number, default: 5 },     //数量限制
    maxSize: { type: Number, default: 2048 } //文件大小（单位Kb)
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      innerValueChange: false, //标记是否内部文件变化
      fileList: [], //内部用的文件列表
    }
  },
  computed: {
    //当达到上传文件数量限制的时候，隐藏上传按钮
    uploadHide() { return this.fileList?.length == this.limit },
  },
  watch: {
    value(nval) {
      //如果是内部文件变化，则不处理，避免循环更新
      if (this.innerValueChange) {
        this.innerValueChange = false;
        return;
      }
      //同步已有文件，只在外部传入值时执行
      this.fileList = this.value ? this.value.split(',').map(f => { return { url: f } }) : [];
    }
  },
  mounted() {
    //首次初始化
    this.fileList = this.value ? this.value.split(',').map(f => { return { url: f } }) : [];
  },
  methods: {
    //超出数量限制
    onOutOfLimit() {
      this.$message.warning('文件上传个数超过限制！');
    },
    //预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    proxyURL(url) {
      return url.startsWith('/') ? this.$api.URL.proxy + url : url;
    },
    //删除项
    handleRemove(file) {
      this.fileList.remove(f => f.url == file.url)
      this.emitValue();
    },
    //上传之前，用于验证
    handeleBefore(file) {
      if (file.size / 1024 > this.maxSize) {
        this.$message.error(`文件大小超过限制：${this.maxSize}Kb`);
        return false
      }
    },
    // 上传成功
    handleSuccess(res, file, list) {
      this.fileList.push(file);
      this.fileList = Array.from(this.fileList);  //强制更新
      this.emitValue();
    },
    handleError(err) {
      this.$message.error('上传失败，请重试：' + err);
    },
    //更新prop
    emitValue() {
      this.innerValueChange = true;
      this.$emit('input', this.fileList.map(f => f.response ? f.response.url : f.url).join(','));
    },
  }
}
</script>

<style lang='less' scoped>
.imgbox {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  // 缩略图上加一个状态提示
  &.success::before {
    content: "";
    position: absolute;
    right: 0px;
    width: 0;
    height: 0;
    text-align: center;
    border-top: 24px solid #13ce66;
    border-left: 30px solid transparent;
  }
  &.success::after {
    content: "✓";
    position: absolute;
    right: 3px;
    top: -4px;
    color: #fff;
  }
}
</style>

<style>
.imgdialog {
  width: max-content;
  height: max-content;
  max-width: 80%;
}
.imgdialog .el-dialog__header {
  background: none;
}
/* 达到数量时，隐藏上传按钮 */
.hide .el-upload--picture-card {
  display: none;
}
/* 调整/取消动画 */
.el-list-enter-active,
.el-list-leave-active {
  transition: none;
}
</style>