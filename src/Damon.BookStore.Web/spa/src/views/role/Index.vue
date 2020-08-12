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

    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane :label="item.displayName" v-for="(item,index) in tabGroups" :key="index">
        <el-tree
          :data="item.permissions"
          :props="defaultProps"
          node-key="name"
          show-checkbox
          :default-checked-keys="permissionCheckedKeys"
          @node-click="treeNodeClick"
        ></el-tree>
      </el-tab-pane>
    </el-tabs>
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
      tabPosition: "left",
      tabGroups: [],
      defaultProps: {
        children: "permissions",
        label: "displayName",
      },
      permissionCheckedKeys: [],
    };
  },
  methods: {
    getList() {
      var skipCount =
        (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
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
    getRolePermission(role) {
      if (!role) {
        role = "admin";
      }

      var that = this;
      var url =
        "/api/permission-management/permissions?providerName=R&providerKey=" +
        role;
      this.$axios.get(url).then((res) => {
        var groups = res.data.groups;
        console.log(groups);

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
    treeNodeClick(data) {
      console.log(data);
      console.log(data.isGranted);
      console.log(JSON.stringify(data));
      var select = JSON.parse(JSON.stringify(data));
      console.log(select);

      if(data.isGranted){
        this.permissionCheckedKeys.pop(data.name)
      }else{
        this.permissionCheckedKeys.push(data.name)
      }
      console.log(this.permissionCheckedKeys.length);
    },
  },
  mounted() {
    this.getList();
    this.getRolePermission();
  },
};
</script>
