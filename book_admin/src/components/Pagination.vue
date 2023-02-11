// 分页组件
// 使用示例：<Pagination :total="total" :size.sync="search.size" :index.sync="search.index" @pagination="loadData"></Pagination>

<template>
  <el-pagination
    style="text-align:right;margin-top:5px" background
    :total="total" :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
    @current-change="pageChanged" @size-change="pageSizeChanged"
    layout="total, sizes, prev, pager, next, jumper"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    //总数
    total: { type: Number, default: 0, },
    //页码，外部绑定，加修饰符.sync
    size: { type: Number, default: 10, },
    // 当前页码，外部绑定，加修饰符.sync
    index: { type: Number, default: 1, }
  },
  computed: {
    // 用修饰符“.sync”来实现更新父组件的值
    currentPage: {
      get() { return this.index },
      set(val) { this.$emit('update:index', val) }
    },
    pageSize: {
      get() { return this.size },
      set(val) { this.$emit('update:size', val) }
    }
  },
  methods: {
    pageSizeChanged(v) {
      // 修改父组件值
      this.$emit('update:size', v);
      // 触发分页事件
      this.$emit('pagination');
    },
    pageChanged(v) {
      // 修改父组件值
      this.$emit('update:index', v);
      // 触发分页事件
      this.$emit('pagination');
    },
  }
}
</script>