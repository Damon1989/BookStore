<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <span>
      编号: {{form.num}} &nbsp;&nbsp;
      工号: {{form.jobNum}} &nbsp;&nbsp;
      姓名: {{form.num}} &nbsp;&nbsp;
      事业部:{{form.enterprise}} &nbsp;&nbsp;
    </span>
  </div>
    <div>
      注册地
    </div>
     <div>
       <el-row class="margintop">
         <el-col :span="4">
          省/直辖市/自治区
         </el-col>
           <el-col :span="4">
          城市
         </el-col>
           <el-col :span="4">
          区/县
         </el-col>
       </el-row>

       <el-row class="margintop">
         <el-col :span="4">
          <el-select size="medium" v-model="form.provice"  clearable  class="filter-item ">
                <el-option v-for="item in proviceList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
          <el-col :span="4">
          <el-select size="medium" v-model="form.city"  clearable  class="filter-item ">
                <el-option v-for="item in cityList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
            <el-col :span="4">
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
      <el-row class="margintop">
         <el-col :span="4">
          <el-select size="medium" v-model="form.level"  clearable  class="filter-item ">
                <el-option v-for="item in levelList" :key="item" :label="item" :value="item" />
          </el-select>
         </el-col>
       </el-row>
    </div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="8" :offset="8">
  <el-button type="primary" plain>提交</el-button>
  <el-button plain>返回</el-button>
  </el-col>

</el-row>
  </div>
</template>

<script>
const proviceList = ['上海市 ', '江苏省'];
const cityList = ['上海市 ', '盐城市'];
const areaList = ['浦东新区 ', '东台'];
const levelList = ['1星', '2星', '3星', '4星', '5星'];
export default {
  name: 'adviseredit',
  data() {
    return {
      proviceList,
      cityList,
      areaList,
      levelList,
      form: {
        num: '',
        jobNum: '',
        name: '',
        enterprise: '',
        provice: '',
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
  },
};
</script>

<style>
.margintop{
  margin-top:10px;
}
</style>
