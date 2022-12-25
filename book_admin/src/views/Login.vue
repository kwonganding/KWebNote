<template>
    <div class="page">
        <el-card shadow="hover" class="login-box">
            <h2>登 录</h2>
            <p class="t2">欢迎进入图书后台管理系统</p>
            <el-form :model="user" ref="userForm" label-width="80px" :rules="rules">
                <el-form-item label="用户名：" prop="uname" required>
                    <el-input v-model="user.uname" prefix-icon="el-icon-user" placeholder="输入用户名" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="密码：" required prop="upwd">
                    <el-input v-model="user.upwd" maxlength="16" prefix-icon="el-icon-lock" show-password></el-input>
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
        <div class="footer">BookAdmin Copyright @ by Kwong</div>
    </div>
</template>

<script>

export default {

    data: function () {
        return {
            user: { uname: '', upwd: '' },
            rules: {
                uname: [{ required: true, message: '用户名不能为空' }, { min: 3, max: 8, message: "长度应为3-8" }],
                upwd: [{ required: true, message: '密码不能为空' }, { min: 3, max: 8, message: "长度应为3-8" }],
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
                    //mes是一个对象，输入框上会高亮错误
                    console.log(mes);
                    // 限流
                    setTimeout(() => this.loading = false, 1000);
                    return;
                }
                //调用后端api进行登录
                this.$axios.post('/api/login', this.user).then(res => {
                    if (res.status == '200' && res.data.status == 'OK') {
                        this.$message.success('登录成功-' + this.user.uname);
                        //更新一些状态信息
                        this.$store.commit('setUser', { name: this.user.uname, token: res.data.token });
                        sessionStorage.setItem('token',res.data.token);
                        localStorage.removeItem('uname');
                        if (this.remember) {
                            localStorage.setItem('uname', this.user.uname);
                        }
                        //跳转
                        this.$router.push('/home');
                    }
                    else
                        this.$message.error(res.data.message);
                    this.loading = false;
                })

            })
        },
    },
    created: function () {
        //记住用户名-加载
        let uname = localStorage.getItem('uname');
        if (uname) {
            this.remember = true;
            this.user.uname = uname;
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    background: url(../assets/img/bg.jpg);
    background-position: center;
    // 强制全屏，遮住主页面
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
}
.login-box {
    background-color: #fff;
    width: 450px;
    height: max-content;
    // 居中
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    padding: 0 20px;
    position: absolute;

    h2 {
        text-align: center;
        margin: 20px;
    }
    .t2 {
        text-align: center;
        color: #9c8c8c;
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
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
</style>>