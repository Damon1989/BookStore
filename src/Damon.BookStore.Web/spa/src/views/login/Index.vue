<template>
  <div>
    <el-container>
      <el-main>
        <el-row style="margin:200px">
          <el-col :span="6" :offset="8">
            <el-form :model="form" label-width="100px">
              <el-form-item label="用户名">
                <el-input v-model="form.userNameOrEmailAddress" />
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
export default {
  name: 'Login',
  data() {
    return {
      // 表单名
      form: {
        userNameOrEmailAddress: '',
        password: '',
        rememberMe: true
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    submit() {
      var that = this
      this.$store.dispatch('user/login', this.form).then((res) => {
        if (res.access_token !== undefined) {
          // 登录成功提示
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          var urlObj = {
            path: this.redirect || '/',
            query: this.otherQuery
          }
          console.log(urlObj)
          this.$router.push(urlObj)
          // if (that.$route.query.redirect) {
          //   that.$router.push(that.$route.query.redirect)
          // } else {
          //   that.$router.push('/')
          // }
        } else {
          // 登录成功提示
          this.$message({
            message: '账号或密码错误',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
