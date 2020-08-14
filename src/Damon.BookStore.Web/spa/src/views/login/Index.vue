<template>
  <div>
    <el-container>
      <el-main>
        <el-row style="margin:200px">
          <el-col :span="6" :offset="8">
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
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name:"login",
  data() {
    return {
      //表单名
      form: {
        userNameOrEmailAddress: "",
        password: "",
        rememberMe: true,
      },
    };
  },
  methods: {
    submit() {
      var that = this;
      this.$store.dispatch("user/login", this.form).then((res) => {
        if (res.access_token != undefined) {
          // 登录成功提示
          this.$message({
            message: "登录成功",
            type: "success",
          });
          if (that.$route.query.redirect) {
            that.$router.push(that.$route.query.redirect);
          } else {
            that.$router.push("/");
          }
        } else {
          // 登录成功提示
          this.$message({
            message: "账号或密码错误",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
