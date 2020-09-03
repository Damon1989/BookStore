/* eslint-disable no-param-reassign */
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="1" :offset="20">
        <el-button @click="getList" size="medium">查询</el-button>
      </el-col>
      <el-col :span="1" >
        <el-button @click="showNewUser" size="medium">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userName" label="UserName" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="phoneNumber" label="PhoneNumber" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
          @click="editSingle(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small"
          @click="showUserPermissionDialog(scope.row.id)">权限</el-button>

        </template>
      </el-table-column>
    </el-table>
    <d-pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
      <el-form :model="form" :ref="formName" :rules="rules.user">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户信息" name="first">
            <el-form-item label="账号" :label-width="formLabelWidth" prop="userName">
              <el-input v-model="form.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓" :label-width="formLabelWidth">
              <el-input v-model="form.surname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" autocomplete="off" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色" name="second">
            <el-checkbox-group v-model="form.roleNames" size="small">
              <el-checkbox v-for="(item,index) in roleNameList" :key="index" :label="item" border />
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newUser()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="权限管理" :visible.sync="dialogUserPermissionVisible">
      <el-button type="primary" style="float:right" @click="saveUserPermission">保存</el-button>
      <el-tabs :tab-position="tabPosition" v-model="tabFirst" style="height: 400px;">
        <el-tab-pane
          v-for="(item,index) in tabGroups"
          :key="index"
          :name="item.name"
          :label="item.displayName"
        >
          <el-tree
            :data="item.permissions"
            :props="defaultProps"
            node-key="name"
            show-checkbox
            default-expand-all
            ref="tree"
            :default-checked-keys="permissionCheckedKeys"
            @check-change="treeNodeCheckChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  getUser,
  getUserRoles,
  addUser,
  editUser,
  deleteUser,
  getUserPermission,
  addUserPermission,
} from '@/api/user';
import { getRoleList } from '@/api/role';
import rules from '@/utils/validate';

