 <template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1" :offset="18">
        <el-button @click="getList">查询</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button @click="showNewBook">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSingle(scope.row.id)">编辑</el-button>
          <el-button @click.native.prevent="deleteSingle(scope.row.id)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog title="角色管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newBook">确 定</el-button>
      </div>
    </el-dialog>
    <el-tree :data="treeData" :props="defaultProps" @node-click="treeNodeClick"></el-tree>
  </div>
</template>

  <script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      total: 0,
      hideonsiglepage: true,

      listQuery: {
        currentPage: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      new: true,
      showOperate: false,
      form: {
        name: "",
        id: "",
      },
      treeData: [],
      defaultProps: {
        children: "permissions",
        label: "displayName",
      },
    };
  },
  methods: {
    getList() {
      var skipCount = (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      this.$axios
        .get(
          "/api/identity/roles?SkipCount=" +
            skipCount +
            "&MaxResultCount=" +
            this.listQuery.pageSize
        )
        .then((response) => {
          this.tableData = response.data.items;
          this.total = response.data.totalCount;
        });
    },
    showNewBook() {
      this.dialogFormVisible = true;
      this.new = true;
    },
    newBook() {
      var that = this;
      if (this.new) {
        this.$axios.post("/api/identity/roles", this.form).then((response) => {
          that.dialogFormVisible = false;
          that.getList();
        });
      } else {
        this.$axios
          .put("/api/identity/roles/" + this.form.id, this.form)
          .then((response) => {
            that.dialogFormVisible = false;
            that.getList();
          });
      }
    },
    // viewSingle(row) {
    //   console.log(row);
    //   console.log(row.id);
    // },
    editSingle(id) {
      this.new = false;
      var that = this;
      this.$axios.get("/api/identity/roles/" + id).then(function (result) {
        console.log(result);
        that.form = result.data;
        that.dialogFormVisible = true;
      });
    },
    deleteSingle(id) {
      console.log(id);
      var that = this;
      this.$axios.delete("/api/identity/roles/" + id).then(function (result) {
        console.log(result);
        that.listQuery.currentPage = 1;
        that.getList();
      });
    },
    setTreeData() {
      var result = {
        entityDisplayName: "admin",
        groups: [
          {
            name: "AbpIdentity",
            displayName: "身份标识管理",
            permissions: [
              {
                name: "AbpIdentity.Roles",
                displayName: "角色管理",
                parentName: null,
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Roles.Create",
                displayName: "创建",
                parentName: "AbpIdentity.Roles",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Roles.Update",
                displayName: "编辑",
                parentName: "AbpIdentity.Roles",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Roles.Delete",
                displayName: "删除",
                parentName: "AbpIdentity.Roles",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Roles.ManagePermissions",
                displayName: "更改权限",
                parentName: "AbpIdentity.Roles",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Users",
                displayName: "用户管理",
                parentName: null,
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Users.Create",
                displayName: "创建",
                parentName: "AbpIdentity.Users",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Users.Update",
                displayName: "编辑",
                parentName: "AbpIdentity.Users",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Users.Delete",
                displayName: "删除",
                parentName: "AbpIdentity.Users",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpIdentity.Users.ManagePermissions",
                displayName: "更改权限",
                parentName: "AbpIdentity.Users",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
            ],
          },
          {
            name: "AbpTenantManagement",
            displayName: "租户管理",
            permissions: [
              {
                name: "AbpTenantManagement.Tenants",
                displayName: "租户管理",
                parentName: null,
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpTenantManagement.Tenants.Create",
                displayName: "创建",
                parentName: "AbpTenantManagement.Tenants",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpTenantManagement.Tenants.Update",
                displayName: "编辑",
                parentName: "AbpTenantManagement.Tenants",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpTenantManagement.Tenants.Delete",
                displayName: "删除",
                parentName: "AbpTenantManagement.Tenants",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpTenantManagement.Tenants.ManageFeatures",
                displayName: "管理功能",
                parentName: "AbpTenantManagement.Tenants",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
              {
                name: "AbpTenantManagement.Tenants.ManageConnectionStrings",
                displayName: "管理连接字符串",
                parentName: "AbpTenantManagement.Tenants",
                isGranted: true,
                allowedProviders: [],
                grantedProviders: [
                  {
                    providerName: "R",
                    providerKey: "admin",
                  },
                ],
              },
            ],
          },
          {
            name: "BookStore",
            displayName: "Book Store",
            permissions: [
              {
                name: "BookStore.Books",
                displayName: "Book Management",
                parentName: null,
                isGranted: false,
                allowedProviders: [],
                grantedProviders: [],
              },
              {
                name: "BookStore.Books.Create",
                displayName: "Creating new books",
                parentName: "BookStore.Books",
                isGranted: false,
                allowedProviders: [],
                grantedProviders: [],
              },
              {
                name: "BookStore.Books.Edit",
                displayName: "Editing the books",
                parentName: "BookStore.Books",
                isGranted: false,
                allowedProviders: [],
                grantedProviders: [],
              },
              {
                name: "BookStore.Books.Delete",
                displayName: "Deleting the books",
                parentName: "BookStore.Books",
                isGranted: false,
                allowedProviders: [],
                grantedProviders: [],
              },
            ],
          },
        ],
      };
      console.log(result.groups[0]);
      console.log(result.groups[0].permissions);
      this.treeData = result.groups;
    },
    treeNodeClick(data) {
      console.log(JSON.stringify(data));
    },
  },
  mounted() {
    this.getList();
    this.setTreeData();
  },
};
</script>
