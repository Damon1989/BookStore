<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
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
        <el-select size="medium" v-model="listQuery.area"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="2"  class="filtertext">
            事业部：
      </el-col>
      <el-col :span="8" >
        <el-select size="medium" v-model="listQuery.enterprise"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in enterpriseList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        <i class="el-icon-warning icolor"></i> <span class="tipsstyle">事业部必选</span>
      </el-col>
      <el-col :span="3">

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="2" class="filtertext">
        <el-button size="medium" type="success" icon="el-icon-plus">新  建</el-button>
        <el-button size="medium" type="success" icon="el-icon-plus">导  入</el-button>
      </el-col>
      <el-col :span="4" :offset="12" class="filtertext">
        <el-button size="medium" type="success">查  询</el-button>
        <el-button size="medium">重  置</el-button>
      </el-col>
    </el-row>
<el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="filtertext"
    >
      <el-table-column label="省/直辖市/自治区"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.branchCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="城市"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区/县"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.jobNum }}</span>
        </template>
      </el-table-column>
            <el-table-column label="负责人"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="工号"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
                  <el-table-column label="备注"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
                 <el-table-column label="创建日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/leader/edit/'+scope.row.id">
            <el-link type="primary" size="small" >
              编辑
            </el-link>
          </router-link>
          <el-popconfirm
            title="确定要删除负责人信息吗？" @onConfirm="deleteLeader">
            <el-link size="medium" slot="reference" type="primary" >删除</el-link>
          </el-popconfirm>
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
import { getEnterprises, getProvinceList, getCityList, getAreaList } from '@/api/basedata';
import { getList } from '@/api/adviser';

export default {
  name: 'list',
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      enterpriseList: [],
      list: null,
      listLoading: false,
      listQuery: {
        province: '',
        city: '',
        area: '',
        name: '',
        jobnum: '',
        phone: '',
        enterprise: '美善品',
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
      getEnterprises().then((result) => {
        this.enterpriseList = result;
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

      getList().then((res) => {
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
      getAreaList(this.listQuery.city).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.areaList = data;
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
