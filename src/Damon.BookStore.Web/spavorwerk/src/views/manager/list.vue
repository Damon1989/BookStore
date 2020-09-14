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
        <el-select size="medium" v-model="listQuery.district"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in districtList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
        </el-col>
    </el-row>

<el-row>
      <el-col :span="2"  class="filtertext">
            事业部：
      </el-col>
      <el-col :span="8" >
        <el-select size="medium" v-model="listQuery.division"    class="filter-item filtercontrol">
              <el-option v-for="item in divisionList" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-col>
      <el-col :span="3">

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="2" class="filtertext">
        <el-button size="medium" type="success" icon="el-icon-plus">
           <router-link :to="'/manager/add?division='+listQuery.division">
            新  建
          </router-link>
          </el-button>
        <el-button size="medium" type="success" icon="el-icon-plus">导  入</el-button>
      </el-col>
      <el-col :span="4" :offset="12" class="filtertext">
        <el-button size="medium" type="success" @click="search">查  询</el-button>
        <el-button size="medium" @click=reset>重  置</el-button>
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
          <span>{{ row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column label="城市"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区/县"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.area }}</span>
        </template>
      </el-table-column>
            <el-table-column label="负责人"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.manager.realName }}</span>
        </template>
      </el-table-column>
       <el-table-column label="工号"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.manager.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.createdTime | parseDateTime('{y}-{m}-{d} {h}:{i}')  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/manager/edit/'+scope.row.id">
            <el-link type="primary" size="small" >
              编辑
            </el-link>
          </router-link>
          <el-popconfirm
            title="确定要删除负责人信息吗？" @onConfirm="deleteManager(scope.row.id)">
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
import { getDivisions, getProvinceList, getCityList, getDistrictList,getSpecialCities } from '@/api/basedata';
import { getZoneManagerList,RemoveDistrictManager } from '@/api/manager';

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
    search(){
      this.listQuery.page=0;
      this.getList();
    },
    reset(){
      this.listQuery= {
        province: '',
        city: '',
        district: '',
        division: 'TM',
        page: 0,
        limit: 5,
      }
      this.search();
    },
    getList() {
      var queryModel={
        pageIndex:this.listQuery.page,
        pageSize:this.listQuery.limit,
        division:this.listQuery.division,
      };
      getZoneManagerList(queryModel).then((res) => {
        if(res.success){
          var result=res.result.data;
          result.forEach(item=>{
            var names= item.zone.name.split(',');
            if(names.length==1){
              item.province=names[0];
            }
            if(names.length==2){
              item.province=names[0];
              item.city=names[1];
            }
            if(names.length==3){
              item.province=names[0];
              item.city=names[1];
              item.area=names[2];
            }
          })
          this.list=res.result.data;
          this.total=res.result.totalCount;
          console.log(this.total);
        }
      });
    },
    deleteManager(id) {
      RemoveDistrictManager(id).then(res=>{
        if(res.success){
          this.$message('删除区域负责人成功');
          this.getList();
        }
      })
    },
    provinceSelect(){
      this.listQuery.city='';
      this.listQuery.district='';
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
      this.listQuery.district='';
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
