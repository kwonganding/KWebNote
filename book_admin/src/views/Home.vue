<template>
    <div>
        <div class="row">
            <el-card shadow="hover" class="card">
                <i class="el-icon-s-custom" style="color:skyblue"></i>
                <p class="value">{{baseInfo.user | format}}</p>
                <p class="title">注册用户数</p>
            </el-card>
            <el-card shadow="hover" class="card">
                <i class="el-icon-notebook-1" style="color:orange"></i>
                <p class="value">{{baseInfo.book?.toLocaleString()}}</p>
                <p class="title">图书数量</p>
            </el-card>
            <el-card shadow="hover" class="card">
                <i class="el-icon-s-cooperation" style="color:green"></i>
                <p class="value">{{baseInfo.order| format}}</p>
                <p class="title">订单数量</p>
            </el-card>
            <el-card shadow="hover" class="card">
                <i class="el-icon-money" style="color:gold"></i>
                <p class="value">￥{{baseInfo.money | format}}</p>
                <p class="title">销售总额</p>
            </el-card>
        </div>
        <div class="row">
            <el-card class="chart" shadow="hover" id="chart_order"></el-card>
            <el-card class="chart" shadow="hover" id="chart_user"></el-card>
        </div>
    </div>
</template>

// 用户数量，书籍数量，销售订单，销售金额
// 订单量的柱图，用户增长

<script>

//加载数据
async function loadData(ajax, api, target) {
    const res = await ajax.get(api);
    if (res.data.status == 'OK')
        return res.data.data;
    else
        console.log(res.data.message);
}

export default {
    data() {
        return {
            baseInfo: {},
            chartOrder: {},
            chartUser: {}
        }
    },
    async created() {
        this.baseInfo = await loadData(this.$axios, '/api/stats_base');
        this.chartOrder = await loadData(this.$axios, '/api/chart_order');
        this.chartUser = await loadData(this.$axios, '/api/chart_user');
    },
    watch: {
        chartOrder(newv) {
            if (newv)
                this.loadChartOrder();
        },
        chartUser(newv) {
            if (newv)
                this.loadChartUser();
        }
    },
    methods: {
        loadChartOrder() {
            const dom = document.getElementById('chart_order');
            const chart = this.$echarts.init(dom);
            let option = {
                legend: { data: ['订单统计'] },
                textStyle: { fontSize: 13 },
                xAxis: {
                    type: "category",
                    data: this.chartOrder?.map(s => s.name),
                },
                yAxis: { type: 'value', },
                series: [
                    {
                        name: '订单统计',
                        data: this.chartOrder?.map(s => s.value),
                        type: "bar",
                        label: { show: true, }
                    }
                ]
            }
            chart.setOption(option);
            window.addEventListener('resize', chart.resize);
        },
        loadChartUser() {
            const dom = document.getElementById('chart_user');
            const chart = this.$echarts.init(dom);
            let option = {
                legend: { data: ['用户增长'] },
                textStyle: { fontSize: 13 },
                xAxis: {
                    type: "category",
                    data: this.chartUser?.map(s => s.name),
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '用户增长',
                        data: this.chartUser?.map(s => s.value),
                        type: "line", smooth: true,
                        label: { show: true, }
                    }
                ]
            }
            chart.setOption(option);
            window.addEventListener('resize', chart.resize);
        }
    },
    // 千分位的过滤器
    filters: {
        format: function (v) { return v?.toLocaleString(); }
    }
}
</script>

<style lang="less" scoped>
.row {
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 100%;
        margin: 10px;
    }
    .chart {
        height: 360px;
        padding: 10px 5px 0;
    }
}

.card {
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
</style>
