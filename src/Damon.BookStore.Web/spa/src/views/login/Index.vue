<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="4"  :offset="20">
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
            <el-form :model="form" label-width="100px">
              <el-form-item :label="$t('lang.username')">
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%" @click="submit">提交</el-button>
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
    };
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
      var that = this;
      this.$store.dispatch("user/login", this.form).then((res) => {
        if (res.access_token !== undefined) {
          // 登录成功提示
          this.$message({
            message: "登录成功",
            type: "success",
          });
          that.$store.dispatch("user/getInfo").then(({ roles }) => {
            that.$store
              .dispatch("permission/generateRoutes", roles)
              .then((accessRoutes) => {
                router.addRoutes(accessRoutes);
                var urlObj = {
                  path: that.redirect || "/",
                  query: that.otherQuery,
                };

                that.$router.push(urlObj);
              });
          });

          // if (that.$route.query.redirect) {
          //   that.$router.push(that.$route.query.redirect)
          // } else {
          //   that.$router.push('/')
          // }
        } else {
          // 登录成功提示
          this.$message({
            message: "账号或密码错误",
            type: "warning",
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
      resetRouter(lang)
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
