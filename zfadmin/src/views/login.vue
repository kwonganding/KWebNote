<template>
    <div>
        <h2>登录</h2>
        <el-form :model="user" ref="userForm" label-width="100px" style="max-width:400px;" :rules="rules">
            <el-form-item label="用户名：" prop="uname" required error="必填">
                <el-input v-model="user.uname" prefix-icon="el-icon-user" placeholder="输入用户名" maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="密码：" required prop="upwd" error="必填">
                <el-input v-model="user.upwd" maxlength="16" prefix-icon="el-icon-lock" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox label="记住用户名" v-model="remember"></el-checkbox>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button type="primary" @click="login" icon="el-icon-circle-check" :loading="loading">登录</el-button>
                <el-button type="warning" @click="$refs.userForm.resetFields()" icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

function rememberUname(remenber, uname) {
    localStorage.removeItem('uname');
    if (remenber) {
        localStorage.setItem('uname', uname);
    }
}

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
            this.$refs.userForm.validate((valid, mes) => {
                if (!valid) {
                    this.$message.error('输入有误，请修改后重新提交！');
                    //mes是一个对象，输入框上会高亮错误
                    console.log(mes);
                    return;
                }
                this.$message.success('登录成功-' + this.user.uname);
                this.loading = true;
                setTimeout(() => this.loading = false, 1000);
                //
                rememberUname(this.remember, this.user.uname);
                // this.$router.push('/home');
            })
        },
        reset() {

        }
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

<style>
</style>