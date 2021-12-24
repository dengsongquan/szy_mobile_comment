<template>
  <div class="main w" style="text-align: center;">
    <div class="right8">
      <!--<div class="rightTop" style="display: inline-block;">-->
        <!--<span>机关教辅单位</span>-->
      <!--</div>-->
      <van-popup v-model="showPopup">
        <div class="left" style="width : 25rem; height : 25rem; overflow : scroll;">
          <div class="leftTitle">
            <span>评价项目</span>
          </div>
          <div class="leftContent">
            <span class="subject">
              {{index == allEvaluateList.length ? allEvaluateList.length : (index + 1)}}.{{evaluateItmes.title}}
            </span>
            <ul>
              <li v-html="evaluateItmes.detail" style="width: 100%;"></li>
            </ul>
          </div>
        </div>
      </van-popup>
    <van-form style="padding-bottom: 1rem">
      <van-list :finished="finished" v-model="loading">
        <van-row>
          <van-col span="12" v-for="(item, index) in evaluateItmes.departmentQuestionnaireDtoList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;padding-left: 1rem;">
              <span>{{index+1}}. {{item.name}}</span>
              <div v-if="evaluateItmes.typeId == 1" v-for="items in item.answers" :key="items.id">
                <van-radio-group style="margin:10px 0;"  v-model="radioItems[index]">
                  <van-radio :name="evaluateItmes.questionnaireId +'/' + item.depid + '/'+items.answerDesc + '/' + items.id">
                    <span>{{items.answerDesc}}</span>
                  </van-radio>
                </van-radio-group>
              </div>
              <!--maxlength="4" placeholder="请输入打交道次数" -->
              <van-field @input="descArea" :name="radioItems[index] = evaluateItmes.questionnaireId +'/' + item.depid + '/'+ textAreaList[index]" v-if="evaluateItmes.typeId == 2 && evaluateItmes.questionnaireId == 4 ? true : false" v-model="textAreaList[index]" >

              </van-field>

              <van-field @input="blankDescArea" :name="radioItems[index] = evaluateItmes.questionnaireId +'/' + item.depid + '/'+ textAreaList[index]" v-if="evaluateItmes.typeId == 2 && evaluateItmes.questionnaireId != 4"   v-model="textAreaList[index]" maxlength="800">

              </van-field>
              <van-divider/>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <div style="display: inline-block;">
        <van-button v-if="index > 0 ? true : false" size="small" type="primary" @click="backPage">上一项</van-button>
        <van-button v-if="index < allEvaluateList.length - 1" size="small" type="primary" @click="showPopup = true" icon="eye-o">查看评价项目</van-button>
        <van-button v-if="index < allEvaluateList.length - 1 " size="small" type="primary" @click="nextPage">下一项</van-button>
        <van-button v-if="index == allEvaluateList.length - 1 " size="small" type="primary" @click="nextPage">提交</van-button>
      </div>
    </van-form>
    </div>
  </div>
</template>

