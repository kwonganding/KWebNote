<template>
  <el-menu-item v-if="!hasChildren" :index="item.path" class="mitem">
    <i :class="item.meta.icon"></i>
    <!-- 名称用title插槽，折叠时才有效 -->
    <span slot="title">{{title(item)}}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.path" class="msub-item">
    <template slot="title">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{title(item)}}</span>
    </template>
    <MenuItem v-for="child in children" :item="child" :key="child.path"></MenuItem>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: ['item'],
  computed: {
    children() {
      return this.item?.children?.filter(s => !s.hidden);
    },
    hasChildren() {
      return this.item?.children?.length > 0;
    },
  },
  methods: {
    title(item) {
      return item.meta?.lang ? this.$t('menu.' + item.meta.lang) : item.meta?.title;
    }
  }
}
</script>

<style scoped lang="less">
.el-menu--vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
