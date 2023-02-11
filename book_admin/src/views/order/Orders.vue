//列表管理页面：增删改查管理入口
<template>
  <!-- 全局样式“view-page”，及内容区域“view-scroll”，目的是为了控制内容滚动条 -->
  <div class="view-page">
    <!-- 1、工具栏，左右结构：左侧“操作按钮”+右侧“查询” -->
    <div class="toolbar">
      <!-- 1.1、操作按钮 -->
      <div style="padding-top: 2px;">
        <el-button @click="handleDeletItems" icon="el-icon-delete" title="删除选择项" type="warning" :disabled="$refs.listTable?.selection.length<1">删除</el-button>
      </div>
      <!-- 1.2、查询 -->
      <el-form :model="search" inline ref="searchForm">
        <el-form-item prop="status">
          <el-radio-group v-model="search.status">
            <el-radio-button border label>All</el-radio-button>
            <el-radio-button v-for="e in $consts.orderStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="products">
          <el-input v-model="search.products" placeholder="请输入商品关键词" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="searchData" :loading="loading">查询</el-button>
          <el-button icon="el-icon-refresh-left" @click="$refs.searchForm.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2、内容列表 -->
    <!-- 上view-scroll，目的是控制表格内容超出后的局部滚动条 -->
    <div class="view-scroll">
      <el-table :data="listData" ref="listTable" row-key="id" border stripe v-loading="loading" class="table-scroll">
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column label="订单编号" width="80" prop="id" align="center">
          <el-link slot-scope="scope" @click="$refs.itemDetail.show(scope.row)" type="primary">{{scope.row.id.toString().padStart(6,'0')}}</el-link>
        </el-table-column>
        <el-table-column label="用户" width="80" prop="name"></el-table-column>

        <el-table-column label="订单金额" width="80" prop="money"></el-table-column>
        <el-table-column label="状态" width="80" prop="status">
          <el-tag slot-scope="scope" :type="$consts.orderStatus[scope.row.status].type">{{$consts.orderStatus[scope.row.status].text}}</el-tag>
        </el-table-column>

        <el-table-column label="商品信息" min-width="200" width="auto" prop="products" show-overflow-tooltip></el-table-column>

        <el-table-column label="创建时间" width="100" align="center" prop="createtime">
          <template slot-scope="scope">{{formatTime(scope.row.createtime,'{y}-{m}-{d}')}}</template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作" class-name="table-link-btton" width="90" align="center">
          <template slot-scope="scope">
            <!-- <el-link @click="$refs.itemDialogPlus.show(scope.row)" type="primary">修改</el-link> -->
            <el-link @click="handleDelet(scope.row)" type="warning">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3、分页 -->
    <Pagination :total="total" :size.sync="search.size" :index.sync="search.index" @pagination="loadData"></Pagination>

    <!-- 4、其他弹框组件 -->
    <!-- 4.1 详情-抽屉弹框 -->
    <ItemDetail ref="itemDetail"></ItemDetail>
  </div>
</template>

<script>
// vue组件
import ItemDetail from './ItemDetail.vue'
import Pagination from '@/components/Pagination.vue'

// js组件
import { formatTime } from '@/../../util/js/date.js'

export default {
  name: 'Orders',
  components: {
    ItemDetail, Pagination
  },
  data() {
    return {
      listData: [],   //列表数据
      loading: false, //加载状态
      total: 10,      //列表总数
      search: {       //查询对象
        uid: '', status: '', products: '',
        index: 1, //页码
        size: 10, //页大小，页行数
      },
    }
  },
  //初始化加载数据
  created() {
    this.loadData();
  },
  methods: {
    formatTime,
    //加载数据
    loadData() {
      this.loading = true;
      this.$api.order_list(this.search)
        .then(res => {
          this.listData = res.data;
          this.total = res.total;
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //执行查询，需要重置页码到第一页
    searchData() {
      this.search.index = 1;
      this.loadData();
    },
    //删除-列表项
    handleDelet(row) {
      this.$confirm.warning('确定要删除吗？')
        .then(() => {
          this.$message.error('暂不支持删除功能！')
        })
        .catch();
    },
    //删除-列表选中项，多选
    handleDeletItems() {
      let srows = this.$refs.listTable.selection;
      if (!srows || srows.length < 1) {
        this.$message.warning('未选中任何项！');
        return;
      }
      this.$confirm.warning(`确定要删除选中的 [ ${srows.length} ] 项数据吗？删除后将不能恢复！`)
        .then(() => {
          this.$message.error('功能还没实现！');
        })
        .catch(() => { })
    },
  }
}
</script>

<style lang="less" scoped>
// 顶部工具栏样式
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    margin: 0px 6px 6px 6px;
  }
  .el-input {
    width: 160px;
  }
}
</style>


