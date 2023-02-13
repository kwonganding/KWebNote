//字典管理
<template>
  <!-- 左右结构 -->
  <div class="page">
    <div class="dictype">
      <div class="bar">
        <p class="title">
          <i class="el-icon-guide"></i> 字典类型
        </p>
        <el-button type="text" icon="el-icon-document-add" disabled>添加</el-button>
      </div>

      <ul class="view-scroll" v-loading="loading">
        <li v-for="item in dictypeList" :class="{active:currentType===item}" :key="item.id" @click="handleClick(item)">{{item.name}}</li>
      </ul>
    </div>

    <DicData ref="dicdataList" class="dicdata"></DicData>
  </div>
</template>

<script>
import DicData from './DicData.vue'

export default {
  name: 'Dictionary',
  components: { DicData },
  data() {
    return {
      dictypeList: [],
      currentType: {},
      loading: false,
    }
  },
  created() {
    this.laodData()
  },
  methods: {
    laodData() {
      this.loading = true;
      this.$api.dictype()
        .then(res => {
          this.dictypeList = res.data;
          this.handleClick(this.dictypeList[0])
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => this.loading = false)
    },
    handleClick(item) {
      this.currentType = item;
      this.$refs.dicdataList.updateDicList(this.currentType);
    }
  }
}
</script>

<style lang='less' scoped>
.page {
  display: flex;
  height: 100%;
}
.dictype {
  flex: 250px 0 0;
  padding-right: 5px;
  border-right: 1px solid #ebeef5;
  list-style-type: none;

  .bar {
    display: flex;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
    margin-bottom: 5px;
    .title {
      font-weight: bold;
      color: #6e737c;
    }
  }
  li {
    padding: 8px 5px;
    cursor: pointer;
    background: #f7f7f7;
    margin-bottom: 5px;
  }
  li.active {
    background: #409eff12;
    color: #409eff;
    &::after {
      content: "〉";
      float: right;
    }
  }
}
.dicdata {
  width: 100%;
  margin-left: 5px;
  overflow: auto;
}
</style>