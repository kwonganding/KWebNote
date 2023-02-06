//书籍管理页面：图书列表，图书的各种增删改查管理
<template>
  <!-- 全局样式“view-page”，及内容区域“view-scroll”，目的是为了控制单页内容滚动 -->
  <div class="view-page">
    <!-- 1、工具栏 -->
    <div class="actionbar">
      <!-- 操作按钮 -->
      <div>
        <el-button @click="$refs.bookDialogPlus.show()" type="primary" icon="icon icon-add" title="弹窗模式-覆盖父视图">新增</el-button>

        <el-button @click="handleAdd" icon="el-icon-plus" type="primary" title="普通弹窗模式">新增</el-button>
        <el-button @click="handleAdd" title="路由到新视图">新增3(路由)</el-button>
        <el-button @click="handleEdit" title="路由到新视图">修改(路由)</el-button>
        <el-button @click="handleDeletItems" icon="el-icon-delete" title="删除选择项" type="warning" :disabled="$refs.bookTable?.selection.length<1">删除</el-button>
      </div>
      <!-- 查询 -->
      <el-form :model="search" inline ref="searchForm">
        <el-form-item prop="status">
          <el-radio-group v-model="search.status">
            <el-radio-button border label>All</el-radio-button>
            <el-radio-button v-for="e in $consts.bookStatus.entries" :label="e.key" :key="e.key">{{e.text}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="search.name" placeholder="请输入名称关键词" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="search.author" placeholder="请输入作者关键词" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="searchData" :loading="listLoading">查询</el-button>
          <el-button icon="el-icon-refresh-left" @click="$refs.searchForm.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2、内容列表 -->
    <div class="view-scroll">
      <el-table :data="dataList" ref="tableList" row-key="id" border stripe v-loading="listLoading">
        <el-table-column type="selection" width="39px"></el-table-column>
        <el-table-column label="ID" width="48px" prop="id" align="center"></el-table-column>
        <el-table-column label="名称" min-width="200px" width="auto" prop="name" show-overflow-tooltip>
          <el-link slot-scope="scope" @click="$refs.bookDetail.show(scope.row)" type="primary">{{scope.row.name}}</el-link>
        </el-table-column>
        <el-table-column label="作者" width="200px" prop="author" show-overflow-tooltip></el-table-column>
        <el-table-column label="标签" width="80px" align="center" prop="tag"></el-table-column>
        <el-table-column label="价格" width="80px" align="center" prop="price"></el-table-column>
        <el-table-column label="评论数" width="80px" align="center" prop="comments"></el-table-column>
        <el-table-column label="图片" width="65px" align="center">
          <template slot-scope="scope">
            <el-popover placement="bottom" trigger="click">
              <img :src="previewImg(scope.row.imgs)" width="40px" slot="reference" style="vertical-align: middle;" />
              <img :src="previewImg(scope.row.imgs)" width="500px" />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="70px" align="center" prop="status" :formatter="$consts.bookStatus.tableFormater">
          <el-tag slot-scope="scope" :type="$consts.bookStatus[scope.row.status].type">{{$consts.bookStatus[scope.row.status].text}}</el-tag>
        </el-table-column>
        <el-table-column label="修改日期" width="100px" align="center" prop="lasttime">
          <template slot-scope="scope">{{parseTime(scope.row.lasttime,'{y}-{m}-{d}')}}</template>
        </el-table-column>

        <el-table-column label="操作" class-name="link-btton" width="90px" align="center">
          <template slot-scope="scope">
            <el-link @click="$refs.bookDialogPlus.show(scope.row)" type="primary">修改</el-link>
            <el-link @click="handleDelet(scope.row)" type="warning">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3、分页 -->
    <Pagination :total="total" :size.sync="search.size" :index.sync="search.index" @pagination="loadData"></Pagination>

    <!-- 4、其他组件 -->
    <BookDetail ref="bookDetail"></BookDetail>
    <BookDialog ref="bookDialog" v-on:updated="loadData"></BookDialog>
    <!-- 用于100%遮罩当前视图 -->
    <BookDialogPlus ref="bookDialogPlus" v-on:updated="loadData"></BookDialogPlus>
  </div>
</template>

<script>
import BookDetail from './BookDetail.vue'
import BookDialog from './BookDialog.vue'
import BookDialogPlus from './BookDialogPlus.vue'
import Pagination from '@/components/Pagination.vue'
import { parseTime } from '@/../../util/js/date.js'

function Book() {
  this.id = "";
  this.name = "";
  this.author = "";
  this.introduction = "";
  this.imgs = [];
  this.status = '';
  this.catgory = '';
  this.price = 0;
  this.tag = '';
  this.comments = 0;
  // this.createtime = '';
  // this.lasttime = '';
}

export default {
  name: 'Books',
  components: {
    BookDetail, BookDialog, BookDialogPlus, Pagination
  },
  data() {
    return {
      dataList: [],
      search: {
        ...new Book(),
        index: 1,
        size: 10,
      },
      total: 10,
      listLoading: false,
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.listLoading = true;
      this.$api.book_list(this.search)
        .then(res => {
          this.dataList = res.data;
          this.total = res.total;
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => {
          this.listLoading = false;
        })
    },
    searchData() {
      this.search.index = 1;
      this.loadData();
    },
    parseTime: parseTime,
    previewImg(imgs) {
      if (!imgs) return;
      return this.$api.URL.proxy + imgs?.split(',')[0];
    },

    handleDelet(row) {
      this.$confirm.warning('确定要删除吗？').then(() => {
        this.$message.error('暂不支持删除功能！')
      })
    },
    handleDeletItems() {
      let srows = this.$refs.tableList.selection;
      if (!srows || srows.length < 1) {
        this.$message.warning('未选中任何项！');
        return;
      }
      this.$confirm.warning(`确定要删除选中的 [ ${srows.length} ] 项数据吗？删除后将不能恢复！`)
        .then(() => {
          this.$message.error('功能还没实现！');
        })
    },
    handleAdd() {
      this.$router.push('/book/add');
    },
    handleEdit() {
      let srows = this.$refs.tableList.selection;
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
.link-btton a + a {
  margin: 0 5px;
}

.actionbar {
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

