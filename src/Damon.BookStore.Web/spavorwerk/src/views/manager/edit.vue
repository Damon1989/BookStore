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
         </el-col>
           <el-col :span="6">
          区/县
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          {{form.province}}
         </el-col>
          <el-col :span="6">
          {{form.city}}
         </el-col>
            <el-col :span="6">
          {{form.district}}
         </el-col>
       </el-row>
       <el-row class="margintop">
         <el-col :span="6" :offset="2">
          区域负责人
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
                <el-option v-for="item in managerList" :key="item.userd" :label="item.realNameTitle" :value="item.advisorId" />
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

import {getDivisions } from '@/api/basedata';
import {getManagerList,EditDistrictManager,getById} from '@/api/manager';

export default {
  name: 'manageradd',
  data() {
    return {
      managerList:null,
      form: {
        province: '',
        city: '',
        district: '',
        code:'',
        name:'',
        manager: '',
        remark:''
      },
      id:'',
      division:'',
      divisionName:''
    };
  },
  created() {
    this.id=this.$route.params && this.$route.params.id;
    this.getBaseData();
  },

  methods: {
    getBaseData() {

      getById(this.id).then(res=>{
        console.log(res);
        if(res.success){
          var names=res.result.zone.name.split(',');
          this.form.name=res.result.zone.name;
          this.form.code=res.result.zone.code;
          this.form.province=names.length>=1?names[0]:'';
          this.form.city=names.length>=2?names[1]:'';
          this.form.district=names.length>=3?names[2]:'';
          this.form.manager=res.result.manager.advisorId;
          this.form.remark=res.result.remark;
          this.division=res.result.division;
          getDivisions().then(item=>{
          this.divisionName= item.filter(c=>c.code==res.result.division)[0].name;
        })
        }
      })
      getManagerList().then(res=>{
        if(res.success){
          var result=res.result.data;
          result.forEach(element => {
            element.realNameTitle=`${element.realName}/${element.title}`;
          });
          this.managerList=result;
        }
      });
    },
    submitInfo(){
      if(this.form.manager===''){
         this.$message('请选择区域负责人');
         return false;
      }
      var managerData=this.managerList.filter(c=>c.advisorId==this.form.manager)[0];
      var submitData={
        "id":this.id,
        "zone":{
          code:this.form.code,
          name:this.form.name
        },
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
      EditDistrictManager(submitData).then(res=>{
        if(res.success){
          this.$message('编辑区域负责人成功');
          this.$router.push('/manager')
        }
      })
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
