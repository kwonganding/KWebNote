<template>
  <el-select v-model="currentText" placeholder="请选择" @clear="handelClear" clearable>
    <el-option class="option view-scroll" :value="currentItem[options.value]" :label="currentItem[options.label]">
      <!-- data：数据-->
      <!-- props：数据结构配置 -->
      <!-- node-key：唯一标识字段 -->
      <el-tree ref="tree" :data="data" :node-key="options.value" :props="options" class="tree" @current-change="handleCurrentChange"></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    value: { default: null }, //选中的值
    data: { type: Array },  //数据
    onlyLeaf: { type: Boolean, default: true },  //只能选择叶子节点
    //树形数据结构配置
    options: { type: Object, default: function () { return { value: 'id', label: 'name', children: 'children' } } }
  },
  computed: {
    //当前选中的选项文本
    currentText: {
      get() { return this.currentItem?.[this.options.label] },
      set() { }
    }
  },
  watch: {
    value(nval) {
      //如果是内部文件变化，则不处理，避免循环更新
      if (this.innerValueChange) {
        this.innerValueChange = false;
        return;
      }
      this.initialize();
    }
  },
  data() {
    return {
      currentItem: {}, //当前的有效选项
      innerValueChange: false, //标记是否内部文件变化
    }
  },
  methods: {
    handleCurrentChange(item, node) {
      //如果只能选择叶子节点，当前是非叶子节点时干活！
      if (this.onlyLeaf && !node.isLeaf) {
        //重置选中项
        this.$refs.tree.setCurrentKey(this.value);
        return; //不更新选中值
      }
      this.emitValue(item);
    },
    //清除
    handelClear() {
      this.emitValue({});
      this.$refs.tree.setCurrentKey(null);
    },
    //初始化设置当前选中的项
    initialize() {
      let key = this.value;
      const node = key ? this.$refs.tree.getNode(key) : null;
      this.currentItem = node ? node.data : {};
      this.$refs.tree.setCurrentKey(key);
    },
    // 更新值
    emitValue(item) {
      this.currentItem = item;
      this.innerValueChange = true;
      this.$emit('input', item[this.options.value]);
    }
  }
}
</script>

<style lang='less' scoped>
.option {
  min-height: 100px;
  height: auto;
  overflow-y: auto;
  padding: 0 5px;
  background: none;
  line-height: 1;
  font-weight: normal;
  &:hover {
    background: none;
  }
}
.tree {
  background: none;
}
</style>

<style>
.el-tree .is-current > .el-tree-node__content {
  font-weight: 600;
  color: #409eff;
}
.el-tree-node__content {
  height: 32px;
}
</style>