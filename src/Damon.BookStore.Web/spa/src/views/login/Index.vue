<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="4" :offset="20">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{$t('lang.languageswitching')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="toggleLang('zh')"
                  :disabled="$i18n.locale == 'zh'"
                >中文</el-dropdown-item>
                <el-dropdown-item
                  @click.native="toggleLang('en')"
                  :disabled="$i18n.locale == 'en'"
                >English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
        <el-row style="margin:200px">
          <el-col :span="6" :offset="8">
            <el-form :model="form" label-width="100px" :rules="rules.login" :ref="formName">
              <el-form-item prop="username">
                <el-input v-model="form.username" prefix-icon="el-icon-user-solid" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" />
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="form.rememberMe">{{$t('lang.form.login.rememberMe')}}</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="submit()"
                >{{$t('lang.form.login.login')}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import router, { resetRouter } from "@/router";

import rules from '@/utils/validate'

export default {
  name: "Login",
  data() {
    return {
      // 表单名
      form: {
        username: "",
        password: "",
        rememberMe: true,
      },
      redirect: undefined,
      otherQuery: {},
      formName:'loginForm'
    };
  },
  computed: {
      rules() {
          return rules(this.$i18n)
      }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    submit() {
      // var that = this;
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login", this.form).then((res) => {
            if (res.access_token !== undefined) {
              // 登录成功提示
              this.$message({
                message: "登录成功",
                type: "success",
              });
              this.$store.dispatch("user/getInfo").then(({ roles }) => {
                this.$store
                  .dispatch("permission/generateRoutes", roles)
                  .then((accessRoutes) => {
                    router.addRoutes(accessRoutes);
                    var urlObj = {
                      path: this.redirect || "/",
                      query: this.otherQuery,
                    };

                    this.$router.push(urlObj);
                  });
              });
            } else {
              // 登录成功提示
              this.$message({
                message: "账号或密码错误",
                type: "warning",
              });
            }
          });
        }
      });
    },
    toggleLang(lang) {
      if (lang === "zh") {
        localStorage.setItem("locale", lang);
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "切换为中文！",
          type: "success",
        });
      } else if (lang === "en") {
        localStorage.setItem("locale", lang);
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "Switch to English!",
          type: "success",
        });
      }
      resetRouter(lang);
    //   console.log(1);
    //   console.log(this.formName);
    //   this.$refs[this.formName].resetFields();
    //   console.log(2);
    },
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
