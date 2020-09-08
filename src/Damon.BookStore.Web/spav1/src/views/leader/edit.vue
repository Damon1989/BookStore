<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>
      事业部:<span class="spancolor">{{form.enterprise}}</span> &nbsp;&nbsp;
    </span>
  </div>
     <div>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          省/直辖市/自治区
         </el-col>
           <el-col :span="6">
          城市 <i class="el-icon-warning icolor"></i> <span class="tipsstyle">可指定市，或选择全省</span>
         </el-col>
           <el-col :span="6">
          区/县<i class="el-icon-warning icolor"></i> <span class="tipsstyle">可指定区，或选择全市</span>
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          <el-select size="medium" v-model="form.province"  clearable  class="filter-item filtercontrol">
                <el-option v-for="item in provinceList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
          <el-col :span="6">
          <el-select size="medium" v-model="form.city"  clearable  class="filter-item filtercontrol">
                <el-option v-for="item in cityList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
            <el-col :span="6">
          <el-select size="medium" v-model="form.area"  clearable  class="filter-item filtercontrol">
                <el-option v-for="item in areaList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
       </el-row>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          区域负责人<i class="el-icon-warning icolor"></i> <span class="tipsstyle">选择后显示姓名/Title</span>
         </el-col>
           <el-col :span="6">
          负责人姓名
         </el-col>
           <el-col :span="6">
          备注
         </el-col>
       </el-row>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          <el-select size="medium" v-model="form.leader"  clearable placeholder="请输入工号（仅限BM/AM/RM）"  class="filter-item filtercontrol">
                <el-option v-for="item in provinceList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
          <el-col :span="6">
            <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
        <el-col :span="6">
            <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
       </el-row>
     </div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="10" :offset="9">
  <el-button type="success" plain>提交</el-button>
  <el-button plain>返回</el-button>
  </el-col>

</el-row>
<br><br>
 <el-alert
    title="有两条区域完全一致的规则时,将覆盖原有负责人"
    type="success"  :closable="false" style="color:darkgray">
  </el-alert>
  <br>
   <el-alert
    title="当负责人为空时,将清楚负责人,但不会删除记录"
    type="success"  :closable="false" style="color:darkgray">
  </el-alert>
  </div>
</template>

<script>

import { getLevelList, getProvinceList, getCityList, getAreaList } from '@/api/basedata';

export default {
  name: 'adviseredit',
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      levelList: [],
      form: {
        num: '',
        jobNum: '',
        name: '',
        enterprise: '',
        province: '',
        city: '',
        area: '',
        level: '',
      },
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
    console.log(id);
    this.getDetail();
    this.getBaseData();
  },
  computed: {
    message() {
      return '123';
    },
  },
  methods: {
    getDetail() {
      this.form = {
        num: '10402213',
        jobNum: '2SH001.01',
        name: '王小丽',
        enterprise: '美善品',
        provice: '',
        city: '',
        area: '',
        level: '',
      };
    },
    getBaseData() {
      getLevelList().then((res) => {
        this.levelList = res;
      });
      getProvinceList().then((res) => {
        this.provinceList = res;
      });
      getCityList().then((res) => {
        this.cityList = res;
      });
      getAreaList().then((res) => {
        this.areaList = res;
      });
    },
  },

};
</script>

<style>
.margintop{
  margin-top:10px;
}

.spancolor{
  color: rgba(35, 172, 35, 0.719);
}

.filtercontrol{
  width: 260px;
}
.icolor{
  color: green;
}
.tipsstyle{
  color: darkgray;
  font-size: 13px;
}
</style>
