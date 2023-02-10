//列表管理页面：图书列表，图书的各种增删改查管理
<template>
  <!-- 全局样式“view-page”，及内容区域“view-scroll”，目的是为了控制内容滚动条 -->
  <div class="view-page">
    <!-- 1、工具栏，左右结构：左侧“操作按钮”+右侧“查询” -->
    <div class="toolbar">
      <!-- 1.1、操作按钮 -->
      <div style="padding-top: 2px;">
        <el-button @click="$refs.itemDialogPlus.show()" type="primary" icon="icon icon-add" title="弹窗模式-覆盖父视图">新增</el-button>

        <el-button @click="$refs.itemDialog.show()" icon="el-icon-plus" type="primary" title="普通弹窗模式">新增2</el-button>
        <!-- <el-button @click="handleAdd" title="路由到新视图">新增3(路由)</el-button> -->
        <!-- <el-button @click="handleEdit" title="路由到新视图">修改(路由)</el-button> -->
        <el-button @click="handleDeletItems" icon="el-icon-delete" title="删除选择项" type="warning" :disabled="$refs.listTable?.selection.length<1">删除</el-button>
      </div>
      <!-- 1.2、查询 -->
      <el-form :model="search" inline ref="searchForm">
        <el-form-item prop="status">
          <el-radio-group v-model="search.status">
            <el-radio-button border label>All</el-radio-button>
            <el-radio-button v-for="e in $consts.bookStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="search.name" placeholder="请输入名称关键词" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="search.author" placeholder="请输入作者关键词" maxlength="50"></el-input>
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
      <el-table :data="listData" ref="listTable" row-key="id" border stripe v-loading="loading">
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column label="ID" width="54px" prop="id" align="center"></el-table-column>
        <el-table-column label="名称" min-width="200" width="auto" prop="name" show-overflow-tooltip>
          <el-link slot-scope="scope" @click="$refs.itemDetail.show(scope.row)" type="primary">{{scope.row.name}}</el-link>
        </el-table-column>
        <el-table-column label="作者" width="200" prop="author" show-overflow-tooltip></el-table-column>
        <el-table-column label="标签" width="80" align="center" prop="tag"></el-table-column>
        <el-table-column label="价格" width="80" align="center" prop="price"></el-table-column>
        <el-table-column label="评论数" width="80" align="center" prop="comments"></el-table-column>
        <el-table-column label="图片" width="65" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom" trigger="click">
              <img :src="previewImg(scope.row.imgs)" width="40px" slot="reference" style="vertical-align: middle;" />
              <img :src="previewImg(scope.row.imgs)" width="500px" />
            </el-popover>
          </template>
        </el-table-column>
        <!-- 枚举常量 -->
        <el-table-column label="状态" width="70" align="center" prop="status" :formatter="$consts.bookStatus.tableFormater">
          <el-tag slot-scope="scope" :type="$consts.bookStatus[scope.row.status].type">{{$consts.bookStatus[scope.row.status].text}}</el-tag>
        </el-table-column>
        <el-table-column label="修改日期" width="100" align="center" prop="lasttime">
          <template slot-scope="scope">{{formatTime(scope.row.lasttime,'{y}-{m}-{d}')}}</template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作" class-name="link-btton" width="90" align="center">
          <template slot-scope="scope">
            <el-link @click="$refs.itemDialogPlus.show(scope.row)" type="primary">修改</el-link>
            <el-link @click="handleDelet(scope.row)" type="warning">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3、分页 -->
    <Pagination :total="total" :size.sync="search.size" :index.sync="search.index" @pagination="loadData"></Pagination>

    <!-- 4、其他弹框组件 -->
    <!-- 4.1 详情-抽屉弹框 -->
    <BookDetail ref="itemDetail"></BookDetail>
    <!-- 4.2 编辑弹框 -->
    <BookDialog ref="itemDialog" v-on:updated="loadData"></BookDialog>
    <!-- 4.3 编辑弹框plus版，100%遮罩当前视图 -->
    <BookDialogPlus ref="itemDialogPlus" v-on:updated="loadData"></BookDialogPlus>
  </div>
</template>

<script>
// vue组件
import BookDetail from './BookDetail.vue'
import BookDialog from './BookDialog.vue'
import BookDialogPlus from './BookDialogPlus.vue'
import Pagination from '@/components/Pagination.vue'

// js组件
import { formatTime, formatNow } from '@/../../util/js/date.js'

export default {
  name: 'Books',
  components: {
    BookDetail, BookDialog, BookDialogPlus, Pagination
  },
  data() {
    return {
      listData: [],   //列表数据
      loading: false, //加载状态
      total: 10,      //列表总数
      search: {       //查询对象
        status: 'normal', name: '', author: '',
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
      this.$api.book_list(this.search)
        .then(res => {
          this.listData = res.data;
          this.total = res.total;
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => {
          this.loading = false;
        })
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

    //列表中的图片缩略图地址处理，显示第一张，加上代理
    previewImg(imgs) {
      if (!imgs) return;
      return this.$api.URL.proxy + imgs?.split(',')[0];
    },
    // 弃用
    handleAdd() {
      this.$router.push('/book/add');
    },
    handleEdit() {
      let srows = this.$refs.listTable.selection;
      if (!srows || srows.length < 1) {
        this.$message.warning('未选中任何项！');
        return;
      }
      this.$router.push('/book/update/' + srows[0].id);
    }
  }
}
</script>

<style lang="less" scoped>
// 表格中link-button的间距
.link-btton a + a {
  margin: 0 5px;
}

// 顶部工具栏样式
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    margin: 0px 6px 6px 6px;
  }
  .el-input {
    width: 140px;
  }
}
</style>

