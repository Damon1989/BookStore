<template>
  <div class="app-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
    <el-row class="fontweight">
      <el-col :span="6"  :offset="2">
        单号: {{form.billNum}}
      </el-col>
       <el-col :span="6"  :offset="2">
        事业部: {{form.enterprise}}
      </el-col>
       <el-col :span="6"  :offset="2">
        渠道: {{form.channel}}
      </el-col>
    </el-row>
  </div>
  <div class="fontweight">流程进度</div>
   <el-divider></el-divider>
   <div>
     <el-row>
       <el-col :offset="2" :span="20">
        <el-steps :active="form.activeProcess">
          <el-step v-for="(process,index) in  form.processList" :title="process.title" :description="process.description" :key="index"></el-step>
        </el-steps>
       </el-col>
     </el-row>
   </div>
   <div class="margintop fontweight">预约单信息</div>
   <el-divider></el-divider>
   <div>
     <el-row>
       <el-col :offset="2" :span="6" class="fontweight">
         基本信息
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         想了解产品:{{form.orderInfo.basedata.understandProduct}}
       </el-col>
      <el-col :offset="2" :span="6">
         预约时间:{{form.orderInfo.basedata.orderDate}}
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6" class="margintop fontweight">
         个人信息
       </el-col>
     </el-row>
       <el-row class="margintop">
       <el-col :offset="2" :span="6">
         顾客姓名：{{form.orderInfo.customer.name}}
       </el-col>
      <el-col :offset="2" :span="6">
         手机号 : {{form.orderInfo.customer.phoneNumber}}
       </el-col>
        <el-col :offset="2" :span="6">
         门店 : {{form.orderInfo.customer.shop}}
       </el-col>
     </el-row>
       <el-row class="margintop">
       <el-col :offset="2" :span="6">
         省/直辖市： {{form.orderInfo.customer.province}}
       </el-col>
      <el-col :offset="2" :span="6">
         城市 :  {{form.orderInfo.customer.city}}
       </el-col>
        <el-col :offset="2" :span="6">
         区/县 :  {{form.orderInfo.customer.district}}
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6" class="margintop fontweight">
         附件信息
       </el-col>
     </el-row>
       <el-row class="margintop">
       <el-col :offset="2" :span="6">
         是否体验过产品 :  {{form.orderInfo.attachment.experiencedProduct}}
       </el-col>
      <el-col :offset="2" :span="6">
         是否与顾问接洽 :  {{form.orderInfo.attachment.contactAdvisor}}
       </el-col>
        <el-col :offset="2" :span="6">
         接洽顾问 :  {{form.orderInfo.attachment.advisor}}
       </el-col>
     </el-row>
       <el-row class="margintop">
       <el-col :offset="2" :span="6">
         从何处了解 :  {{form.orderInfo.attachment.wheretolearn}}
       </el-col>
      <el-col :offset="2" :span="6">
         城市 :  {{form.orderInfo.attachment.city}}
       </el-col>
        <el-col :offset="2" :span="6">
         区/县 :  {{form.orderInfo.attachment.district}}
       </el-col>
     </el-row>
   </div>
   <div class="margintop fontweight">顾问反馈</div>
   <el-divider></el-divider>
   <div>
      <el-row>
       <el-col :offset="2" :span="6" class="fontweight">
         服务跟踪
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         顾客是否下单： {{form.advisorfeedback.placeOrder}}
       </el-col>
      <el-col :offset="2" :span="6">
         购买产品类型 : {{form.advisorfeedback.buyProductType}}
       </el-col>
      <el-col :offset="2" :span="6">
         订单号 : {{form.advisorfeedback.orderNum}}
       </el-col>
     </el-row>
   </div>
   <div class="margintop fontweight">顾客反馈</div>
   <el-divider></el-divider>
   <div>
     <el-row>
       <el-col :offset="2" :span="6" class="fontweight">
         服务评价
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         满意程度： {{form.customerfeedback.satisfied}}
       </el-col>
      <el-col :offset="2" :span="14">
         服务意见： {{form.customerfeedback.serviceOptions}}
       </el-col>
     </el-row>
     <el-row>
       <el-col :offset="2" :span="6" class="margintop fontweight">
         购买信息
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         是否下单： {{form.customerfeedback.placeOrder}}
       </el-col>
      <el-col :offset="2" :span="6">
         购买产品类型 :  {{form.customerfeedback.buyProductType}}
       </el-col>
     </el-row>
   </div>
      <div class="margintop fontweight">数据分析</div>
   <el-divider></el-divider>
