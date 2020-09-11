<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>
      编号: <span class="spancolor">{{form.num}}</span>  &nbsp;&nbsp;
      工号: <span class="spancolor">{{form.jobNum}}</span>  &nbsp;&nbsp;
      姓名: <span class="spancolor">{{form.num}}</span> &nbsp;&nbsp;
      事业部:<span class="spancolor">{{form.enterprise}}</span> &nbsp;&nbsp;
    </span>
  </div>
    <div>
      注册地
    </div>
     <div>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          省/直辖市/自治区
         </el-col>
           <el-col :span="6">
          城市
         </el-col>
           <el-col :span="6">
          区/县
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          <el-select size="medium" v-model="form.province"  clearable  class="filter-item ">
                <el-option v-for="item in provinceList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
          <el-col :span="6">
          <el-select size="medium" v-model="form.city"  clearable  class="filter-item ">
                <el-option v-for="item in cityList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
            <el-col :span="6">
          <el-select size="medium" v-model="form.area"  clearable  class="filter-item ">
                <el-option v-for="item in areaList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
       </el-row>
     </div>
     <div class="margintop">
      其他信息
    </div>
    <div class="margintop">
      <el-row>
        <el-col :span="6" :offset="2">等级</el-col>
      </el-row>
    </div>
    <div class="margintop">
      <el-row class="margintop">
         <el-col :span="6" :offset="2">
          <el-select size="medium" v-model="form.grade"  clearable  class="filter-item ">
                <el-option v-for="item in gradeList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
       </el-row>
    </div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="8" :offset="8">
  <el-button type="success" plain>提交</el-button>
  <el-button plain>返回</el-button>
  </el-col>

</el-row>
  </div>
</template>

<script>

import { getGradeList, getProvinceList, getCityList, getAreaList } from '@/api/basedata';

export default {
  name: 'advisoredit',
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      gradeList: [],
      form: {
        num: '',
        jobNum: '',
        name: '',
        enterprise: '',
        province: '',
        city: '',
        area: '',
        grade: '',
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
        grade: '',
      };
    },
    getBaseData() {
      getGradeList().then((res) => {
        this.gradeList = res;
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
</style>
