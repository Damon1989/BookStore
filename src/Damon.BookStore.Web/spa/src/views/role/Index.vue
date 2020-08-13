 <template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1" :offset="18">
        <el-button @click="getList">查询</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button @click="showNewRole">新增</el-button>
      </el-col>
        <el-checkbox-group >
    <el-checkbox label="复选框A"></el-checkbox>
    <el-checkbox label="复选框B"></el-checkbox>
    <el-checkbox label="复选框C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    ></pagination>

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isDefault" style="float:left"></el-checkbox>
        </el-form-item>
        <el-form-item label="公开" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isPublic" style="float:left"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="权限管理" :visible.sync="dialogRolePermissionVisible">
      <el-button type="primary" style="float:right" @click="saveRolePermission">保存</el-button>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane :label="item.displayName" v-for="(item,index) in tabGroups" :key="index">
          <el-tree
            :data="item.permissions"
            :props="defaultProps"
            node-key="name"
            show-checkbox
            :default-checked-keys="permissionCheckedKeys"
            @check-change="treeNodeCheckChange"
          ></el-tree>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

  <script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  getRoleList,
  getRole,
  addRole,
  editRole,
  deleteRole,
  getRolePermission,
  addRolePermission,
} from "@/api/role";
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      total: 0,

      listQuery: {
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",

      new: true,
      form: {
        name: "",
        id: "",
        isDefault: false,
        isPublic: false,
      },

      dialogRolePermissionVisible: false,
      tabPosition: "left",
      tabGroups: [],
      defaultProps: {
        children: "permissions",
        label: "displayName",
      },
      permissionCheckedKeys: [],
      editRole: "",
    };
  },
  methods: {
    getList() {
      var skipCount =
        (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      getRoleList({ skipCount: skipCount, pageSize: this.listQuery.pageSize }).then(
        (response) => {
          this.tableData = response.items;
          this.total = response.totalCount;
        }
      );
    },
    getRolePermission(role) {
      var that = this;
      getRolePermission(role).then((res) => {
        var groups = res.groups;
        that.tabGroups = groups;
        var checkedKeys = new Array();
        groups.forEach((element) => {
          element.permissions.forEach((p) => {
            if (p.isGranted) {
              checkedKeys.push(p.name);
            }
          });
        });
        that.permissionCheckedKeys = checkedKeys;
      });
    },
    showNewRole() {
      this.dialogFormVisible = true;
      this.new = true;
      this.form = {
        name: "",
        id: "",
        isDefault: false,
        isPublic: false,
      };
    },
    newRole() {
      var that = this;
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
      var that = this;
      getRole(id).then(function (res) {
        that.form = res;
        that.dialogFormVisible = true;
      });
    },
    deleteSingle(data) {
      var that = this;
      if (data.name == "admin") {
        this.$message({
          message: '管理员不能删除',
          type: 'warning'
        });
      } else {
        deleteRole(data.id).then(function () {
          that.listQuery.currentPage = 1;
          that.getList();
        });
      }
    },
    treeNodeCheckChange(data, checked) {
      var that = this;
      if (checked) {
        that.permissionCheckedKeys.push(data.name);
      } else {
        that.permissionCheckedKeys.pop(data.name);
      }
      that.tabGroups.forEach((group) => {
        group.permissions.forEach((p) => {
          if (that.permissionCheckedKeys.includes(p.name)) {
            p.isGranted = true;
          } else {
            p.isGranted = false;
          }
        });
      });
    },
    saveRolePermission() {
      var that = this;
      var permissions = new Array();
      that.tabGroups.forEach((e) => {
        e.permissions.forEach((p) => {
          permissions.push({
            name: p.name,
            isGranted: p.isGranted,
          });
        });
      });
      var submitData = {
        Permissions: permissions,
      };
      addRolePermission(that.editRole, submitData).then(() => {
        this.$message({
          message: "保存成功",
          type: "success",
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
  mounted() {
    this.getList();
  },
};
</script>
