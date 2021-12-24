<template>
    <div class="main w" style="position : relative;">
      <div class="right5">
        <div class="rightTop" style="height : 50px; padding : 7px 15px;">
          <span class="depName">当前单位:</span>
          <span class="rateName">{{departmentName}}</span>
        </div>
<!--        教师层级  -->
        <van-tabs v-model="employeeTab" @click="employeeClassResult" >
          <van-tab title="参评情况">
            <van-cell title="查看全部评价完成率" is-link @click="toAllPeople" icon="eye-o">
            </van-cell>
            <van-cell title="查看全部评价完成率" is-link @click="toRateComplete" icon="eye-o">
            </van-cell>
            <van-cell title="未参评人数查看" is-link @click="toUnpacipation" icon="eye-o">
            </van-cell>

            <van-cell title="已经参评人数查看" is-link @click="toPacipation" icon="eye-o">
            </van-cell>

            <van-cell title="查看本部门参评率" is-link @click="toEcharts" icon="eye-o">
            </van-cell>
          </van-tab>
          <van-tab v-if="isParticipation != 0" v-for="(item ,index) in employeeClassData" :key="index" :title="item.text" :name="item.text" >
                <div v-if=" item.text === employeeTab" class="rightMain">
                  <p class="totalEvaluate">
                    参评人数：
                    <span>{{departentResult.totalEvaluate}}</span>人
                  </p>
                  <div class="chartsBox" style="position : relative; left: 2.5%;">
                    <v-chartRadar
                      :titleText="radarData.resultTitle"
                      :indicatorName="indicatorName"
                      :opinionValue="opinionValue">
                    </v-chartRadar>
                  </div>

                  <div v-show="index != 0" style="position : relative; left: 2.5%; "
                    v-for="(chartItem, index) in statisticDataDtoList"
                       :key="index" class="chartsBox">
                    <v-chartPie
                      :id="'pie'+index"
                      :titleText = "chartItem.resultTitle"
                      :opinionData = "dataInfoListData[index]">
                    </v-chartPie>
                  </div>
                </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
