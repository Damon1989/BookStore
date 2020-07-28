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
      <el-table-column prop="name" label="Name" width="180"></el-table-column>
      <el-table-column prop="type" label="Type" width="180"></el-table-column>
      <el-table-column prop="publishDate" label="Publish date"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="creationTime" label="Creation Time"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button @click="viewSingle(scope.row)" type="text" size="small">查看</el-button> -->
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

    <el-dialog title="图书" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" :label-width="formLabelWidth">
          <el-date-picker type="date" v-model="form.publishDate" autocomplete="off"></el-date-picker>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newBook">确 定</el-button>
      </div>
    </el-dialog>
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
      showOperate:false,
      form: {
        name: "",
        price: 0,
        id: "",
      },
    };
  },
  methods: {
    search() {
      var skipCount = (this.currentPage - 1) * this.pageSize;
      this.$axios
        .get(
          "/api/app/book?SkipCount=" +
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
        this.$axios.post("/api/app/book", this.form).then((response) => {
          that.dialogFormVisible = false;
          that.search();
        });
      } else {
        this.$axios
          .put("/api/app/book/" + this.form.id, this.form)
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
      this.$axios.get("/api/app/book/" + id).then(function (result) {
        console.log(result);
        that.form = result.data;
        that.dialogFormVisible = true;
      });
    },
    deleteSingle(id) {
      console.log(id);
      var that = this;
      this.$axios.delete("/api/app/book/" + id).then(function (result) {
        console.log(result);
        that.currentPage = 1;
        that.search();
      });
    },
  },
  mounted() {
    this.search();
  },
};
</script>
