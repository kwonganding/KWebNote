<template>
    <div id="app">
        <el-button type="text" @click="logout">退出登录</el-button>
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'app',
    methods:{
        logout(){
            sessionStorage.removeItem('token');
        }
    }
}
</script>

<style>
body {
    background: #fff;
}
</style>
