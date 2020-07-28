<template>
    <div>
        <!-- element ui表单
        详细信息请查看 https://element.faas.ele.me/#/zh-CN/component/form
        -->
        <el-row>
            <el-col :span="5">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.userNameOrEmailAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit" style="width: 100%">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    //引入路由
    import router from "../router";

    export default {
        name: 'Login',
        data() {
            return {
                //表单名
                form: {
                    userNameOrEmailAddress: '',
                    password: '',
                    rememberMe: true
                }
            };
        },
        methods: {
            submit() {
                this.$axios.post('/api/account/login', this.form)
                    .then(res => {
                            if (res.data.result == 1) {
                                //登录成功提示
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                //登录成功后跳转页面
                                router.push('about')
                            } else if (res.data.result == 2) {
                                //登录失败提示
                                this.$message({
                                    message: '登录失败! ' + res.data.description,
                                    type: 'error'
                                });
                            }
                        }
                    )
                    .catch(() => {
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    )
            }
        }
    }
</script>
