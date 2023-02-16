<template>
  <div class="login-page">
    <el-card shadow="always" class="login-box" >
      <h2>登 录</h2>
      <p class="t2">欢迎进入图书后台管理系统</p>

      <el-form :model="user" ref="userForm" label-width="80px" :rules="rules">
        <!-- 校验规则“rules”里配置了必填，这里可以不用标记“required”了 -->
        <el-form-item label="用户名：" prop="name" required>
          <el-input v-model="user.name" prefix-icon="el-icon-user" placeholder="输入用户名" maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pwd">
          <el-input v-model="user.pwd" maxlength="16" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="记住用户名" v-model="remember"></el-checkbox>
        </el-form-item>

        <div class="btn">
          <el-button type="primary" @click="login" icon="el-icon-circle-check" :loading="loading">登录</el-button>
          <el-button type="warning" @click="$refs.userForm.resetFields()" icon="el-icon-refresh-left">重置</el-button>
        </div>
      </el-form>
    </el-card>
    <div class="footer">{{$consts.footer}}</div>
  </div>
</template>

<script>


export default {

  data: function () {
    return {
      user: { name: '', pwd: '' },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 3, max: 8, message: "长度应为3-8" }],
        pwd: [{ required: true, message: '密码不能为空' }, { min: 3, max: 8, message: "长度应为3-8" }],
      },
      loading: false,
      remember: false,
    }
  },

  methods: {
    login() {
      this.loading = true;
      this.$refs.userForm.validate((valid, mes) => {
        if (!valid) {
          this.$message.error('输入有误，请修改后重新提交！');
          // 限流
          setTimeout(() => this.loading = false, 500);
          return;
        }
        //调用后端api进行登录
        this.$api.login(this.user).then(res => {
          this.$message.success(res.message)
          //更新一些信息：
          // vuex存储用户信息
          this.$store.commit('setUser', { name: this.user.name, token: res.token });
          sessionStorage.setItem('admin_token', res.token);
          //记住登录用户名
          localStorage.removeItem('admin_login_name');
          if (this.remember) {
            localStorage.setItem('admin_login_name', this.user.name);
          }
          //跳转
          this.$router.push('/home');
        }).catch(err => {
          this.$message.error(err);
        }).finally(() => {
          this.loading = false;
        })
      })
    }
  },
  created: function () {
    //记住用户名-加载
    let name = localStorage.getItem('admin_login_name');
    if (name) {
      this.remember = true;
      this.user.name = name;
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  background: url(../assets/img/bg.jpg);
  background-position: center;
  // 强制全屏
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.login-box {
  background-color: #fff;
  width: 480px;
  height: max-content;
  // 居中，垂直、水平
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 2px;
  padding: 0 30px;

  h2 {
    text-align: center;
    font-size: 2em;
    margin: 20px;
  }
  .t2 {
    text-align: center;
    color: #999;
    margin: 25px 0;
    font-size: 0.9em;
  }
  .btn {
    text-align: center;
    margin: 25px 0;
  }
}
.footer {
  color: #fff;
  position: absolute;
  bottom: 10px;
  //   水平居中
  left: 50%;
  transform: translateX(-50%);
}
</style>>