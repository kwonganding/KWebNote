<template>
  <el-select v-model="item" placeholder>
    <el-option class="option view-scroll" :value="item.id" :label="item.name">
      data：数据
      <el-tree :data="data" :node-key="options.value" :props="options" class="tree" :default-checked-keys="[5]"></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'DicDicTreeSelect',
  props: {
    value: '',
    data: { type: Array },
    options: { type: Object, default: function () { return { value: 'id', label: 'name', children: 'children' } } }
  },
  computed: {
    citem: {
      get() { return this.value },
      set(nval) { this.emit('input', nval) }
    }
  },
  data() {
    return {
      items: [],
      item: { id: '', name: '' }
    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.option {
  min-height: 100px;
  height: auto;
  max-height: 200px;
  overflow-y: auto;
  padding: 0 5px;
  background: none;
  line-height: 1;
  &:hover {
    background: none;
  }
}
.tree {
  background: none;
}
</style>