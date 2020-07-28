<template>
    <div>
        <el-button @click="btnGetUser">查询用户</el-button>
        <el-button @click="btnExit">退出登录</el-button>
        <hr/>
        {{userInfo}}
    </div>
</template>
<script>
    import router from "../router";
    export default {
        data(){
            return{
                userInfo:[]
            }
        },
        methods: {
            btnGetUser: function () {
                this.$axios.get('/api/identity/users')
                    .then(response => {
                        this.userInfo = response.data.items;
                    })
                    .catch(() => {
                        this.$message({
                            message: '登录失败或权限不足',
                            type: 'error'
                        });
                    })

            },
            btnExit: function () {
                this.$axios.get('/api/account/logout')
                    .then(() => {
                        this.$message({
                            message: '退出成功',
                            type: 'success'
                        });
                        router.push('/')
                    })
            }
        }
    }
</script>