import bus from "../../components/common"
import chartPie from "../../components/chartPie"
import chartRadar from "../../components/chartRadar"
export default {
  name: "departentResult",
  data() {
    return {
      employeeClassData : [
        {
          id : 1,
          text : "全部人员"
        },
        {
          id : 2,
          text : "中层领导"
        },
        {
          id : 3,
          text : "教工代表"
        },
        {
          id : 4,
          text : "普通教师"
        },
        {
          id: 5,
          text: "校领导"
        },
      ],
      employeeTab: '参评情况', //领导分级tabs名字
      tachersTab : 0, //教师层级默认值
      departmentName : '',
      departentResult : {},
      isParticipation : 0, // 是否参与评价
      departentId : "", // 部门id
      employeeClassId : 0, // 领导分级id
      statisticDataDtoList : [], // 评分结果列表
      radarData : [], // 雷达数据
      indicatorName : [], //雷达名称
      opinionValue: [], //雷达数值
      dataInfoListData : [],
      dataInfoVal : [],
      fullFinishedRate: 0,
      participationDetailData : {},
      participationRate : 0,
      totalCountS : "",
      nonparticipant : "" , //未参评人数
      participationCount : "" ,//已经参评人数
    }
  },
  components: {
    "v-chartRadar": chartRadar,
    "v-chartPie": chartPie
  },
  methods:{
    //跳转到所以参与人
    toAllPeople(){
      this.$router.push({path: '/toAllPeople', query : { totalCountS : this.totalCountS ,participationDetailData : this.participationDetailData,nonparticipant : this.nonparticipant}})
    },
    //跳转到评价完成率
    toRateComplete(){
      this.$router.push({path:'/toRateComplete', query : { fullFinishedRate: this.fullFinishedRate , participationRate : this.participationRate}})
    },
    //跳转到图表界面
    toEcharts(){
      this.$router.push({ path : '/toEcharts', query : { nonparticipant : this.nonparticipant, participationCount : this.participationCount}})
    },
    //跳转到以参评人数界面
    toPacipation(){
      this.$router.push({path:'/toPaticipation', query:{ participationDetailData: this.participationDetailData }})
    },
    //跳转到未参评界面
    toUnpacipation(){
      this.$router.push({path: '/toUnparticition', query:{ nonparticipant : this.nonparticipant, participationDetailData: this.participationDetailData}})
    },
    //查看人员层级评价情况分析分别请求接口
    drawClassEcharts(){
      //部门是否参与评价
      this.isParticipation = this.$route.query.isParticipation;
      //判断路由是否有参数，如果没有默认Id等于1
      if (this.$route.query.depId == undefined){
          bus.$on("depFirstId",firstId => {
            this.departentId = firstId;
            const getFirstUrl = `api/department/statistics/count?departmentId=${firstId}&employeeClassificationId=${
                this.employeeClassId
            }`;
            this.setEmployeeClass(getFirstUrl);
          });
      }else {
        this.departentId = this.$route.query.depId;
      }
      const getUrl = `api/department/statistics/count?departmentId=${this.departentId}&employeeClassificationId=${this.employeeClassId}`;
      this.setEmployeeClass(getUrl);
    },
    setEmployeeClass(url){
      let that = this;
      this.axios.get(url).then(res => {
        if (res.data.data != null){
          this.departentResult = res.data.data;
          this.departmentName = this.departentResult.departmentName;
            this.statisticDataDtoList = res.data.data.statisticDataDtoList;
            this.radarData = this.statisticDataDtoList[0];
            this.indicatorName = [];
            this.opinionValue = [];
            this.radarData.dataInfoList.forEach(function get(i) {
              if (i.percent != null){
                that.indicatorName.push({
                  max: 100,
                  name: i.name
                });
                that.opinionValue.push(i.percent)
            }
            });
          this.dataInfoListData = [];
          this.statisticDataDtoList.forEach((item, index) => {
            this.dataInfoVal = [];
            item.dataInfoList.forEach((childItem, j) => {
              this.dataInfoVal.push({
                value : childItem.percent,
                name: childItem.name
              });
            });
            this.dataInfoListData.push(this.dataInfoVal);
          });
        }
      });
    },
    employeeClassResult(tab, event){
      if (tab != null){
        if (tab == "全部人员") {
          event = 1;
        }else if (tab == "中层领导") {
          event = 2;
        }else if (tab == "教工代表") {
          event = 3;
        }else if (tab == "普通教师") {
          event = 4;
        }else if (tab == "校领导") {
          event = 5;
        }
        this.employeeClassId = event -1;
      }
      if (this.employeeClassId == -1){
        this.participationDetail();
      }else if (this.employeeClassId != 5){
        this.drawClassEcharts();
      }
    },
    //参评情况图表
    participationDetail(url){
      this.axios.get(url).then(res => {
        if (res.data.data != null){
          this.departmentName = res.data.data.departmentName; //部门名称
          this.participationDetailData = res.data.data;
          this.fullFinishedRate = Number(
              this.participationDetailData.fullFinishedRate
          );
          this.participationRate = Number(
              this.participationDetailData.participationRate
          );
          this.totalCountS = this.participationDetailData.totalCount; //总人数
          this.participationCount = this.participationDetailData.participationCount; //未参加人数
          this.nonparticipant = this.totalCountS - this.participationCount; //已参加人数
        }
      })
    },
    setFirstUrl(url){
      this.isParticipation = this.$route.query.isParticipation;

      //判断路由是否有效，
      if (this.$route.query.depId == undefined){
        //接受页面传过来的参数值  监听作用
        bus.$on("depFirstId", firstId => {
          this.departentId = firstId;
          const getFirstUrl = `api/department/statistics/participationDetail?departmentId=${
              this.departentId
          }`;
          this.participationDetail(getFirstUrl);
        });
      }else {
        this.departentId = this.$route.query.depId;
      }
      const getUrl = `api/department/statistics/participationDetail?departmentId=${
          this.departentId
      }`;
      this.participationDetail(getUrl);
    },
  },
  watch : {
    $route : function (newVal, oldVal){
      this.drawClassEcharts();
      this.setFirstUrl();
    }
  },
  mounted() {
    this.employeeClassResult();
    this.drawClassEcharts();
    this.setFirstUrl();
  }
}
</script>
