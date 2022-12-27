//用于显示图书详情的组件，抽屉形式展示
<template>
  <el-drawer title="图书详情" :visible.sync="visible" size="500px" class="detail-box">
    <strong>名称：</strong>
    <span>{{book?.name}}</span>
    <strong>作者：</strong>
    <span>{{book?.author}}</span>
    <strong>简介：</strong>
    <span>{{book?.introduction}}</span>
    <strong>封面：</strong>
    <img :src="book?.img" width="100%" />
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      book: {},
    }
  },
  props: [],
  methods: {
    show(bookInfo) {
      this.book = bookInfo;
      this.visible = true;
    }
  }

}
</script>

<style scoped lang="less">
.detail-box {
  * {
    padding: 10px;
    max-width: 100%;
    display: flex;
    flex-flow: column wrap;
  }
  strong {
    color: #0008;
  }
  span {
    text-indent: 1em;
  }
}
</style>