// 用于中转跳转的页面
<script>
export default {
  created() {
    this.$router.replace({ path: '/' + this.$route.params, query: this.$route.query });
  }
}
</script>
