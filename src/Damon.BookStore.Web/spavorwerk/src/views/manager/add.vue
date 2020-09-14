<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>
      事业部:<span class="spancolor">{{divisionName}}</span> &nbsp;&nbsp;
    </span>
  </div>
     <div>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          省/直辖市/自治区
         </el-col>
           <el-col :span="6">
          城市
           <!-- <i class="el-icon-warning icolor"></i> <span class="tipsstyle">可指定市，或选择全省</span> -->
         </el-col>
           <el-col :span="6">
          区/县
          <!-- <i class="el-icon-warning icolor"></i> <span class="tipsstyle">可指定区，或选择全市</span> -->
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          <el-select size="medium" v-model="form.province"  @change="provinceSelect"   clearable  class="filter-item filtercontrol">
                <el-option v-for="item in provinceList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
         </el-col>
          <el-col :span="6">
          <el-select size="medium" v-model="form.city"  clearable   @change="citySelect"  class="filter-item filtercontrol">
                <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
         </el-col>
            <el-col :span="6">
          <el-select size="medium" v-model="form.district"  clearable  class="filter-item filtercontrol">
                <el-option v-for="item in districtList" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
         </el-col>
       </el-row>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          区域负责人
          <!-- <i class="el-icon-warning icolor"></i> <span class="tipsstyle">选择后显示姓名/Title</span> -->
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
          <el-select size="medium" v-model="form.manager" filterable  clearable placeholder="请输入工号（仅限BM/AM/RM）"  class="filter-item filtercontrol">
                <el-option v-for="item in managerList" :key="item.userd" :label="item.realNameTitle" :value="item.userId" />
          </el-select>
         </el-col>
          <el-col :span="6">
            <el-input size="medium"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
        <el-col :span="6">
            <el-input size="medium" v-model="form.remark"  placeholder="请输入" class="filter-item filtercontrol"></el-input>
         </el-col>
       </el-row>
     </div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="10" :offset="9">
  <el-button type="success" plain @click="submitInfo()">提交</el-button>
  <el-button plain @click="back">返回</el-button>
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

import {getDivisions, getProvinceList, getCityList, getDistrictList,getSpecialCities } from '@/api/basedata';
import {getManagerList,submitDistrictManager} from '@/api/manager';

export default {
  name: 'manageradd',
  data() {
    return {
      provinceList: null,
      cityList: null,
      districtList: null,
      gradeList: null,
      managerList:null,
      form: {
        province: '',
        city: '',
        district: '',
        manager: '',
        remark:''
      },
      division:'',
      divisionName:''
    };
  },
  created() {
    this.division=this.$route.query && this.$route.query.division;
    this.getBaseData();
  },

  methods: {
    getBaseData() {
      getProvinceList().then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.provinceList = data;
        }
      });

      getManagerList().then(res=>{
        if(res.success){
          var result=res.result.data;
          result.forEach(element => {
            element.realNameTitle=`${element.realName}/${element.title}`;
          });
          this.managerList=result;
        }
      });

      getDivisions().then(res=>{
        console.log(res);
        this.divisionName= res.filter(c=>c.code==this.division)[0].name;
      })
    },
    submitInfo(){
      if(this.form.province===''&&this.form.city===''&&this.form.district===''){
         this.$message('请选择省市区/县');
         return false;
      }
      var district={
        code:'',
        name:''
      }
      debugger
      if(this.form.province!=''){
        var provinceData= this.provinceList.find(c=>c.code==this.form.province);
        district={
          code:this.form.province,
          name:provinceData.name
        }
      }
      if(this.form.city!=''){
        var cityData= this.cityList.find(c=>c.code==this.form.city);
        district={
          code:this.form.city,
          name:`${provinceData.name},${cityData.name}`
        }
      }
      if(this.form.district!=''){
        var distirtData= this.districtList.find(c=>c.code==this.form.district);
        district={
          code:this.form.district,
          name:`${provinceData.name},${cityData.name},${distirtData.name}`
        }
      }

      if(this.form.manager===''){
         this.$message('请选择区域负责人');
         return false;
      }
      var managerData=this.managerList.filter(c=>c.userId==this.form.manager)[0];
      var submitData={
          "zone":district,
            "division": this.division,
            "manager": {
              "advisorId": managerData.advisorId,
              "userId": managerData.userId,
              "userName": managerData.userName,
              "phoneNumber": managerData.phoneNumber,
              "realName": managerData.realName,
              "title": managerData.title,
              "division": this.division,
            },
            "remark":this.form.remark

      }
      submitDistrictManager(submitData).then(res=>{
        if(res.success){
          this.$message('新建区域负责人成功');
          this.$router.push('/manager')
        }
      })
    },
    provinceSelect(){
      this.form.city='';
      this.form.district='';
      getCityList(this.form.province).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.cityList = data;
           getSpecialCities().then(res=>{
            if(res.filter(c => c.id == this.form.province).length==1){
                this.form.city=this.form.province;
                this.citySelect();
              }
          })
        }
      });
    },
    citySelect(){
      this.form.district='';
      getDistrictList(this.form.city).then((res) => {
        var data=[];
        if(res.status=="0"){
          res.result[0].forEach(element => {
            data.push({code:element.id,name:element.fullname})
          });
          this.districtList = data;
        }
      });
    },
    back(){
      this.$router.push('/manager')
    }
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
