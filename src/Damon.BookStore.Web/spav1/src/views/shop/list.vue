<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2"  class="filtertext">
            省：
        </el-col>
        <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.provice"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in proviceList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
         <el-col :span="2" class="filtertext">
            市：
        </el-col>
        <el-col :span="6">
        <el-select size="medium" v-model="listQuery.city"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in cityList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
        <el-col :span="2" class="filtertext">
            区：
        </el-col>
        <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.area"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in areaList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="2"  class="filtertext">
            事业部：
      </el-col>
      <el-col :span="6" >
        <el-select size="medium" v-model="listQuery.enterprise"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in enterpriseList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
        <el-col :span="2" class="filtertext">
            门店名称：
        </el-col>
        <el-col :span="6">
          <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
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
      <el-table-column label="编号"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.branchCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称"   align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在地区"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.jobNum }}</span>
        </template>
      </el-table-column>
            <el-table-column label="经理"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="电话"  align="center" >
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
                  <el-table-column label="详细地址"  align="center"  >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="60" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <router-link :to="'/shop/edit/'+scope.row.id">
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
import { getEnterprises, getProvinceList, getCityList, getAreaList } from '@/api/basedata';
import { getList } from '@/api/adviser';

export default {
  name: 'list',
  data() {
    return {
      proviceList: [],
      cityList: [],
      areaList: [],
      enterpriseList: [],
      list: null,
      listLoading: false,
      listQuery: {
        provice: '',
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
        this.proviceList = res;
      });
      getCityList().then((res) => {
        this.cityList = res;
      });
      getAreaList().then((res) => {
        this.areaList = res;
      });
      getList().then((res) => {
        this.total = 400;
        this.list = res.slice(0, this.listQuery.limit);
      });
    },
    deleteLeader() {

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

.icolor{
  color: green;
}
.tipsstyle{
  color: darkgray;
  font-size: 13px;
}
</style>
