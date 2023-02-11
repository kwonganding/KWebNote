//详情（抽屉）展示组件：详情
<template>
  <el-drawer v-loading="loading" :title="item?.name" :visible.sync="visible" size="540px" custom-class="detail-box">
    <span class="ititle">标题：</span>
    <p class="ivalue">内容</p>

    <span class="ititle">状态：</span>
    <el-tag class="ivalue" type="warning">状态</el-tag>

    <span class="ititle">价格：</span>
    <p class="ivalue">￥1333.2345</p>

    <span class="ititle">创建时间：</span>
    <p class="ivalue">{{formatTime(item?.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>

    <span class="ititle">更新时间：</span>
    <p class="ivalue">{{formatTime(item?.lasttime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>
  </el-drawer>
</template>

<script>
// js组件
import { formatTime } from '@/../../util/js/date.js'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      item: {}, //数据对象
    }
  },
  methods: {
    formatTime,
    //外部使用，调用show()方法显示当前组件
    show(item) {
      this.visible = true;
      //调用API获取最新的对象
      this.loading = true;
      this.$api.api({ id: item.id }).then(res => {
        this.item = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });

      //TODO:******* 测试数据 *******/
      setTimeout(() => {
        this.item = item;
      }, 100);
    }
  }

}
</script>

<style scoped lang="less">
//标题、内容的样式
.detail-box {
  .ititle {
    margin: 5px 2px;
    display: block;
    &::before {
      content: "▍";
      color: #66a2e4;
    }
  }
  .ivalue {
    margin: 5px 2px 15px 15px;
    color: #000c;
  }
}
</style>