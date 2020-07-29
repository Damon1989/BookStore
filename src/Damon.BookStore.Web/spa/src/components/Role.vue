 <template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1" :offset="18">
        <el-button @click="search">查询</el-button>
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
    <el-row :gutter="20">
      <el-col :span="5" :offset="15">
        <div class="block">
          <el-pagination
            layout="prev, pager, next,sizes,total"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :current-page="currentPage"
            @prev-click="prevClick"
            @next-click="nextClick"
            @current-change="currentChange"
            @size-change="sizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

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
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      hideonsiglepage: true,
      currentPage: 1,
      pageSize: 10,
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
    search() {
      var skipCount = (this.currentPage - 1) * this.pageSize;
      this.$axios
        .get(
          "/api/identity/roles?SkipCount=" +
            skipCount +
            "&MaxResultCount=" +
            this.pageSize
        )
        .then((response) => {
          this.tableData = response.data.items;
          this.total = response.data.totalCount;
        });
    },
    prevClick() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
      }
      this.search();
    },
    nextClick() {
      console.log("next");
      this.currentPage = this.currentPage + 1;
      this.search();
    },
    currentChange(val) {
      this.currentPage = val;
      this.search();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.search();
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
          that.search();
        });
      } else {
        this.$axios
          .put("/api/identity/roles/" + this.form.id, this.form)
          .then((response) => {
            that.dialogFormVisible = false;
            that.search();
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
        that.currentPage = 1;
        that.search();
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
    // this.search();
    this.setTreeData();
  },
};
</script>
