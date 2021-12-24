<template>
    <div class="main w">
      <div class="right7">
        <div class="rightTop">
          <span class="depName">{{personInfo.departmentName}}</span>
          <span class="rateName">{{personInfo.name}}</span>
        </div>
        <div style="float: left;">
            <van-image width="8rem" height="10rem" style="margin: 1rem;" :src="imgSrc + personInfo.employeeId" @click=" showPop = true" :onerror="headPortrait" />
        </div>
        <div class="personsMessage" style="margin: 1rem;">
          <p class="personRole">姓名 : {{personInfo.name}}</p>
          <p class="personRole">职责 : {{personInfo.role}}</p>

            <div class="criterionContent" v-if="this.$store.state.currentUserEid == resultEid " >
              <span>满意 : {{personInfo.satisfiedCount}} 次 </span>
              <span>不满意: {{personInfo.unSatisfiedCount}}次</span>
            </div>
          </div>

        <van-cell title="是否满意" style="width: 25rem; " v-if="this.$store.state.currentUserEid != resultEid ">
          <van-radio-group style="width: 17rem; " v-model="isSatisfied" direction="horizontal" @change="handleSatisfyChange">
            <template >
              <van-radio name="1">全部</van-radio>
              <van-radio name="2">满意</van-radio>
              <van-radio name="3">不满意</van-radio>
            </template>
          </van-radio-group>
        </van-cell>

        <div style="clear: both;" v-if="this.$store.state.currentUserEid != resultEid">
          <div style="margin-top: 0.5rem;">
            <span  style=" font-size: 1rem;font-weight: 600;margin-left: 0.7rem;">满意 : {{personInfo.satisfiedCount}} 次 </span>
            <span style="font-size: 1rem;font-weight: 600;">不满意: {{personInfo.unSatisfiedCount}}次</span>
          </div>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="margin-top: 0.5rem;">
            <van-list @load="getRefreshData" :error.sync="errorData" error-text="没有数据"  :finished="finished" finished-text="没有更多了" >
              <van-row>
                <van-col span="12" v-for="(item, index) in tableData" :key="index" style="width: 100% ;">
                  <div style="background : #F8F8F8; text-align : left;" v-if="item !== null ">
                    <p style="margin-left: 10px;">评价时间：{{item.time }}</p>
                    <p style="margin-left: 10px;">筛选：<span :style="{color:(item.isSatisfied == true ?  '#67c23a' : 'red')}">{{item.isSatisfied == true ? "满意" : "不满意"}}</span></p>
                    <p style="margin-left: 10px;">姓名：{{item.employeeName}}</p>
                    <p style="margin-left: 10px;">所属部门：{{item.employeeBelongDepartmentName}}</p>
                    <p style="margin-left: 10px;">评价详情：{{item.detail}}</p>
                    <van-divider />
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </van-pull-refresh>
        </div>
        </div>
    </div>
</template>
<script>
import api from "../../util/api.js";
export default {
name: "personResult",
  data(){
    return{
      isLoading : false, //下拉加载判断
      errorData : false, //数据加载提示
      pleasure : "",//满意选项
      pleasureArr : [
        {
          value: 0,
          text: "查看全部"
        },
        {
          value: 1,
          text: "不满意"
        },
        {
          value: 2,
          text: "满意"
        }
      ],// 是否满意
      finished : false,
      isSatisbool : "",
      personInfo : {}, //个人信息
      imgSrc : api.findImage, //头像的地址
      headPortrait : 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      resultEid : "", //当前结果页面的eid 2020-12-14新增
      pageLen : 0,
      showPop : false, //是否打开弹窗
      pageSize : 10,
      currentPage : 0,
      pageCount : 1, //页码
      isAgree : "", //是否满意
      eid : '',
      departmentId : '',
      isNull : 0,
      tableData : [],
      isSatisfied : '1', //是否满意
      newArr : [], //监听数组 2021-01-28新增
      satisfiedData : [{
          satisfiedCount: 0,
          unSatisfiedCount: 0
        }], //满不满意数据
    }
  },
  created() {
    this.initParam();
    this.getResultInfo();
  },
  watch:{
    $route: function (newVal, oldVal){
      this.getResultInfo();
    }
  },
  methods:{
  //切换radio获取数组
    getEmployeeLists(){
      this.setContextData("isSatisfied",this.isSatisfied);
      let currentPage = 0;
      this.handleCurrentChange(currentPage)
    },
  //下拉刷新
    onRefresh(){
      let that = this;
      setTimeout(() => {
        // that.pageLen = 0;
        that.isLoading = false;
        this.getResultInfo();
      })
    },
  //处理是否满意
    handleSatisfyChange(){
      this.tableData = [];
      this.currentPage = 0;
      this.getResultInfo();
    },
    setContextData: function(key, value){
      if (typeof value == "string") {
        sessionStorage.setItem(key ,value);
      }else {
        sessionStorage.setItem(key, JSON.stringify(value))
      }
    },
  //分页功能
    handleCurrentChange : function(val){
      this.currentPage = val;
      this.getResultInfo();
    },
  initParam: function (){
    this.eid = this.$route.params.eid;
    this.departmentId = this.$route.params.departmentId
  },
    //获取下拉刷新数据
    getRefreshData(){
      if (this.tableData.length <this.pageLen && JSON.stringify(this.newArr) !== "[]") {
          this.getResultInfo();
      }
    },
  //2020-12-14新增获取员工结果信息
    getResultInfo(){
      this.newArr = [];
      const url = `api/employee/statistics/getEmployeeEvaluatedDetail?eid=${
        this.eid}&departmentId=${
        this.departmentId}&isSatisfied=${
        this.isSatisfied == '1' ? "" : this.isSatisfied == '2' ? "true":  "false"}&pageSize=${
        this.pageSize}&pageNumber=${++this.currentPage}`; //模板字符串
        this.axios.post(url).then(res => {
          this.newArr = res.data.dataList;
          if (res.data != null){
            this.tableData = this.tableData.concat(res.data.dataList);
            this.pageLen = res.data.totalNumber;
            this.personInfo = res.data;
            this.resultEid = this.personInfo.employeeId;
            this.satisfiedData[0].satisfiedCount = res.data.satisfiedCount;
            //不满意次数
            this.satisfiedData[0].unSatisfiedCount = res.data.unSatisfiedCount
          }
        }).catch(() => {
          this.errorData = true;
        })
    },
    //获取评论数
  }
}
</script>

<style scoped>
.van-cell__value{
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  margin-left: -10rem;
}
</style>
