<template>
  <div class="main">
    <div class="right5">
      <van-form v-model="personForm" >

        <van-field v-model="personForm.title" label="题目" placeholder="题目">

        </van-field>

        <van-field v-model="personForm.priority" label="题目展示顺序" placeholder="数字越大排序越靠后">

        </van-field>

        <van-cell center title="是否启用">
          <template>
            <van-switch v-model="personForm.enable">

            </van-switch>
          </template>
        </van-cell>

        <van-cell center title="是否必填">
          <template>
            <van-switch v-model="personForm.necessary">

            </van-switch>
          </template>
        </van-cell>

        <van-cell title="题目类型">
          <van-radio-group v-model="personForm.typeId" direction="horizontal">
            <template>
              <van-radio name="1">单选题</van-radio>
              <van-radio name="2">简答题</van-radio>
            </template>
          </van-radio-group>
        </van-cell>

        <van-row v-show="personForm.typeId == 1">
          <van-button size="small" @click="addPersonOption" type="info" icon="plus"
                      style="margin-top: 10px;margin-left: 10px;">新增选项
          </van-button>
          <van-row v-for="(optionDtoList, index) in personForm.optionDtoList" :key="index" style="width: 100% ;">
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

        <van-button @click="addInfo(personForm)" type="info" block style="margin-top:1rem;" text="确定">
        </van-button>
      </van-form>
    </div>

  </div>
</template>

<script>
export default {
name: "personalConf",
  data() {
    return {
      //个人题目新增
      personForm: {
        detail: "", //题目详情介绍
        id: "",
        enable: false, //是否启用
        necessary: false, //是否必填 1必填 0 非必填 ,
        //选项列表，当题目类型 为1 选项题时，必填 ,
        optionDtoList: [
          {
            answerDesc: "", //选项描述
            id: "", //选项id ,
            tag: 0 // 选项是否积极 当选项为 满意 不满意 时，建议选择
          }
        ],
        priority: 0, // 题目展示顺序
        surveyId: 2, //评价类型 1集体评价，2个人评价 ,
        tag: false, //题目是否涉及内容积极性 仅当typeId = 2 即输入框题型时 ,
        title: "", //题目 ,
        typeId: '1' // 题目类型 1单选，2输入框 ,
      },
    }
  },
  methods: {
    //删除一行功能
    deleteInfo(item){
      var index = this.personForm.optionDtoList.indexOf(item);
      if(index !== -1){
        this.personForm.optionDtoList.splice(index,1);
      }
    },
    //添加信息
    addInfo(personForm){
      if(personForm.typeId == '2'){
        delete personForm.optionDtoList;
      }
      const url = "api/management/question/insert";
      this.$axios.post(url, personForm).then(res => {
        if(res.data.code == 0){
          this.$toast({
            message: "添加成功",
            duration: 1000
          });
        }else{
          this.$toast({
            message: res.data.message,
            duration: 1000
          })
        }
      })
    },
    addPersonOption(){
      this.personForm.optionDtoList.push({
        answerDesc: "",
        key: Date.now()
      });
    },
  },
}
</script>


