//用于显示图书详情的组件，抽屉形式展示
<template>
  <el-drawer v-loading="loading" :title="book?.name" :visible.sync="visible" size="700px" custom-class="detail-box view-scroll">
    <h4>作者：</h4>
    <p class="item">{{book?.author}}</p>

    <h4>上架状态：</h4>
    <el-tag class="item" :type="$consts.bookStatus[book?.status]?.type">{{$consts.bookStatus[book?.status]?.text}}</el-tag>

    <h4>价格：</h4>
    <p class="item">{{book?.price}}</p>

    <h4>标签：</h4>
    <p class="item">{{book?.tag}}</p>

    <h4>图片：</h4>
    <ul class="item imglist">
      <li v-for="img in imgList" :key="img">
        <el-popover placement="bottom" trigger="click">
          <img :src="$api.URL.proxy + img" width="80px" height="80px" slot="reference" style="vertical-align: middle;" />
          <img :src="$api.URL.proxy + img" width="600px" />
        </el-popover>
      </li>
    </ul>

    <h4>内容简介：</h4>
    <div class="item" v-html="book?.introduction"></div>

    <h4>创建时间：</h4>
    <p class="item">{{parseTime(book?.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>

    <h4>更新时间：</h4>
    <p class="item">{{parseTime(book?.lasttime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>
  </el-drawer>
</template>

<script>

import { parseTime } from '@/../../util/js/date.js'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      book: {},
    }
  },
  computed: {
    imgList() {
      if (!this.book?.imgs) return [];
      return this.book?.imgs?.split(',');
    }
  },
  methods: {
    parseTime,
    show(book) {
      this.visible = true;
      //调用API获取最新的对象
      this.loading = true;
      this.$api.book_id({ id: book.id }).then(res => {
        this.book = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });
    }
  }

}
</script>

<style scoped lang="less">
.detail-box {
  h4 {
    margin: 5px 2px;
    padding: 0;
    &::before {
      content: "▍";
      color: #66a2e4;
    }
  }
  .item {
    margin: 5px 2px 15px 15px;
    color: #000c;
  }
  .imglist {
    list-style-type: none;
    display: flex;
    li {
      margin: 0 5px;
      img {
        object-fit: contain;
      }
    }
  }
}
</style>