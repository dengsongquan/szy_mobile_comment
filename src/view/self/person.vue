<template>
  <div class="main w" >
    <div class="right7">
      <div class="rightTop">
        <span class="depName">{{personInfo.departmentName}}</span> :
        <span class="rateName">{{personInfo.name}}</span>
      </div>
      <div v-if="personData.isCurrentUser == true" style="background: white !important;">
        <div style="float: left;">
          <van-image width="8rem" height="10rem" style="margin: 1rem;" :src="imgSrc + personInfo.employeeId" :onerror="headPortrait"  />
        </div>
            <div class="personsMessage" style="margin: 1rem;">
                <p class="personName">姓名 : {{personInfo.name}}</p>
                <p class="personRole">职责 ： {{personInfo.role}}</p>
            </div>
        <div style="clear: both;margin-top: 1rem;">
          <van-list :finished="finished" finished-text="没有更多了" style="overflow: scroll;margin: 1rem 1rem;">
            <van-row>
              <van-col span="12" v-for="(item, index) in satisfiedData" :key="index" style="width: 100% ;">
                <div style="background: white;text-align: left; margin-top: 1rem;">
                  <p style="margin-left: 10px;padding-top: 10px;">满意 ：{{ item.satisfiedCount }}</p>
                  <p style="margin-left: 10px;padding-top: 10px;">不满意 ：{{ item.unSatisfiedCount }}</p>
                  <van-divider/>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </div>
        </div>
      <div v-if="personData.isCurrentUser == false" class="rightMain" style="background: white !important;">
        <div style="float: left;display: inline;">
          <img width="110rem" height="130rem" style="margin-left: 1rem;" :src="imgSrc + personInfo.eid" :onerror="headPortrait" @click=" showPop = true " />
        </div>
          <div style="margin-top: 1rem;margin-left: 9.5rem;">
            <p>姓名 : {{personInfo.name}}</p>
            <p>职责 ： {{personInfo.role}}</p>
          </div>
<div style="clear: both;margin-top: 1rem;">
  <van-list :finished="finished" finished-text="没有更多了" style="overflow: scroll;">
    <van-row>
      <van-col span="12" v-for="(item, index) in questionList" :key="index" style="width: 100% ;">
        <div style="background: white; text-align: left;  margin-top: 1rem;">
          <span class="unitName" style="margin:1rem 1rem;">{{index+1}}. {{item.title}}</span>
          <div v-if="item.typeId == 1" v-for="items in item.answers" :key="items.id">
            <van-radio-group  style="margin:1rem 1rem;"  v-model="requiredRadio[index]">
              <van-radio :name="items.answerDesc + '/'+ personInfo.departmentId +'/' + personInfo.eid + '/' + item.questionnaireId +'/'+ items.id " :title="item.title" @click="hint(index)">
                <span>{{items.answerDesc}}</span>
              </van-radio>
            </van-radio-group>
          </div>
          <van-field style="margin:1rem 0;" :name=" requiredRadio[index] = textaresList[index] + '/' + personInfo.departmentId +'/' + personInfo.eid + '/' + item.questionnaireId " @input="blankDescArea" required maxlength="800" v-if="item.typeId == 2" v-model="textaresList[index]" placeholder="请写明具体情况">
          </van-field>
          <van-divider/>
        </div>
      </van-col>
    </van-row>
  </van-list>
</div>
        <van-button :disabled="isDisable" type="primary" block @click="submit">提交</van-button>
        <!--<van-button style="margin-top: 1rem;" :disabled="isDisable" type="info" icon="eye-o" block @click="toHistory">查看历史评价结果</van-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../util/api.js";
