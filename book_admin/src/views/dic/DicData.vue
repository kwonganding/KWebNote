//字典数据
<template>
  <div v-loading="loading">
    <!-- 操作按钮 -->
    <div class="bar">
      <p class="title">
        <i class="el-icon-document"></i>
        字典数据（{{currentType.name}}）
      </p>
      <el-button type="primary" icon="el-icon-document-add" @click="addItem()">添加</el-button>
    </div>
    <!-- 2、内容列表 -->
    <el-table :data="dicdataList" ref="tableList" row-key="id" default-expand-all border stripe style="margin-top:5px">
      <!-- <el-table-column label="ID" width="60px" prop="id" align="center"></el-table-column> -->
      <el-table-column label="名称" width="auto" prop="name" align="left"></el-table-column>
      <el-table-column label="排序" width="80" prop="sort" align="center"></el-table-column>

      <el-table-column label="操作" width="140" align="center" class-name="table-link-btton">
        <template slot-scope="scope">
          <el-link @click="addItem(scope.row)" v-if="currentType?.tree" type="success">添加</el-link>
          <el-link @click="editItem(scope.row)" type="primary">修改</el-link>
          <el-link @click="deleteItem(scope.row)" type="danger">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog :visible="visible" :show-close="false" width="500px" top="15vh">
      <template #title>
        <span>
          <i class="el-icon-edit"></i>
          {{dialogType}} -字典数据
        </span>
        <span style="float:right;margin-top:-5px">
          <el-button icon="el-icon-close" type="text" @click="visible=false" title="关闭"></el-button>
        </span>
      </template>

      <el-form :model="dicData" ref="dataForm" :rules="dataRules" label-width="90px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="dicData.name" placeholder="输入名称" maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="父级节点：" prop="pid" v-if="currentType?.tree">
          <el-cascader
            :options="dicdataList"
            v-model="dicData.pid"
            style="width:100%"
            :show-all-levels="false"
            :props="cascaderOption"
            placeholder="请选择父级"
            clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="排序号：" prop="sort">
          <el-input-number v-model="dicData.sort" placeholder="输入排序号" maxlength="8" style="width:100%"></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" style="text-align:center">
        <el-button @click="visible=false" icon="el-icon-circle-close">取消</el-button>
        <el-button @click="save" type="primary" icon="el-icon-success" :loading="saveLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryDicData, updateTreeDisabled, cascaderOption } from '@/api/dicdata.js'

export default {
  name: 'DicData',
  data() {
    return {
      currentType: {},  //当前选择的字典类型
      dicdataList: [],  //字典数据集合
      dicData: {}, //待编辑的字典数据
      cascaderOption,
      dataRules: { name: { required: true, message: '必填' }, sort: { type: 'number', message: '排序号必须为数字' } },  //规则
      dialogType: '新增',
      visible: false,
      loading: false,
      saveLoading: false,
    }
  },
  methods: {
    updateDicList(item) {
      if (item)
        this.currentType = item;
      if (!this.currentType) return;
      //更新
      this.loading = true;
      queryDicData(this.currentType.code, this.currentType.tree)
        .then(data => {
          this.dicdataList = data;
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => this.loading = false)
    },
    addItem(item) {
      this.dialogType = '新增';
      //获取一个默认排序号
      let sort = 0;
      if (item)
        sort = item.children ? item.children.last().sort + 1 : 1;
      else
        sort = this.dicdataList ? this.dicdataList.last().sort + 1 : 1;
      this.dicData = { name: null, code: this.currentType.code, pid: item ? item.id : 0, sort };
      this.visible = true;
    },
    editItem(item) {
      this.dialogType = '编辑';
      if (this.currentType.tree)
        updateTreeDisabled(this.dicdataList, item);
      //前副本，避免影响列表
      this.dicData = Object.assign(item);
      this.visible = true;
    },
    save() {
      this.$refs.dataForm.validate((valid, mes) => {
        if (!valid) {
          this.$message.error('输入有误，请修改后重新提交');
          return;
        }
        this.saveLoading = true;
        this.$api.dicdata_save({ id: this.dicData.id, name: this.dicData.name, pid: this.dicData.pid, sort: this.dicData.sort, code: this.dicData.code })
          .then(res => {
            this.$message.success(res.message);
            //更新列表数据
            this.updateDicList();
          })
          .finally(() => {
            this.saveLoading = false;
            this.visible = false;
          })
      })
    },
    deleteItem(item) {
      if (item.children && item.children.length > 0) {
        this.$message.warning(`[${item.name}]包含子节点，不可删除，请先删除子节点！`);
        return;
      }
      this.$confirm.warning(`确定要删除[${item.name}]吗？删除将不可恢复！`).then(() => {
        this.$api.dicdata_delete({ id: item.id })
          .then(res => {
            this.$message.success(res.message);
            //更新列表数据
            this.updateDicList();
          });
      }).catch(() => { });
    }
  }
}
</script>

<style lang='less' scoped>
.bar {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  .title {
    font-weight: bold;
    color: #6e737c;
  }
}
</style>