//书籍管理页面：图书列表，图书的各种增删改查管理
<template>
  <div>
    <!-- 操作、查询 -->
    <el-form :model="search" inline ref="searchForm">
      <div class="search">
        <el-form-item>
          <el-button @click="$refs.bookDialog.add(emptyBook())" icon="el-icon-plus" type="primary" title="普通弹窗模式">新增</el-button>

          <el-button @click="$refs.bookDialogPlus.add(emptyBook())" title="弹窗模式-覆盖父视图">新增2</el-button>
          <el-button @click="add" title="路由到新视图">新增3(路由)</el-button>
          <el-button @click="update" title="路由到新视图">修改(路由)</el-button>
          <el-button @click="deleteBooks" icon="el-icon-delete" title="删除选择项" type="warning">删除</el-button>
        </el-form-item>
        <div>
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
        </div>
      </div>
    </el-form>
    <!-- 列表 -->
    <el-table :data="bookList" ref="bookTable" row-key="id" border stripe v-loading="listLoading">
      <el-table-column type="selection" width="39px"></el-table-column>
      <el-table-column label="ID" width="40px" prop="id" align="center"></el-table-column>
      <el-table-column label="名称" width="260px" prop="name" show-overflow-tooltip>
        <el-link slot-scope="scope" @click="$refs.bookDetail.show(scope.row)" type="primary">{{scope.row.name}}</el-link>
      </el-table-column>
      <el-table-column label="作者" width="200px" prop="author" show-overflow-tooltip></el-table-column>
      <el-table-column label="简介" width="auto" prop="introduction" show-overflow-tooltip></el-table-column>
      <el-table-column label="封面" width="100px" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <img :src="scope.row.img" width="40px" slot="reference" style="vertical-align: middle;" />
            <img :src="scope.row.img" width="500px" />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80px" align="center" prop="status" :formatter="$consts.bookStatus.tableFormater">
        <el-tag slot-scope="scope" :type="$consts.bookStatus[scope.row.status].type">{{$consts.bookStatus[scope.row.status].text}}</el-tag>
      </el-table-column>
      <el-table-column label="操作" class-name="link-btton" width="126px" align="center">
        <template slot-scope="scope">
          <el-link @click="$refs.bookDetail.show(scope.row)" type="primary">查看</el-link>
          <el-link @click="$refs.bookDialog.update(Object.assign({},scope.row))" type="primary">修改</el-link>
          <el-link @click="handleDelet(scope.row)" type="warning">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align:right;margin-top:6px"
      :total="total"
      background
      :current-page="search.index"
      :page-size="search.size"
      :page-sizes="[5, 10, 20]"
      @current-change="pageChanged"
      @size-change="pageSizeChanged"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

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

function Book() {
  this.id = "";
  this.name = "";
  this.author = "";
  this.introduction = "";
  this.img = "";
  this.status = '';
}

export default {
  components: {
    BookDetail, BookDialog, BookDialogPlus
  },
  data() {
    return {
      bookList: [],
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
    emptyBook() { return new Book() },
    async loadData() {
      this.listLoading = true;
      const res = await this.$axios.post('/api/book/list', this.search);
      if (res.data.status == 'OK') {
        this.bookList = res.data.data;
        this.total = res.data.total;
      }
      else
        console.log(res.data.message);
      this.listLoading = false;
    },
    searchData() {
      this.search.index = 1;
      this.loadData();
    },
    handleDelet(row) {
      this.$confirm.warning('确定要删除吗？').then(() => {
        this.$message.error('暂不支持删除功能！')
      })
    },
    pageSizeChanged(v) {
      this.search.size = v;
      this.loadData();
    },
    pageChanged(v) {
      this.search.index = v;
      this.loadData();
    },
    deleteBooks() {
      let srows = this.$refs.bookTable.selection;
      if (!srows || srows.length < 1) {
        this.$message.warning('未选中任何项！');
        return;
      }
      this.$confirm.warning(`确定要删除选中的 [ ${srows.length} ] 项数据吗？删除后将不能恢复！`).then(() => {
        this.$message.error('功能还没实现！');
      })
    },
    add() {
      this.$router.push('/book/add');
    },
    update() {
      let srows = this.$refs.bookTable.selection;
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

.search {
  display: flex;
  justify-content: space-between;
  .el-form-item {
    margin: 6px;
  }
  .el-input {
    width: 140px;
  }
}
</style>

<style>
/* .editDialog.el-dialog__wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: inherit;
}
.editDialog .el-dialog {
  width: 100% !important; 
  height: 100% !important;
  margin-top:0px !important;
}
.editDialog .el-dialog__header{
    background: #1eF1;
} */
</style>