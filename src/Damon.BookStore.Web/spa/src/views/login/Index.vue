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
import { setAccessToken, setTokenType } from "@/utils/auth";

export default {
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
      const formData = new FormData();
      formData.append("username", this.form.userNameOrEmailAddress);
      formData.append("password", this.form.password);
      formData.append("grant_type", "password");
      formData.append("scope", "BookStore");
      formData.append("client_id", "BookStore_App");
      formData.append("client_secret", "1q2w3e*");
      this.$axios
        .post("/oauth/connect/token", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.access_token != undefined) {
            setAccessToken(res.data.access_token);
            setTokenType(res.data.token_type);
            // that.$cookies.set("access_token", res.data.access_token);
            // that.$cookies.set("token_type", res.data.token_type);
            //登录成功提示
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
            this.$message({
              message: "登录失败! " + res.data.error_description,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "登录异常",
            type: "error",
          });
        });
    },
  },
};
</script>
