<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2" :offset="2" class="filtertext">
            源数据：
        </el-col>
        <el-col :span="4" >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary" icon="el-icon-upload2">上传并校验</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：.xls，.xlsx
              <el-link type="success" href="https://www.baidu.com">下载模板</el-link>
              </div>
          </el-upload>
        </el-col>
        <el-col :span="4" :offset="8" class="filtertext">
          <el-popconfirm
            title="确定要导入这些顾问信息吗？" @onConfirm="importData">
            <el-button size="medium" slot="reference" type="success" >开始导入</el-button>
          </el-popconfirm>
      </el-col>
    </el-row>

      <el-alert
      :title="validateMsg"
      type="warning"
      description=""
      show-icon :closable="false" class="filtertext">
    </el-alert>

<el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="filtertext"
      :header-cell-style="headClass"
    >
      <el-table-column label="事业部"   align="center" >
        <template slot-scope="{row}">
          <span>{{ row.enterprise }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾问编号"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
            <el-table-column label="姓名"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾问等级"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.grade }}</span>
        </template>
      </el-table-column>
                   <el-table-column label="注册地址"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.registerAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验结果" align="left"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <i v-if="row.valid" class="el-icon-success valid" ></i>
          <i v-if="!row.valid" class="el-icon-error invalid" ></i>
          <span>{{row.validMsg}}</span>
        </template>
      </el-table-column>
    </el-table>
       <d-pagination
     v-show="total>0"
     :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
       @pagination="getList" />
    </div>
    </div>
</template>

<script>
import { getImportList } from '@/api/advisor';

export default {
  name: 'import',
  data() {
    return {
      fileList: [],
      needValidTotal: 5,
      validTotal: 2,
      list: null,
      listLoading: false,
      listQuery: {
        name: '',
        jobnum: '',
        phoneNumber: '',
        page: 1,
        limit: 5,
      },
      total: 20,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    validateMsg() {
      return `总计 ${this.needValidTotal},有效 ${this.validTotal} 项`;
    },
  },
  methods: {
    getList() {
      getImportList().then((res) => {
        console.log(res);
        this.list = res.slice(0, this.listQuery.limit);
        this.total = 400;
      });
    },
    importData() {
      console.log(123);
    },
    headClass() {
      return 'background:rgba(227, 230, 230, 0.897);';
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style scoped>
.filtertext{
  text-align: right;
  margin-top: 6px;
}

.filtercontrol{
  width: 220px;
}

.valid {
color:green;
padding-left:20px
}
.invalid {
color:red;
padding-left:20px
}
</style>
