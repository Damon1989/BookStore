<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2" :offset="2" class="filtertext">
            事业部：
        </el-col>
        <el-col :span="4" >
        <el-select size="medium" v-model="listQuery.division"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in divisionList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
         <el-col :span="2" class="filtertext">
            分公司：
        </el-col>
        <el-col :span="4">
        <el-select size="medium" v-model="listQuery.branchCompany"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in branchCompanies" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
        <el-col :span="2" class="filtertext">
            职位：
        </el-col>
        <el-col :span="4" >
        <el-select size="medium" v-model="listQuery.title"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in positionList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" :offset="2" class="filtertext">
            姓名：
      </el-col>
      <el-col :span="4" >
        <el-input size="medium" v-model="listQuery.realName" placeholder="请输入" class="filter-item filtercontrol"></el-input>
      </el-col>
       <el-col :span="2"  class="filtertext">
            工号：
      </el-col>
      <el-col :span="4" >
        <el-input size="medium" v-model="listQuery.jobNum" placeholder="请输入" class="filter-item filtercontrol"></el-input>
      </el-col>
       <el-col :span="2"  class="filtertext">
            手机：
      </el-col>
      <el-col :span="4" >
        <el-input size="medium" v-model="listQuery.phoneNumber" placeholder="请输入" class="filter-item filtercontrol"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="2" class="filtertext">
        <el-button size="medium" type="success">导入</el-button>
      </el-col>
      <el-col :span="4" :offset="12" class="filtertext">
        <el-button size="medium" type="success" @click="getList()">查  询</el-button>
        <el-button size="medium" @click="reset">重  置</el-button>
      </el-col>
    </el-row>
      <el-alert
      title="该事业部总计SA 400 名,TL 52 名, BM 21 名, AM 6 名"
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
      <el-table-column label="分公司"   align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.branchCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾问编号"   align="center" width="120" >
        <template slot-scope="{row}">
          <span>{{ row.advisorId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号"  align="center" width="120" >
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
            <el-table-column label="姓名"  align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.realName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="手机"  align="center" width="120" >
        <template slot-scope="{row}">
          <span>{{ row.phoneNumber }}</span>
        </template>
      </el-table-column>
                  <el-table-column label="职位"  align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
                 <el-table-column label="等级"  align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.grade }} 星</span>
        </template>
      </el-table-column>
                   <el-table-column label="注册地址"  align="center" min-width="210">
        <template slot-scope="{row}">
          <span>{{ row.registerAddress }}</span>
        </template>
      </el-table-column>
                 <el-table-column label="入职时间"  align="center" width="180" >
        <template slot-scope="{row}">
          <span>{{ row.entryDate | parseDateTime('{y}-{m}-{d} ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/advisor/edit/'+scope.row.id">
            <el-link type="primary" size="small" >
              编辑
            </el-link>
          </router-link>
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
import { getDivisions, getBranchCompanies, getPositionList } from '@/api/basedata';
import { getList } from '@/api/advisor';
import { parseTime } from '@/utils/index';


export default {
  name: 'list',
  data() {
    return {
      divisionList: [],
      branchCompanies: [],
      positionList: [],
      list: null,
      listLoading: false,
      listQuery: {
        division: 'TM',
        branchCompany: '',
        title: '',
        realName: '',
        jobnum: '',
        phoneNumber: '',
        page: 1,
        limit: 5,
      },
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {

      getDivisions().then((result) => {
        this.divisionList = result;
      });
      getBranchCompanies().then((res) => {
        this.branchCompanies = res;
      });
      getPositionList().then((res) => {
        this.positionList = res;
      });
      var queryModel={
        pageIndex:this.listQuery.page,
        pageSize:this.listQuery.limit,
        division:this.listQuery.division,
        title:this.listQuery.title,
        realName:this.listQuery.realName,
        phoneNumber:this.listQuery.phoneNumber
      };

      getList(queryModel).then((res) => {
        if(res.success){
          this.list=res.result.data;
          this.total=res.result.totalCount
        }
      });
    },

    reset(){
      this.listQuery={
        division: 'TM',
        branchCompany: '',
        title: '',
        realName: '',
        jobnum: '',
        phoneNumber: '',
        page: 1,
        limit: 5,
      }
    },

    headClass() {
      return 'background:rgba(227, 230, 230, 0.897);';
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

</style>
