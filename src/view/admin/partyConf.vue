<template>
  <div class="main">
    <div class="right5">
      <van-form v-model="departmentForm" >
        <van-field v-model="departmentForm.title" label="题目" placeholder="题目">
        </van-field>
        <van-field v-model="departmentForm.priority" label="题目展示顺序" placeholder="数字越大排序越靠后">
        </van-field>
        <van-field v-model="departmentForm.detail" label="题目详情介绍" placeholder="题目详情介绍">
        </van-field>
        <van-cell center title="是否启用">
          <template>
            <van-switch v-model="departmentForm.enable">
            </van-switch>
          </template>
        </van-cell>
        <van-cell center title="是否必填">
          <template>
            <van-switch v-model="departmentForm.necessary">
            </van-switch>
          </template>
        </van-cell>
        <van-cell center title="是否参与集体统计">
          <template>
            <van-switch v-model="departmentForm.isOverallStatistics">
            </van-switch>
          </template>
        </van-cell>
        <van-field v-model="departmentForm.weight" label="统计权重" placeholder="统计权重" v-if="departmentForm.isOverallStatistics == true">
        </van-field>
        <van-cell center title="是否展示评价详情">
          <template>
            <van-switch v-model="departmentForm.showDetail">
            </van-switch>
          </template>
        </van-cell>
        <van-field v-if="departmentForm.showDetail == true" v-model="departmentForm.statisticTitle" label="数据展示名字" placeholder="数据展示名字">
        </van-field>
        <van-cell title="作风建设评价表分类">
          <van-radio-group v-model="departmentForm.statisticTitleId" direction="horizontal">
            <template>
              <van-radio name="1">规范、态度、成效</van-radio>
              <van-radio name="2">作风变化情况</van-radio>
              <van-radio name="3">其它 (不参与)</van-radio>
            </template>
          </van-radio-group>
        </van-cell>
        <van-cell title="题目类型">
          <van-radio-group v-model="departmentForm.typeId" direction="horizontal">
            <template>
              <van-radio name="4">单选题</van-radio>
              <van-radio name="5">简答题</van-radio>
            </template>
          </van-radio-group>
        </van-cell>
        <van-row v-show="departmentForm.typeId == 4">
          <van-button size="small" @click="addDepartmentOption" type="info" icon="plus"
                      style="margin-top: 10px;margin-left: 10px;">新增选项
          </van-button>
          <van-row v-for="(optionDtoList, index) in departmentForm.optionDtoList" :key="index" style="width: 100% ;">
            <van-col span="12">
              <van-field v-model="optionDtoList.answerDesc" :label="'选项' + (index+1)">
              </van-field>
            </van-col>
            <van-col span="12">
              <van-field v-model="optionDtoList.score" label="选项得分">
              </van-field>
            </van-col>
            <van-col span="24">
              <van-button style="float:right;" size="small" icon="minus" @click="deleteInfo(optionDtoList)" type="danger" text="删除">
              </van-button>
            </van-col>
            <van-divider/>
          </van-row>
        </van-row>
        <div style="margin-top:10px;">
          <van-button type="info" block native-type="submit" @click="submitInfo(departmentForm)">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
name: "partyConf",
  data(){
    return{
      // 集体题目新增
      departmentForm: {
        detail: "", //题目详情介绍
        enable: true, //是否启用
        id: "", //题目id
        isOverallStatistics : false, //是否参与集体统计
        necessary: false, //是否必填 1必填 0 非必填 ,
        //选项列表，当题目类型 为1 选项题时，必填 ,
        optionDtoList: [
          {
            answerDesc: "", //选项描述
            id: "", //选项id ,
            score: 0, //选项得分 当题目参与统计权重时，不能为空 ,
            tag: 0 // 选项是否积极 当选项为 满意 不满意 时，建议选择
          }
        ],
        overallStatistics: true,
        priority: 0, // 题目展示顺序
        showDetail: false, //展示评价详情(集体评价) 1展示，0不展示 ,
        statisticTitle: "", //数据展示title ,
        statisticTitleId: 1, //统计集体评价时的标题 1评价内容, 2作风变化情况 3其他不参与
        surveyId: 1, //评价类型 1集体评价，2个人评价 ,
        tag: false, //题目是否涉及内容积极性 仅当typeId = 2 即输入框题型时 ,
        title : "", //题目 ,
        typeId : '4', // 题目类型 4单选，5输入框 ,
        weight: 0 //统计权重(集体评价) 仅当 isOverallStatistics 为true参与统计时
      },

    }
  },
  methods: {
  //提交
    submitInfo(departmentForm){
      this.addQuestion(this.departmentForm);
    },
    //新增题目
    addQuestion(addForm){
      if(addForm.typeId == '5'){
        delete addForm.optionDtoList
        addForm.typeId = '2'
      }else if (addForm.typeId == '4') {
        addForm.typeId = '1'
      }
      const url = "api/management/question/insert";
      this.$axios.post(url, addForm).then(res => {
        if(res.data.code == 0){
          this.$toast({
            message: "添加成功",
            duration: 1000,
          });
        }else{
          this.$toast({
            message: res.data.message,
            duration: 1000
          });
          return;
        }
      })
    },
  //删除选项
    deleteInfo(item){
      var index = this.departmentForm.optionDtoList.indexOf(item);
      if(index !== -1){
        this.departmentForm.optionDtoList.splice(index,1);
      }
    },
    addDepartmentOption(){
      this.departmentForm.optionDtoList.push({
        answerDesc: "",
        key: Date.now()
      })
    },
  }
}
</script>