export default {
name: "person",
  data() {
    return {
      finished : false,
      checkRadio: 1, //单选默认值
      personInfo: {}, //个人信息
      personData: [], //判断是否是本人//满不满意数据
      satisfiedData: [
        {
          satisfiedCount: 0,
          unSatisfiedCount: 0
        }
      ],
      historyList: [] ,// 历史列表 2020-12-23新增
      evaluateSubmit: [], // 最终提交的数据
      isDisable: false, //表单重复提交
      headPortrait: 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      textaresList: [], //简答题数据
      requiredRadio: [], //获取单选信息
      index : 0, //题目索引
      imgSrc : api.findImage, //头像的地址
      showPop : false, //显示弹窗信息
      questionList : [],
      backData : "",
    }
  },
  methods: {
  //查看历史评价结果
    toHistory(){
      this.$router.push({ path : "/isSatisfied" ,query : { item : this.historyList}})
    },
    //提交信息
    submit(){
      this.requiredRadio.forEach(j => {
        let answersArr = j.split("/");
        if(answersArr[4] == "undefined"){
          answersArr[4] = "";
          this.evaluateSubmit.push({
            answerDesc: answersArr[0],
            evaluatedDepartmentId: answersArr[1],
            evaluatedEmployeeId: answersArr[2],
            questionnaireId: answersArr[3],
            answerId: answersArr[4]
          });
        }else{
          this.evaluateSubmit.push({
            answerDesc: answersArr[0],
            evaluatedDepartmentId: answersArr[1],
            evaluatedEmployeeId: answersArr[2],
            questionnaireId: answersArr[3],
            answerId: answersArr[4]
          });
        }
      });
      this.evaluateSubmit.forEach(k => {
        if(k.answerDesc == "undefined"){
          this.$toast("请简要说明理由");
          this.evaluateSubmit = [];
          return;
        }
      });
      if(this.evaluateSubmit.length < this.questionList.length){
        this.$toast.fail("请对服务做出评价");
        this.evaluateSubmit = [];
        return;
      }
      this.setAnswerData();
    },
    //发送答案
    setAnswerData(){
      this.axios({
        url : "api/employee/submit",
        method : "post",
        data : { answers : this.evaluateSubmit },
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
          this.isDisable = false;
          if(res.data.code == 0){
            this.backData = res.data.data;
            this.$toast.success("提交成功！")
              let websock; //这里面的this都指向vue
              websock = new WebSocket(api.message);
              websock.onopen = this.websocketopen;
              websock.onmessage = this.websocketonmessage;
              websock.onclose = this.websocketclose;
              websock.onerror = this.websocketerror;
              const urls = `send/message?employeeId=${
                  this.textaresList.evaluatedEmployeeId
              }&resultTextId=${this.backData}`; //模板字符串
              this.getEvaluatedInfo();
              this.axios.get(urls).then(() => {
                this.$router.push({ path : "/isSatisfied" ,query : { item : this.historyList}})
            });

            return;
          }else {
            this.$toast.fail(res.data.message).then(() => {
            });
            return;
          }
      }).catch(err => {
        this.isDisable = false;
      })
    },
  //校验输入是否为空格
    blankDescArea(){
      let textVal = this.textaresList;
      textVal.forEach((j, idx) => {
        let answersStr = j.split("/")[0];
        if (answersStr.match(/^\s*$/)){
          this.$toast("第"+(idx + 1) + "题不能为空!!",);
          this.textaresList[idx] = "";
          return;
        }
      })
    },
  //点击弹窗说明理由
    hint(index){
      // this.$toast.success("请简要说明理由");
    },
    getEvaluatedInfo(){
      const url = `api/employee/findEvaluatedInfoByEid?eid=${
          this.$route.params.personEid
      }&departmentId=${this.$route.params.departmentId}`;
      this.axios.post(url).then(res => {
        this.personData = res.data.data;
        this.personInfo = res.data.data.list;

        this.satisfiedData[0].satisfiedCount = res.data.data.list.satisfiedCount;
        //不满意次数
        this.satisfiedData[0].unSatisfiedCount = res.data.data.list.unSatisfiedCount;

        this.historyList = res.data.data.list.historyList;
        this.textaresList.evaluatedDepartmentId = res.data.data.list.departmentId;

        this.textaresList.evaluatedEmployeeId = res.data.data.list.eid;
      })
    },
    //获取评价题目信息
    getQuestion(){
      const url = `api/employee/findQuestionnaires`;
      this.axios.post(url).then(res => {
        this.questionList = res.data.data;
      })
    },
  },

  created() {
    this.getEvaluatedInfo();
    this.getQuestion();
  }
}
</script>


