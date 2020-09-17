<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>
      编号: <span class="spancolor">{{form.num}}</span>  &nbsp;&nbsp;
      事业部:<span class="spancolor">{{form.enterprise}}</span> &nbsp;&nbsp;
      所在地区: <span class="spancolor">{{form.jobNum}}</span>  &nbsp;&nbsp;
      门店经理: <span class="spancolor">{{form.num}}</span> &nbsp;&nbsp;
    </span>
  </div>
    <div>
      基本信息
    </div>
     <div>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          门店名称
         </el-col>
           <el-col :span="6" :offset="2">
          地址
         </el-col>
           <el-col :span="6" :offset="2">
          电话
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="6" :offset="2">
           <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
          <el-col :span="6"  :offset="2">
          <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
        <el-col :span="6"  :offset="2">
          <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
       </el-row>
     </div>
     <div class="margintop">
      其他信息
    </div>
    <div class="margintop">

    </div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="8" :offset="10">
  <el-button type="success" plain>提交</el-button>
  <el-button plain>返回</el-button>
  </el-col>

</el-row>
  </div>
</template>

<script>

import { getGradeList, getProvinceList, getCityList, getDistrictList } from '@/api/basedata';

export default {
  name: 'advisoredit',
  data() {
    return {
      provinceList: [],
      cityList: [],
      districtList: [],
      gradeList: [],
      form: {
        num: '',
        jobNum: '',
        name: '',
        enterprise: '',
        province: '',
        city: '',
        district: '',
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
        district: '',
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
      getDistrictList().then((res) => {
        this.districtList = res;
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
