<template>
  <div style="border: 1px solid #DCDFE6">
    <Toolbar style="border-bottom: 1px solid #DCDFE6" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      :style="{height: height} "
      style="overflow-y: hidden;"
      v-model="content"
      :defaultConfig="editorConfig"
      @onMaxLength="onMaxLength"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { DomEditor } from '@wangeditor/editor'
import { throttle } from '@/../../util/js/util.js'

export default {
  components: { Editor, Toolbar },
  props: {
    html: { type: String },//富文本内容，外部传入，需用.sync修饰
    height: { default: '200px' }//高度
  },
  computed: {
    content: {
      get() { return this.html; },
      set(value) { this.$emit('update:html', value); }
    }
  },
  data() {
    return {
      editor: null,
      toolbarConfig: { excludeKeys: ['group-video', 'emotion', 'lineHeight'] },
      editorConfig: {
        placeholder: '请输入内容...', maxLength: 8000,
        MENU_CONF: {
          uploadImage: { //配置图片上传
            server: this.$api.URL.upload,  //后端文件上传地址
            fieldName: 'file', //表单参数名，和后端一致
            maxFileSize: 2 * 2048 * 2048,  //最大文件大小
            maxNumberOfFiles: 1, //每次文件个数
            allowedFileTypes: ['image/*'], //文件类型：图片
            timeout: 9 * 1000,  //超时时长
            // 自定义插入图片，根据后端返回的结构，加上跨域代理
            customInsert: (res, insertFn) => {
              const url = this.$api.URL.proxy + res.url
              insertFn(url)
            },
          }
        }
      },
      mode: 'default', // default simple
      onOutOfMaxLength: throttle(() => this.$message.warning('富文本内容长度超过最大值：' + this.editorConfig.maxLength), 1000),
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错。seal方法封闭一个对象
    },
    onMaxLength() {
      // 限流提示错误
      this.onOutOfMaxLength();
    }
  },
  updated() {
    ////在这里获取工具栏的配置toolbarKeys，用于自定义配置工具栏    
    // const toolbar = DomEditor.getToolbar(this.editor)
    // console.log(toolbar.getConfig().toolbarKeys)
  },
  beforeDestroy() {
    this.editor?.destroy();// 组件销毁时，及时销毁编辑器
  },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
/* 调整下工具栏默认样式，工具栏高度32px（默认40px） */
.w-e-bar-item {
  padding: 1px;
  height: 32px;
}
.w-e-drop-panel,
.w-e-bar-item-group .w-e-bar-item-menus-container {
  margin-top: 32px;
}
.w-e-bar-divider {
  margin: 4px;
  height: auto;
}
</style>


