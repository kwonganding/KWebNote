//详情（抽屉）展示组件：订单详情
<template>
  <el-drawer v-loading="loading" title="订单详情" :visible.sync="visible" size="540px" custom-class="detail-box">
    <span class="ititle">订单ID：</span>
    <p class="ivalue">{{item?.id}}</p>

    <span class="ititle">用户（id）：</span>
    <p class="ivalue">{{item?.name}}（{{item?.uid}}）</p>

    <span class="ititle">订单金额：</span>
    <p class="ivalue">{{item?.money}}</p>

    <span class="ititle">状态：</span>
    <el-tag class="ivalue" :type="$consts.orderStatus[item?.status]?.type">{{$consts.orderStatus[item?.status]?.text}}</el-tag>

    <span class="ititle">商品信息：</span>
    <div class="ivalue">
      <el-table :data="plist" size="mini" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="数量" prop="total"></el-table-column>
      </el-table>
    </div>

    <span class="ititle">创建时间：</span>
    <p class="ivalue">{{formatTime(item?.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>
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
  computed: {
    plist() {
      return this.item.products ? JSON.parse(this.item.products) : [];
    }
  },
  methods: {
    formatTime,
    //外部使用，调用show()方法显示当前组件
    show(item) {
      this.visible = true;
      //调用API获取最新的对象
      this.item = item;
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