export default {
  name: 'UserData',
  data() {
    return {
      tableData: [],
      total: 0,

      listQuery: {
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',

      new: true,
      form: {
        id: '',
        userName: '',
        name: '',
        surname: '',
        password: '',
        email: '',
        phoneNumber: '',
        twoFactorEnabled: false,
        lockoutEnabled: false,
        roleNames: [],
        concurrencyStamp: '',
      },
      roleNameList: [],
      activeName: 'first',
      formName: 'userForm',
      userId: '',
      dialogUserPermissionVisible: false,
      permissionCheckedKeys: [],
      tabPosition: 'left',
      tabGroups: [],
      tabFirst: '',
      defaultProps: {
        children: 'permissions',
        label: 'displayName',
      },
    };
  },
  computed: {
    rules() {
      return rules(this.$i18n);
    },
  },
  created() {
    this.getList();
    this.getRoles();
  },
  methods: {
    getList() {
      const skipCount =
        (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      getUserList({
        skipCount,
        pageSize: this.listQuery.pageSize,
      }).then((res) => {
        this.tableData = res.items;
        this.total = res.totalCount;
      });
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs[this.formName].resetFields();
      });
    },
    showNewUser() {
      this.dialogFormVisible = true;
      this.new = true;
      this.activeName = 'first';
      this.resetForm();
      this.form = {
        id: '',
        userName: '',
        name: '',
        surname: '',
        password: '',
        email: '',
        phoneNumber: '',
        twoFactorEnabled: false,
        lockoutEnabled: false,
        roleNames: [],
        concurrencyStamp: '',
      };
    },
    getRoles() {
      const that = this;
      getRoleList({ skipCount: 0, pageSize: 1000 }).then((res) => {
        const roles = [];
        res.items.forEach((item) => {
          roles.push(item.name);
        });
        that.roleNameList = roles;
      });
    },
    newUser() {
      const that = this;
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          if (this.new) {
            addUser(that.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    getUser(id) {
      const that = this;
      getUser(id).then((res) => {
        const data = res;
        that.form.id = data.id;
        that.form.userName = data.userName;
        that.form.name = data.name;
        that.form.surname = data.surname;
        that.form.email = data.email;
        that.form.phoneNumber = data.phoneNumber;
        that.form.concurrencyStamp = data.concurrencyStamp;
      });
    },
    getUserRole(id) {
      const that = this;
      getUserRoles(id).then((res) => {
        const roles = [];
        res.items.forEach((item) => {
          roles.push(item.name);
        });
        that.form.roleNames = roles;
      });
    },
    editSingle(id) {
      this.activeName = 'first';
      this.new = false;
      this.dialogFormVisible = true;
      this.resetForm();
      this.getUser(id);
      this.getUserRole(id);
    },
    deleteSingle(id) {
      const that = this;
      deleteUser(id).then(() => {
        that.listQuery.currentPage = 1;
        that.getList();
      });
    },
    getUserPermission(userId) {
      getUserPermission(userId).then((res) => {
        const groups = res.groups;
        this.tabFirst = groups[0].name;
        groups.forEach((group) => {
          group.permissions.forEach((permission) => {
            if (
              permission.isGranted &&
              permission.grantedProviders.filter(c => c.providerName !== 'U')
                .length > 0
            ) {
              // eslint-disable-next-line no-param-reassign
              permission.disabled = true;
            } else {
              // eslint-disable-next-line no-param-reassign
              permission.disabled = false;
            }
          });
        });

        // this.tabGroups = groups;

        // groups.forEach((element) => {
        //   element.permissions.forEach((p) => {
        //     if (p.isGranted) {
        //       checkedKeys.push(p.name);
        //     }
        //   });
        // });

        const checkedKeys = [];
        const newGroups = [];
        groups.forEach((element) => {
          const groupPermissions = [];
          element.permissions.forEach((p) => {
            if (p.isGranted) {
              checkedKeys.push(p.name);
            }
          });

          const firstPermissions = element.permissions.filter(
            c => c.parentName == null,
          );
          firstPermissions.forEach((e) => {
            const secondPermissions = element.permissions.filter(
              c => c.parentName === e.name,
            );
            groupPermissions.push({ ...e, permissions: secondPermissions });
          });

          newGroups.push({ ...element, permissions: groupPermissions });
        });
        this.tabGroups = newGroups;

        this.permissionCheckedKeys = checkedKeys;
      });
    },
    treeNodeCheckChange(data, checked) {
      if (checked) {
        this.permissionCheckedKeys.push(data.name);
      } else {
        this.permissionCheckedKeys.splice(
          this.permissionCheckedKeys.findIndex(item => item === data.name),
          1,
        );
      }
      this.tabGroups.forEach((group) => {
        group.permissions.forEach((first) => {
          if (this.permissionCheckedKeys.includes(first.name)) {
            // eslint-disable-next-line no-param-reassign
            first.isGranted = true;
          } else {
            // eslint-disable-next-line no-param-reassign
            first.isGranted = false;
          }
          first.permissions.forEach((second) => {
            if (this.permissionCheckedKeys.includes(second.name)) {
              // eslint-disable-next-line no-param-reassign
              second.isGranted = true;
            } else {
              // eslint-disable-next-line no-param-reassign
              second.isGranted = false;
            }
          });
        });
      });
    },
    saveUserPermission() {
      const permissions = [];
      this.tabGroups.forEach((e) => {
        e.permissions.forEach((first) => {
          if (!first.disabled) {
            permissions.push({
              name: first.name,
              isGranted: first.isGranted,
            });
          }

          first.permissions.forEach((second) => {
            if (!second.disabled) {
              permissions.push({
                name: second.name,
                isGranted: second.isGranted,
              });
            }
          });
        });
      });
      const submitData = {
        Permissions: permissions,
      };
      addUserPermission(this.userId, submitData).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success',
        });
        this.dialogUserPermissionVisible = false;
      });
    },
    showUserPermissionDialog(userId) {
      this.userId = userId;
      this.dialogUserPermissionVisible = true;
      this.getUserPermission(userId);
    },
  },
};
</script>
