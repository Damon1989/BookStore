<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2"  class="filtertext">
            省：
        </el-col>
        <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.province"  clearable @change="provinceSelect"  class="filter-item filtercontrol">
              <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
         <el-col :span="2" class="filtertext">
            市：
        </el-col>
        <el-col :span="6">
        <el-select size="medium" v-model="listQuery.city"  clearable @change="citySelect"   class="filter-item filtercontrol">
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
            门店名称：
        </el-col>
        <el-col :span="6">
          <el-input size="medium"  placeholder="请输入" v-model="listQuery.name" class="filter-item filtercontrol"></el-input>
        </el-col>
                <el-col :span="2" class="filtertext">
            经理：
        </el-col>
        <el-col :span="6">
          <el-input size="medium"  placeholder="请输入经理工号" class="filter-item filtercontrol"></el-input>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="18" class="filtertext">
        <el-button size="medium" type="success" @click="search()">查  询</el-button>
        <el-button size="medium" @click="reset()">重  置</el-button>
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
      <el-table-column label="编号"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.zoneName }}</span>
        </template>
      </el-table-column>
            <el-table-column label="经理"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="电话"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.contactPhone }}</span>
        </template>
      </el-table-column>
                  <el-table-column label="详细地址"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.contactAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/branch/edit/'+scope.row.id">
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
import { getDivisions, getProvinceList, getCityList, getDistrictList,getSpecialCities,getBranchCompanies } from '@/api/basedata';

export default {
  name: 'list',
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      divisionList: [],
      list: null,
      listLoading: false,
      listQuery: {
        province: '',
        city: '',
        district: '',
        name: '',
        division: 'TM',
        page: 1,
        limit: 5,
      },
      total: 0,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo(){
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
      this.getList();
    },
    getList() {
      var zoneCode='';
      if(this.listQuery.district!=''){
        zoneCode=this.listQuery.district;
      }else if(this.listQuery.city!=''){
        zoneCode=this.listQuery.city;
      }else if(this.listQuery.province!=''){
        zoneCode=this.listQuery.province;
      }
      var queryModel={
        pageIndex:this.listQuery.page,
        pageSize:this.listQuery.limit,
        division:this.listQuery.division,
        name:this.listQuery.name,
        zoneCode
      }
      getBranchCompanies(queryModel).then(res=>{
        console.log(res);
        if(res.success){
          var result=res.result.data;
          result.forEach(item => {
            if(item.zone!=undefined){
              item.zoneName=item.zone.districtName;
            }else{
              item.zoneName='';
            }
          });
          this.list=res.result.data;
          this.total=res.result.totalCount;
        }
      })
    },
    deleteLeader() {

    },
    search(){
      this.getList();
    },
    reset(){
      this.listQuery.page=1;
      this.listQuery.limit=5;
      this.listQuery.province='';
      this.listQuery.city='';
      this.listQuery.district='';
      this.listQuery.division='TM';
      this.listQuery.name='';
    },
    provinceSelect(){
      getCityList(this.listQuery.province).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.cityList = data;
          getSpecialCities().then(res=>{
            if(res.filter(c => c.id == this.listQuery.province).length==1){
                this.listQuery.city=this.listQuery.province;
                this.citySelect();
              }
          })
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
