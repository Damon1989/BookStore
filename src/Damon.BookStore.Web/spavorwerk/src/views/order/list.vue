<template>
  <div class="app-container">
    <div class="filter-container">
          <el-row>
      <el-col :span="2"  class="filtertext">
            事业部：
      </el-col>
      <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.division"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in divisionList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-col>
      <el-col :span="2" class="filtertext">
            来源：
      </el-col>
      <el-col :span="6">
        <el-select size="medium" v-model="listQuery.source"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in sourceList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
              <el-col :span="2" class="filtertext">
            状态：
      </el-col>
      <el-col :span="6">
        <el-select size="medium" v-model="listQuery.status"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in statusList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
    </el-row>
      <el-row v-show="showQueryDetail">
        <el-col :span="2"  class="filtertext">
            省：
        </el-col>
        <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.province" @change="provinceSelect"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
         <el-col :span="2" class="filtertext">
            市：
        </el-col>
        <el-col :span="6">
        <el-select size="medium" v-model="listQuery.city"  clearable   @change="citySelect" class="filter-item filtercontrol">
              <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
        <el-col :span="2" class="filtertext">
            区：
        </el-col>
        <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.district"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in districtList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
    </el-row>
    <el-row v-show="showQueryDetail">
      <el-col :span="2"  class="filtertext">
            经理：
      </el-col>
      <el-col :span="6" >
        <el-input size="medium" v-model="listQuery.managerJobNum" placeholder="请输入经理工号" class="filter-item filtercontrol"></el-input>
      </el-col>
       <el-col :span="2"  class="filtertext">
            顾问：
      </el-col>
      <el-col :span="6" >
        <el-input size="medium" v-model="listQuery.advisorJobNum" placeholder="请输入顾问工号" class="filter-item filtercontrol"></el-input>
      </el-col>
       <el-col :span="2"  class="filtertext">
            顾客：
      </el-col>
      <el-col :span="6" >
        <el-input size="medium" v-model="listQuery.customerName" placeholder="请输入顾客姓名" class="filter-item filtercontrol"></el-input>
      </el-col>
    </el-row>
    <el-row v-show="showQueryDetail">
      <el-col :span="2"  class="filtertext">
            创建：
      </el-col>
      <el-col :span="6" >
        <el-date-picker  size="medium"
      v-model="listQuery.createdate"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期" >
    </el-date-picker>
      </el-col>
       <el-col :span="6"  class="filtertext">
            <el-checkbox v-model="listQuery.checkedTransactionRecord">仅显示成交记录</el-checkbox>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="6"  class="filtertext">
        <el-button size="medium" type="success" >预约单导入</el-button>
        <el-button size="medium" type="success" >导出Excel</el-button>
      </el-col>
      <el-col :span="8" class="filtertext">
        <span>排序规则</span>
         <el-radio-group v-model="sortrule">
          <el-radio :label="1">创建时间</el-radio>
          <el-radio :label="2">地址</el-radio>
          <el-radio :label="3">来源</el-radio>
          <el-radio :label="4">响应时间</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="4" :offset="2" class="filtertext">
         <el-link type="primary" @click="showQueryDetail=!showQueryDetail">展开</el-link>
        <el-button size="medium" type="success">查  询</el-button>
        <el-button size="medium">重  置</el-button>
      </el-col>
    </el-row>
       <el-alert
      title="该事业部预约服务总计完成 400 单，处理中 52 单"
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
    >
      <el-table-column label="单号"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.branchCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.jobNum }}</span>
        </template>
      </el-table-column>
            <el-table-column label="地址"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="门店"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.phoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾客"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经理"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾问"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
     <el-table-column label="分配日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
            <el-table-column label="接单日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
            <el-table-column label="完成日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/order/detail/'+scope.row.id">
            <el-link type="primary" size="small" >
              详情
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
import { getDivisions, getProvinceList, getCityList, getDistrictList,getSourceList,getOrderStatusList } from '@/api/basedata';
import { getList } from '@/api/advisor';

export default {
  name: 'list',
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      divisionList: [],
      sourceList:[],
      stutusList:[],
      list: null,
      listLoading: false,
      showQueryDetail:false,
      listQuery: {
        province: '',
        city: '',
        district: '',
        managerJobNum: '',
        advisorJobNum: '',
        customerName: '',
        division: 'TM',
        source:'全部',
        status:'全部',
        createdate:'',
        checkedTransactionRecord:true,
        sortrule:'1',
        page: 1,
        limit: 5,
      },
      total: 20,
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
      getProvinceList().then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.provinceList = data;
        }
      });

      getSourceList().then(res=>{
        this.sourceList=res;
      });

      getOrderStatusList().then(res=>{
        this.statusList=res;
      })
      var queryModel={
        pageIndex:this.listQuery.page,
        pageSize:this.listQuery.limit,
        division:this.listQuery.division,

      };

      getList(queryModel).then((res) => {
        this.total = 400;
        this.list = res.slice(0, this.listQuery.limit);
      });
    },
    deleteLeader() {

    },
    provinceSelect(){
      getCityList(this.listQuery.province).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.cityList = data;
        }
      });
    },
    citySelect(){
      getDistrictList(this.listQuery.city).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.districtList = data;
        }
      });
    }
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

.icolor{
  color: green;
}
.tipsstyle{
  color: darkgray;
  font-size: 13px;
}
</style>
