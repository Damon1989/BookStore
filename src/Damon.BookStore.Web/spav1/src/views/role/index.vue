<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="1" :offset="20">
        <el-button @click="getList" size='medium'>查询</el-button>
      </el-col>
      <el-col :span="1" >
        <el-button @click="showNewRole" size="medium">新增</el-button>
        <!-- <d-button label="新增" perms="AbpIdentity.Roles.Create"></d-button>2 -->
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSingle(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="showRolePermissionDialog(scope.row.name)">权限</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteSingle(scope.row)">
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
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

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="默认" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isDefault" style="float:left" />
        </el-form-item>
        <el-form-item label="公开" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isPublic" style="float:left" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="权限管理" :visible.sync="dialogRolePermissionVisible">
      <el-button type="primary" style="float:right" @click="saveRolePermission">保存</el-button>
      <el-tabs :tab-position="tabPosition" v-model="tabFirst" style="height: 400px;">
        <el-tab-pane v-for="(item,index) in tabGroups" :key="index" :name="item.name" :label="item.displayName">
          <el-tree
            :data="item.permissions"
            :props="defaultProps"
            node-key="name"
            show-checkbox
            default-expand-all
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
  getRoleList,
  getRole,
  addRole,
  editRole,
  deleteRole,
  getRolePermission,
  addRolePermission,
} from '@/api/role';


export default {
  name: 'RoleData',
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
        name: '',
        id: '',
        isDefault: false,
        isPublic: false,
      },

      dialogRolePermissionVisible: false,
      tabPosition: 'left',
      tabFirst: '',
      tabGroups: [],
      defaultProps: {
        children: 'permissions',
        label: 'displayName',
      },
      permissionCheckedKeys: [],
      editRole: '',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const skipCount =
        (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      getRoleList({
        skipCount,
        pageSize: this.listQuery.pageSize,
      }).then((response) => {
        this.tableData = response.items;
        this.total = response.totalCount;
      });
    },
    getRolePermission(role) {
      const that = this;
      getRolePermission(role).then((res) => {
        const groups = res.groups;
        this.tabFirst = groups[0].name;
        const checkedKeys = new Array();
        const newGroups = new Array();

        groups.forEach((element) => {
          const groupPermissions = new Array();
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
              c => c.parentName == e.name,
            );
            groupPermissions.push({ ...e, permissions: secondPermissions });
          });

          newGroups.push({ ...element, permissions: groupPermissions });
        });
        that.tabGroups = newGroups;
        that.permissionCheckedKeys = checkedKeys;
      });
    },
    showNewRole() {
      this.dialogFormVisible = true;
      this.new = true;
      this.form = {
        name: '',
        id: '',
        isDefault: false,
        isPublic: false,
      };
    },
    newRole() {
      const that = this;
      if (this.new) {
        addRole(this.form).then(() => {
          that.dialogFormVisible = false;
          that.getList();
        });
      } else {
        editRole(this.form).then(() => {
          that.dialogFormVisible = false;
          that.getList();
        });
      }
    },
    editSingle(id) {
      this.new = false;
      const that = this;
      getRole(id).then((res) => {
        that.form = res;
        that.dialogFormVisible = true;
      });
    },
    deleteSingle(data) {
      const that = this;
      if (data.name == 'admin') {
        this.$message({
          message: '管理员不能删除',
          type: 'warning',
        });
      } else {
        deleteRole(data.id).then(() => {
          that.listQuery.currentPage = 1;
          that.getList();
        });
      }
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
            first.isGranted = true;
          } else {
            first.isGranted = false;
          }
          first.permissions.forEach((second) => {
            if (this.permissionCheckedKeys.includes(second.name)) {
              second.isGranted = true;
            } else {
              second.isGranted = false;
            }
          });
        });
      });
    },
    saveRolePermission() {
      const that = this;
      const permissions = new Array();
      that.tabGroups.forEach((e) => {
        e.permissions.forEach((first) => {
          permissions.push({
            name: first.name,
            isGranted: first.isGranted,
          });
          first.permissions.forEach((second) => {
            permissions.push({
              name: second.name,
              isGranted: second.isGranted,
            });
          });
        });
      });
      const submitData = {
        Permissions: permissions,
      };
      addRolePermission(that.editRole, submitData).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success',
        });
        that.dialogRolePermissionVisible = false;
      });
    },
    showRolePermissionDialog(role) {
      this.editRole = role;
      this.dialogRolePermissionVisible = true;
      this.getRolePermission(role);
    },
  },
};
</script>
