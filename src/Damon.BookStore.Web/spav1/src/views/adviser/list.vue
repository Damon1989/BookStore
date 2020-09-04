<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="2" :offset="2" class="filtertext">
            事业部：
        </el-col>
        <el-col :span="4" >
        <el-select size="medium" v-model="listQuery.enterprise"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in enterpriseList" :key="item" :label="item" :value="item" />
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
        <el-select size="medium" v-model="listQuery.position"  clearable  class="filter-item filtercontrol">
              <el-option v-for="item in positionList" :key="item" :label="item" :value="item" />
        </el-select>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="2" :offset="2" class="filtertext">
            姓名：
      </el-col>
      <el-col :span="4" >
        <el-input size="medium" v-model="listQuery.name" placeholder="请输入" class="filter-item filtercontrol"></el-input>
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
        <el-input size="medium" v-model="listQuery.phone" placeholder="请输入" class="filter-item filtercontrol"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="2" class="filtertext">
        <el-button size="medium" type="success">导入</el-button>
      </el-col>
      <el-col :span="4" :offset="12" class="filtertext">
        <el-button size="medium" type="success">查  询</el-button>
        <el-button size="medium">重  置</el-button>
      </el-col>
    </el-row>
      <el-alert
      title="该事业部总计SA 400 名,TL 52 名, BM 21 名, AM 6 名"
      type="info"
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
      <el-table-column label="分公司"   align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.branchCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾问编号"   align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号"  align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.jobNum }}</span>
        </template>
      </el-table-column>
            <el-table-column label="姓名"  align="center" width="100" >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="手机"  align="center" width="120" >
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
                  <el-table-column label="职位"  align="center" width="60" >
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
                 <el-table-column label="等级"  align="center" width="60" >
        <template slot-scope="{row}">
          <span>{{ row.level }}</span>
        </template>
      </el-table-column>
                   <el-table-column label="注册地址"  align="center" min-width="210">
        <template slot-scope="{row}">
          <span>{{ row.registerAddress }}</span>
        </template>
      </el-table-column>
                 <el-table-column label="入职时间"  align="center" width="160" >
        <template slot-scope="{row}">
          <span>{{ row.entryDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="240" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" >
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" >
            Publish
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" >
            Delete
          </el-button>
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

const enterpriseList = ['美善品', '可宝', '知淳'];
const branchCompanies = ['分公司一', '分公司二', '分公司三'];
const positionList = ['SA', 'TL', 'BM', 'AM'];
const datalist = [{
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽0',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽1',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽2',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽3',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽4',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽5',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽6',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽7',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽8',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽9',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽10',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽11',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽12',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽13',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽14',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}, {
  branchCompany: 'CNTM',
  num: '10402213',
  jobNum: '2SH061.03',
  name: '王小丽15',
  phone: '13589784586',
  position: 'TL',
  level: '5星',
  registerAddress: '浙,江省,杭州市,西湖区,古荡湾',
  entryDateTime: '2016-09-21  08:50:08',
}];
export default {
  name: 'list',
  data() {
    return {
      enterpriseList,
      branchCompanies,
      positionList,
      list: null,
      listLoading: false,
      listQuery: {
        enterprise: '美善品',
        branchCompany: '',
        position: '',
        name: '',
        jobnum: '',
        phone: '',
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
      this.total = 20;
      this.list = datalist.slice(0, this.listQuery.limit);
    },
  },
};
</script>

<style>
.filtertext{
  text-align: right;
  margin-top: 6px;
}

.filtercontrol{
  width: 220px;
}
</style>
