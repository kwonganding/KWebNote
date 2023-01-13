// 首页，显示一些统计图形数据
<template>
  <div>
    <!-- // 用户数量，书籍数量，销售订单，销售金额 -->
    <div class="cards">
      <el-card shadow="hover">
        <i class="el-icon-s-custom" style="color:skyblue"></i>
        <p class="value">{{baseInfo.user | format}}</p>
        <p class="title">注册用户数</p>
      </el-card>
      <el-card shadow="hover">
        <i class="el-icon-notebook-1" style="color:orange"></i>
        <p class="value">{{baseInfo.book?.toLocaleString()}}</p>
        <p class="title">图书数量</p>
      </el-card>
      <el-card shadow="hover">
        <i class="el-icon-s-cooperation" style="color:green"></i>
        <p class="value">{{baseInfo.order| format}}</p>
        <p class="title">订单数量</p>
      </el-card>
      <el-card shadow="hover">
        <i class="el-icon-money" style="color:gold"></i>
        <p class="value">￥{{baseInfo.money | format}}</p>
        <p class="title">销售总额</p>
      </el-card>
    </div>

    <!-- // 订单量的柱图，用户增长 -->
    <div class="charts">
      <el-card class="chart" shadow="hover" id="chart_order"></el-card>
      <el-card class="chart" shadow="hover" id="chart_user"></el-card>
    </div>
  </div>
</template>

<script>

// 加载echart图表
function bindEchart(id, $echats, name, data, type) {
  if (!data)
    return;
  const dom = document.getElementById(id);
  const chart = $echats.init(dom);
  let option = {
    // legend: { data: [name] }, //图例
    title: { show: true, text: name, x: 'center', y: 'top' },
    textStyle: { fontSize: 13 },
    tooltip: { trigger: 'item' },
    xAxis: {
      type: "category",
      data: data.map(s => s.name),//获取x轴值到数组
      axisTick: { alignWithLabel: true }, //x轴刻度线和名称对齐
    },
    yAxis: { type: 'value' },
    series: [{
      name: name,
      data: data.map(s => s.value),//获取y轴值到数组
      type: type,
      smooth: true,
      label: { show: true }
    }]
  }
  chart.setOption(option);
  window.addEventListener('resize', chart.resize);
}

export default {
  data() {
    return {
      baseInfo: {},
      chartOrder: [],
      chartUser: [],
    }
  },
  async created() {
    this.$api.stats_base().then(res => this.baseInfo = res.data);
    this.$api.stats_order().then(res => this.chartOrder = res.data);
    this.$api.stats_user().then(res => this.chartUser = res.data);
  },
  watch: {
    chartOrder(v) {
      if (v)
        this.loadChartOrder();
    },
    chartUser(v) {
      if (v)
        this.loadChartUser();
    }
  },
  methods: {
    loadChartOrder() {
      bindEchart('chart_order', this.$echarts, '订单数量统计', this.chartOrder, 'bar');
    },
    loadChartUser() {
      bindEchart('chart_user', this.$echarts, '用户增长曲线', this.chartUser, 'line');
    }
  },
  // 千分位的过滤器
  filters: {
    format: function (v) { return v?.toLocaleString(); }
  }
}
</script>

<style lang="less" scoped>
.cards,
.charts {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 100%;
    margin: 10px;
  }
}

.cards .el-card {
  text-align: center;
  * {
    margin: 15px 0;
  }
  i {
    font-size: 50px;
  }
  .value {
    font-size: 20px;
    font-weight: bold;
  }
  .title {
    color: #0009;
  }
}

.charts .el-card {
  height: 360px;
  padding: 10px 5px 0;
}
</style>
