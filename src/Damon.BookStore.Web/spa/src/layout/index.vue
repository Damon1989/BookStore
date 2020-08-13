<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{name}}</span>
        <el-button type="warning" @click="loginExit">退出</el-button>
      </el-header>

      <el-container>
        <sidebar class="sidebar-container" />
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航一
              </template>
              <el-menu-item index="1-2">
                <router-link to="/">首页</router-link>
              </el-menu-item>
              <el-menu-item index="1-1">
                <router-link to="/booklist">图书管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/role">角色</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/user">用户</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="height: 750px; border: 1px solid #eee">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { removeAccessToken } from "@/utils/auth";
import {  Sidebar } from "./components"
import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: { Sidebar },

  methods: {
    loginExit() {
      var that = this;
      this.$axios.get("/api/account/logout").then(() => {
        this.$message({
          message: "退出成功",
          type: "success",
        });
        removeAccessToken();
        that.$router.push("/login");
      });
    }
  },
  computed:{
    ...mapGetters([
      "name"
    ])
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
