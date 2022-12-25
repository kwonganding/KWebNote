<template>
    <div>
        <el-form :model="search" inline>
            <div class="search">
                <el-form-item>
                    <el-button @click="addBook" icon="el-icon-plus" type="primary">新增</el-button>
                    <el-button @click="deleteBooks" icon="el-icon-delete" title="删除选择项" type="warning">删除</el-button>
                </el-form-item>
                <div>
                    <el-form-item label="名称">
                        <el-input v-model="search.name" placeholder="请输入名称关键词"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="search.author" placeholder="请输入作者关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" type="primary">查询</el-button>
                        <el-button icon="el-icon-refresh-left">重置</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <el-table :data="bookList" ref="bookTable" row-key="id" border stripe v-loading="listLoading">
            <el-table-column type="selection" width="39px"></el-table-column>
            <el-table-column label="ID" width="40px" prop="id" align="center"></el-table-column>
            <el-table-column label="名称" width="260px" prop="name" show-overflow-tooltip>
                <el-link slot-scope="scope" @click="handleDetail(scope.row)" type="primary">{{scope.row.name}}</el-link>
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
            <el-table-column label="操作" class-name="link-btton" width="126px" align="center">
                <template slot-scope="scope">
                    <el-link @click="handleDetail(scope.row)" type="primary">查看</el-link>
                    <el-link @click="editBook(scope.row)" type="primary">修改</el-link>
                    <el-link @click="handleDelet(scope.row)" type="warning">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="text-align:right;margin-top:6px"
            :total="total"
            background
            :current-page="page.index"
            :page-size="page.size"
            :page-sizes="[5, 10, 20]"
            @current-change="pageChanged"
            @size-change="pageSizeChanged"
            layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>

        <el-drawer title="图书详情" :visible.sync="showDrawer" size="500px" class="detail-box">
            <strong>名称：</strong>
            <span>{{currentRow?.name}}</span>
            <strong>作者：</strong>
            <span>{{currentRow?.author}}</span>
            <strong>简介：</strong>
            <span>{{currentRow?.introduction}}</span>
            <strong>封面：</strong>
            <img :src="currentRow?.img" width="100%" />
        </el-drawer>

        <el-dialog title="编辑书籍信息" :visible="showDialog" width="700px" top="20vh" :show-close="false">
            <template #title>
                <span>
                    <i class="el-icon-edit"></i>
                    {{dialogType}} 书籍信息
                </span>
            </template>

            <el-form :model="bookInfo" ref="bookForm" :rules="bookRules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称：" prop="name">
                            <el-input v-model="bookInfo.name" placeholder="输入书籍名称" maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="作者：" prop="author" maxlength="50">
                            <el-input v-model="bookInfo.author" placeholder="输入书籍作者"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="简介：">
                    <el-input v-model="bookInfo.introduction" maxlength="600" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-input v-model="bookInfo.img" placeholder="图片url地址"></el-input>
                </el-form-item>

                <el-form-item label>
                    <div class="dialog-imgbox">
                        <img :src="bookInfo.img" alt v-show="bookInfo.img" />
                    </div>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button @click="showDialog=false">取消</el-button>
                <el-button @click="saveBook" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
function Book() {
    this.id = "";
    this.name = "";
    this.author = "";
    this.introduction = "";
    this.img = "";
}


export default {
    data() {
        return {
            bookList: [],
            bookInfo: {}, //书籍信息，用于编辑、新增
            bookRules: {
                name: [{ required: true, message: '必填', trigger: 'blur' }],
                author: [{ required: true, message: '必填', trigger: 'blur' }],
            },
            dialogType: "新增",
            showDialog: false,
            page: {
                index: 1,
                size: 5,
            },
            search: new Book(),
            total: 10,
            listLoading: false,
            saveLoading: false,
            showDrawer: false,
            currentRow: null, //数据详情，查看详情用
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.listLoading = true;
            const res = await this.$axios.get('/api/books', { params: this.page });
            if (res.data.status == 'OK') {
                this.bookList = res.data.data;
                this.total = res.data.total;

            }
            else
                console.log(res.data.message);
            this.listLoading = false;
        },
        handleDetail(row) {
            this.currentRow = row;
            this.showDrawer = true;
        },
        handleDelet(row) {
            this.$confirm.warning('确定要删除吗？').then(() => {
                this.$message.error('暂不支持删除功能！')
            })
        },
        pageSizeChanged(v) {
            this.page.size = v;
            this.loadData();
        },
        pageChanged(v) {
            this.page.index = v;
            this.loadData();
        },
        addBook() {
            this.bookInfo = new Book();
            this.dialogType = '新增';
            this.showDialog = true;
        },
        editBook(row) {
            this.bookInfo = Object.assign({}, row);
            this.dialogType = '修改';
            this.showDialog = true;
        },
        saveBook() {
            this.saveLoading = true;
            this.$refs.bookForm.validate((valid, mes) => {
                if (!valid) {
                    this.$message.error('输入有误，请修改后重新提交！');
                    return;
                }
                //调用后端api进行登录
                this.$axios.post('/api/books/save', this.bookInfo).then(res => {
                    if (res.status == '200' && res.data.status == 'OK') {
                        this.$message.success('保存成功');
                        //更新一些状态信息
                        this.loadData();
                    }
                    else
                        this.$message.error(res.data.message);
                })
                this.showDialog = false;
            })
            this.saveLoading = false;
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
        }
    }
}
</script>

<style lang="less" scoped>
.link-btton a + a {
    margin: 0 5px;
}
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
.search {
    display: flex;
    justify-content: space-between;
    .el-form-item {
        margin: 6px;
    }
}
.dialog-imgbox {
    border: 1px dashed #0003;
    width: 150px;
    height: 100px;
    text-align: center;
    img {
        height: 100%;
        object-fit: contain;
    }
}
</style>