<div>
       <el-row>
       <el-col :offset="2" :span="6" class="fontweight">
         处理情况
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         处理顾问 :  {{form.dataAnalysis.handleAdvrser}}
       </el-col>
      <el-col :offset="2" :span="6">
         工号 :  {{form.dataAnalysis.jobNum}}
       </el-col>
        <el-col :offset="2" :span="6">
         职位 :  {{form.dataAnalysis.position}}
       </el-col>
     </el-row>
         <el-row class="margintop">
       <el-col :offset="2" :span="6">
         注册地址 :  {{form.dataAnalysis.registerAddress}}
       </el-col>
      <el-col :offset="2" :span="6">
         响应时间 :  {{form.dataAnalysis.responseTime}}
       </el-col>
     </el-row>
       <el-row>
       <el-col :offset="2" :span="6" class="margintop fontweight">
         成交情况
       </el-col>
     </el-row>
     <el-row class="margintop">
       <el-col :offset="2" :span="6">
         是否成交： {{form.dataAnalysis.dealed}}
       </el-col>
      <el-col :offset="2" :span="6">
         订单编号 :  {{form.dataAnalysis.orderNum}}
       </el-col>
        <el-col :offset="2" :span="6">
         下单时间 :  {{form.dataAnalysis.orderDateTime}}
       </el-col>
     </el-row>
         <el-row class="margintop">
       <el-col :offset="2" :span="6">
         金额： {{form.dataAnalysis.amount}}
       </el-col>
      <el-col :offset="2" :span="6">
         下单渠道 :  {{form.dataAnalysis.orderChannel}}
       </el-col>
      <el-col :offset="2" :span="6">
         下单顾问 :  {{form.dataAnalysis.orderAdvisor}}
       </el-col>
     </el-row>
</div>
    </el-card>
<el-row style="margin-top:30px">
  <el-col :span="10" :offset="12">
  <el-button plain>返回</el-button>
  </el-col>

</el-row>

  </div>
</template>

<script>

export default {
  name: 'orderdetail',
  data() {
    return {
      form: {
        billNum:'',
        enterprise:'',
        channel:'',
        activeProcess:1,
        processList:[{
          title:'',
          description:''
        }],
        orderInfo:{
          basedata:{
            understandProduct:'',
            orderDate:'',
          },
          customer:{
            name:'',
            phoneNumber:'',
            shop:'',
            province:'',
            city:'',
            district:''
          },
          attachment:{
            experiencedProduct:'',
            contactAdvisor:'',
            advisor:'',
            wheretolearn:'',
            city:'',
            district:''
          }
        },
        advisorfeedback:{
          placeOrder:'',
          buyProductType:'',
          orderNum:''
        },
        customerfeedback:{
          satisfied:'',
          serviceOptions:'',
          placeOrder:'',
          buyProductType:'',
        },
        dataAnalysis:{
          handleAdvrser:'',
          jobNum:'',
          position:'',
          registerAddress:'',
          responseTime:'',
          dealed:'',
          orderNum:'',
          orderDateTime:'',
          amount:'',
          orderChannel:'',
          orderAdvisor:''
        }
      },
    };
  },
  created() {
    const id = this.$route.params && this.$route.params.id;
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
        billNum: '234231029431 ',
        enterprise: '美善品',
        channel:'官网预约',
        activeProcess:3,
        processList:[{
          title:'预约单生成',
          description:'张先生 2020-08-01 12:00'
        },{
          title:'经理派单',
          description:'王经理 (SH001.01) 2020-08-02 12:00'
        },{
          title:'顾问接单',
          description:'李顾问  (SH001.02) 2020-08-03 12:00'
        },{
          title:'完成',
          description:'2020-08-03 12:00'
        }],
        orderInfo:{
          basedata:{
            understandProduct:'美善品TM6',
            orderDate:'2020-08-05',
          },
          customer:{
            name:'张先生',
            phoneNumber:'13988882222',
            shop:'上海金虹桥点',
            province:'上海市',
            city:'上海',
            district:'长宁区'
          },
          attachment:{
            experiencedProduct:'否',
            contactAdvisor:'是',
            advisor:'13988556633',
            wheretolearn:'官网',
            city:'上海',
            district:'长宁区'
          }
        },
        advisorfeedback:{
          placeOrder:'是',
          buyProductType:'TM6',
          orderNum:'20598751513012'
        },
        customerfeedback:{
          satisfied:'非常满意',
          serviceOptions:'小美多功能料理机质量很好，外观漂亮，一锅多用。价格合理，喜欢...',
          placeOrder:'是',
          buyProductType:'TM6',
        },
        dataAnalysis:{
          handleAdvrser:'李顾问',
          jobNum:'2SH002.02',
          position:'主任',
          registerAddress:'上海市,上海,虹口区',
          responseTime:'08:20',
          dealed:'是',
          orderNum:'20598751513012',
          orderDateTime:'2020-08-10 12:30',
          amount:'10,888.00',
          orderChannel:'官网商城',
          orderAdvisor:'李顾问(2SH002.02)'
        }
      };
    },
    getBaseData() {
      getGradeList().then((res) => {
        this.gradeList = res;
      });
    },
  },

};
</script>

<style>
.margintop{
  margin-top:20px;
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

.fontweight{
  font-weight: bolder;
}
</style>