<script>
import { setSessionStorage, getSessionStorage } from "../../store/sessionStorage.js";
export default {
name: "teachUnit",
  data(){
    return {
      scrollTop : "", //自动回到顶部
      loadData : false,
      loading : false,
      showPopup : false, //显示弹出层
      finished : false,
      evaluateItmes : {}, //当前题的信息
      radioItems : [], //选择题的内容
      radioItemsR : [], //保存选择题的容器
      textAreaList : [], //保存文本域内容，但不包括Id,
      textAreaListR : [], //保存文本输入框的容器
      answerDesc : "",
      index : 0, //默认取第一个
      allEvaluateList : [], //全部的数据
      evaluateSubmit : [], //提交的数据
      isSubmit : false, //是否提交 , 关闭弹窗提示
    }
  },
  methods: {
  //顶部函数
    handleScroll(){
      this.scrollTo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    },
  //返回顶部
    goTop(){
      let timer = null, that = this;
      cancelAnimationFrame(function fn() {
        if (that.scrollTop > 0) {
          that.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop = that.scrollTop;
          timer = requestAnimationFrame(fn);
        }else{
          cancelAnimationFrame(timer);
        }
      })
    },
  //获取列表数据
    getEvaluateItmes(){
      const url = "api/department/newEdit"+"?a="+Math.random();
      this.axios.get(url).then(res => {
          this.allEvaluateList = res.data.data;
          this.evaluateItmes = this.allEvaluateList[this.index];
          this.echoValues(this.evaluateItmes);
          this.loading = false;
          this.finished = true;
      }).then(() => {
        this.showPopup = true;
      });
      this._getSeesionData();
    },
    //获取本地缓存
    _getSeesionData(){
      let radioItems = this.sessionStorage.getSessionStorage(this._getRadioKey(this.index));
      if (radioItems){
        this.radioItems = radioItems;
      }
      let textAreaListR = this.sessionStorage.getSessionStorage(this._getKey(this.index));
      if (textAreaListR){
        this.textAreaList = textAreaListR;
      }
    },
    //判断是否是数字
    descArea(){
      let textVal = this.textAreaList;
      textVal.forEach((j ,idx) => {
        if(j != null){
          let answersStr = j.split("/")[0];
          let val = Number(answersStr);
          if(isNaN(val)){
            this.$toast({
              message: "仅支持 0-9 的阿拉伯数字格式哦!",
              duration: 1500
            });
            this.textAreaList[idx] = "";
            return;
          }
          if (val > 500) {
            this.$toast({
              message: "打交道次数不能大于500哦！",
              duration: 1500
            });
            this.textAreaList[idx] = "";
            return;
          }
        }
      })
    },

    //校验输入是否为空格
    blankDescArea(){
      let textVal = this.textAreaList;
      textVal.forEach((j, idx) => {
        if (j != null){
          let answersStr = j.split("/")[0];
          if(answersStr.match(/^\s*$/)){
            this.$toast({
              message: "第" + (idx + 1) + "个部门不能为空!!",
              duration: 1500
            });
            this.textAreaList[idx] = "";
            return;
          }
        }
      })
    },
    _getKey(index){
      const key = "textAreaListR-" + index;
      return key;
    },
    _getRadioKey(idx) {
      const key = "radioKey-" + idx;
      return key;
    },
    //下一项 和下一项
    nextPage(){
      let arr = this.radioItems;
      this.radioItemsR[this.index] = arr;
      // this.loadData = true;
      this._setSessionData();
      let departments = this.evaluateItmes.departmentQuestionnaireDtoList;
      if (this.evaluateItmes.necessary == 0){
        this.unNecessaryVerify(arr, departments);
      }else if (this.evaluateItmes.necessary == 1){
        this.necessaryVerify(arr, departments);
      }
    },

    necessaryVerify(arr, departments){
      if (this.evaluateItmes.typeId == 2){
        let b = arr.join("").split("undefined");
        let n = arr.join("").split("null");
        if (b.length > 1 || n.length > 1){
          this.overMessageBox();
        }else {
          this.saveSuccess();
        }
      }else if (this.evaluateItmes.typeId == 1){
        let b = arr.join("").split("/");
        if (b.length < departments.length*3 + 1){
          this.overMessageBox();
        }else {
          this.saveSuccess();
        }
      }
    },
    //保存成功
    saveSuccess(){
      if(this.index == this.allEvaluateList.length - 1){
        this.submit();
      }else{
        const primise = new Promise((resolve) => {
          resolve(this.showToast())
        });
        primise.then(() =>{
          setTimeout((this.showPopWin),1000 );
        });
      }
    },
    //显示弹窗
    showPopWin(){
      this.showPopup = true;
      this.nextPageSize();
    },

    //显示弹出提示信息 2021-01-04新增
    showToast(){
      if(this.index == this.allEvaluateList.length - 1){
        this.$dialog.alert({
          title:'提示',
          message:'还有项目未填写完毕，请填写完毕再提交'
        });
        return;
      }else{
        this.$toast.success({
          message: "你的评价信息已经被保存",
          duration: 600
        })
        this.goTop();
      }
    },

    overMessageBox(){
      if(this.index == this.allEvaluateList.length - 1){
        this.$dialog.alert({
          title : '提示',
          message : '还有项目未填写完毕，请填写完毕再提交'
        });
        return;
      }else{
        this.$dialog.alert({
          title : '提示',
          message : '还有项目未填写完毕，请填写完毕再进入下一项'
        });
        return;
      }
    },
    unNecessaryVerify(arr, departments){
      if(this.evaluateItmes.typeId == 2){
        let b = arr.join("").split("undefined");
        let n = arr.join("").split("null");
        if (b.length > 1 || n.length > 1){
          this.nextMessageBox();
        }else {
          this.saveSuccess();
        }
      }else if (this.evaluateItmes.typeId == 1){
        let b = arr.join("").split("/");
        if (b.length < departments.length * 3 + 1){
          this.nextMessageBox();
        }else {
          this.saveSuccess();
        }
      }
    },
    //提交功能
    submit(){
      let arr = this.radioItems;
      this.radioItemsR[this.index++] = arr;
      for(let i=0;i<this.index;++i){
        let radioItems = this.radioItemsR[i];
        radioItems.forEach(j => {
          if(j != null){
            let answersArr = j.split("/");
            if(answersArr[2] == ""){
              answersArr.splice(2,1);
              this.evaluateSubmit.push({
                questionnaireId: answersArr[0],
                evaluatedDepartmentId: answersArr[1],
                answerDesc: answersArr[2],
                answerId: answersArr[3]
              })
            }else {
              this.evaluateSubmit.push({
                questionnaireId: answersArr[0],
                evaluatedDepartmentId: answersArr[1],
                answerDesc: answersArr[2],
                answerId: answersArr[3]
              })
            }
          }
        });
      }
      this.axios({
        url: "api/department/submit",
        method: "post",
        data: { answers: this.evaluateSubmit },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.evaluateSubmit = [];
        this.isSubmit = true;
        console.log('res 的值',res)
        if (res.data.code == 0){
          this.$dialog.confirm({
            title:'恭喜',
            message: '你的评价提交成功!'
          }).then(() => {
            this.$router.push("/page/home");
          });
          return;
        }else{
          this.$dialog.alert({
            title : '提示',
            message : res.data.message
          });
          return;
        }
      });
    },
    nextMessageBox(){
      if(this.index == this.allEvaluateList.length - 1){
        this.$dialog.confirm({
          title : '提示',
          message : '检测到当前还有项目未填写完毕，是否确定提交?',
        }).then(() => {
          this.submit();
        }).catch(() => {})
      }else {
        this.$dialog.confirm({
          message : '检测到当前还有项目未填写完毕，是否确定进入下一项?',
          title : '提示'
        }).then(() =>{
          this.nextPageSize();
        }).catch(() => {});
      }
    },

    //下一页
    nextPageSize(){
      this.index++;
      this.radioItems = [];
      this.textAreaList = [];
      this.evaluateItmes = this.allEvaluateList[this.index];
      this.echoValues(this.evaluateItmes);
      this._getSeesionData();
    },
    //上一项
    backPage(){
      if(this.index == this.allEvaluateList.length - 1)
      {
        let arr = this.radioItems;
        this.radioItemsR[this.index] = arr;
        this._setSessionData();
      }
      this.index--;
      this.showPopup = true;
      this._getSeesionData();
      this.evaluateItmes = this.allEvaluateList[this.index];
    },
    _setSessionData(){
      this.sessionStorage.setSessionStorage(
          this._getRadioKey(this.index),
          this.radioItems
      );
      this.sessionStorage.setSessionStorage(
          this._getKey(this.index),
          this.textAreaList
      );
    },
    echoValues(item){
      let itemlist = item.departmentQuestionnaireDtoList;
      if(item.typeId == 1){
        let radioEchoData = [];
        itemlist.forEach(j => {
          if (j.checkDesc == null || j.checkDesc == null){
            radioEchoData.push(null);
          }else{
            radioEchoData.push(`${this.index + 1}/${j.depid}/${j.checkDesc}/${j.checked}`);
          }
        });
        this.radioItems = radioEchoData;
      }
      if(item.typeId == 2){
        let textEchoData = [];
        itemlist.forEach(k => {
          if (k.checkDesc == null) {
            textEchoData.push('');
          } else {
            textEchoData.push(k.checkDesc);
          }

        });
        this.textAreaList = textEchoData;
      }
    },

  },
  created() {
    this.getEvaluateItmes();
  },
mounted(){
  window.addEventListener("scroll",this.handleScroll);
},
  destroyed(){
    window.removeEventListener("scroll", this.handleScroll);
  },
}
</script>
