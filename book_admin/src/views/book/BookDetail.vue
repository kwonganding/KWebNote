//详情（抽屉）展示组件：图书详情
<template>
  <el-drawer v-loading="loading" :title="item?.name" :visible.sync="visible" size="700px" custom-class="detail-box">
    <span class="ititle">作者：</span>
    <p class="ivalue">{{item?.author}}</p>

    <span class="ititle">上架状态：</span>
    <el-tag class="ivalue" :type="$consts.bookStatus[item?.status]?.type">{{$consts.bookStatus[item?.status]?.text}}</el-tag>

    <span class="ititle">价格：</span>
    <p class="ivalue">{{item?.price}}</p>

    <span class="ititle">标签：</span>
    <p class="ivalue">{{item?.tag}}</p>

    <span class="ititle">图片：</span>
    <ul class="ivalue imglist">
      <li v-for="img in imgList" :key="img">
        <el-popover placement="bottom" trigger="click">
          <img :src="$api.URL.proxy + img" width="80px" height="80px" slot="reference" style="vertical-align: middle;" />
          <img :src="$api.URL.proxy + img" width="600px" />
        </el-popover>
      </li>
    </ul>

    <span class="ititle">内容简介：</span>
    <div class="ivalue" v-html="item?.introduction"></div>

    <span class="ititle">创建时间：</span>
    <p class="ivalue">{{formatTime(item?.createtime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>

    <span class="ititle">更新时间：</span>
    <p class="ivalue">{{formatTime(item?.lasttime,'{y}-{m}-{d} {h}:{i}:{s}')}}</p>
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
    imgList() {
      if (!this.item?.imgs) return [];
      return this.item?.imgs?.split(',');
    }
  },
  methods: {
    formatTime,
    //外部使用，调用show()方法显示当前组件
    show(item) {
      this.visible = true;
      //调用API获取最新的对象
      this.loading = true;
      this.$api.book_id({ id: item.id }).then(res => {
        this.item = res.data;
      }).catch(err => {
        this.$message.error(err);
      }).finally(() => { this.loading = false });
    }
  }

}
</script>

<style scoped lang="less">
.detail-box {
  .ititle {
    margin: 5px 2px;
    display: block;
    color: #0009;
    &::before {
      content: "▍";
      color: #66a2e4;
    }
  }
  .ivalue {
    margin: 5px 2px 15px 15px;
    color: #000c;
  }

  // 图片样式
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