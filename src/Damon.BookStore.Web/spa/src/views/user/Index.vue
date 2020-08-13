 <template>
  <div>
    <el-row :gutter="20">
      <el-col :span="1" :offset="18">
        <el-button @click="getList">查询</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button @click="showNewUser">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userName" label="UserName"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="phoneNumber" label="PhoneNumber"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSingle(scope.row.id)">编辑</el-button>
          <!-- <el-button @click.native.prevent="deleteSingle(scope.row.id)" type="text" size="small">移除</el-button> -->
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
    <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户信息" name="first">
            <el-form-item label="用户名称" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓" :label-width="formLabelWidth">
              <el-input v-model="form.surname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色" name="second">
             <el-checkbox-group size="small" v-model="form.roleNames" >
              <el-checkbox :label="item" border v-for="(item,index) in roleNameList" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

  <script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getUserList, getUser, getUserRoles,addUser,editUser,deleteUser } from "@/api/user";
import { getRoleList } from "@/api/role";
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
        id: "",
        userName: "",
        name: "",
        surname: "",
        password: "",
        email: "",
        phoneNumber: "",
        twoFactorEnabled: false,
        lockoutEnabled: false,
        roleNames: [],
        concurrencyStamp: "",
      },
      roleNameList: [],
      activeName: "first",
    };
  },
  methods: {
    getList() {
      var skipCount =
        (this.listQuery.currentPage - 1) * this.listQuery.pageSize;
      getUserList({ skipCount: skipCount, pageSize: this.listQuery.pageSize }).then(
        (res) => {
          this.tableData = res.items;
          this.total = res.totalCount;
        }
      );
    },

    showNewUser() {
      this.dialogFormVisible = true;
      this.new = true;
      this.activeName="first";
    },
    getRoles() {
      var that = this;
      getRoleList({ skipCount: 0, pageSize: 1000 })
        .then((res) => {
          var roles = new Array();
          res.items.forEach((item) => {
            roles.push(item.name);
          });
          that.roleNameList = roles;
        });
    },
    newUser() {
      var that = this;
      if (this.new) {
        addUser(this.form).then(() => {
          that.dialogFormVisible = false;
          that.getList();
        });
      } else {
          editUser(this.form)
          .then(() => {
            that.dialogFormVisible = false;
            that.getList();
          });
      }
    },
    getUser(id) {
      var that = this;
      getUser(id).then((res) => {
        var data=res;
        that.form.id=data.id;
        that.form.userName=data.userName;
        that.form.name=data.name;
        that.form.surname=data.surname;
        that.form.email=data.email;
        that.form.phoneNumber=data.phoneNumber;
        that.form.concurrencyStamp=data.concurrencyStamp;
      });
    },
    getUserRole(id) {
      var that = this;
      getUserRoles(id).then((res) => {
        var roles = new Array();
        res.items.forEach((item) => {
          roles.push(item.name);
        });
        that.form.roleNames = roles;
      });
    },
    editSingle(id) {
      this.activeName="first";
      this.new = false;
      this.dialogFormVisible = true;
      this.getUser(id);
      this.getUserRole(id);
    },
    deleteSingle(id) {
      var that = this;
      deleteUser(id).then(function () {
        that.listQuery.currentPage = 1;
        that.getList();
      });
    },
  },
  created() {
    this.getList();
    this.getRoles();
  },
};
</script>
