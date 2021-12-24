<template>
  <div>
    <van-form v-model="addForm" style="margin-top:10px;" ref="addForm">
      <van-cell title="评价开始日期和结束日期" :value="date" @click="show = true" />
      <van-calendar :min-date="new Date('1970/01/01')" v-model="show" type="range" @confirm="onConfirm">

      </van-calendar>
      <van-cell title="评价结果开始日期和结束日期" :value="confDate" @click="showConf = true" />
      <van-calendar :min-date="new Date('1970/01/01')" v-model="showConf" type="range" @confirm="onConfDate">

      </van-calendar>
      <van-cell center title="是否启用">
        <template>
          <van-switch v-model="addForm.enable">

          </van-switch>
        </template>
      </van-cell>
      <van-button type="info" block native-type="submit" @click="editTime">
        确定
      </van-button>
    </van-form>
  </div>
</template>

<script>
export default {
name: "editTime",
  data(){
    return{
      addForm: {
        enable: false,
        endAt: '',
        id: "",
        resultEndShow: "",
        resultStartShow: "",
        startAt: '',
      },
      date : '', //时间
      // date : { startAt : "", endAt : ""}, //时间
      confDate : '', //评价结果结束时间
      minDate: new Date(1970, 1, 1),
      show : false,
      showConf : false, //评价结果显示
    }
  },
  created(){
    this.addForm = this.$route.query.item;
    // .substr(5)
    // .replaceAll('-','/')
    let startAt = this.dislodgeZero(this.addForm.startAt);
    let endAt = this.dislodgeZero(this.addForm.endAt).substr(5)
    let resultStartShow = this.dislodgeZero(this.addForm.resultStartShow).substr(5)
    let resultEndShow = this.dislodgeZero(this.addForm.resultEndShow).substr(5)
    this.date = `${startAt} - ${endAt}`;
    this.confDate = `${resultStartShow} - ${resultEndShow}`;
  },
  methods: {
  //日期去掉年
    dislodgeZero(str) {
      let strArray = str.split("-");
      strArray = strArray.map(function(val) {
        if (val[0] === "0") {
          return (val = val.slice(1));
        } else {
          return val;
        }
      });
      return strArray.join("/");
    },
    //确定时间 2020-12-21新增
    editTime(){
      const url = "api/management/evaluateTime/update";
      let startAt = '';
      let endAt = '';
      let resultEndShow = '';
      let resultStartShow = '';

      startAt = this.time(this.addForm.startAt);
      endAt = this.time(this.addForm.endAt);
      resultEndShow = this.time(this.addForm.resultEndShow);
      resultStartShow = this.time(this.addForm.resultStartShow);
      this.$axios.post(url, { enable: this.addForm.enable,startAt : startAt,endAt : endAt,resultEndShow : resultEndShow, resultStartShow: resultStartShow}).then(res => {
        if (res.data.code == 0){
          this.$message({
            showClose:false,
            message:"新增成功",
            type: "success",
            center: true,
            duration: 1200,
          });
        }else{
          this.$message({
            showClose:false,
            message:res.data.message,
            type:"error",
            center: true,
            duration: 1200
          });
          return;
        }
      })
    },
    //时间格式转换
    time(date){
      if (date === ""){
        return ;
      }else if(date.length < 14){
        return date;
      }
      else{
        var y = date.getFullYear();
        var m = date.getMonth() + 1
        m = m < 10 ?'0' + m: m
        var d = date.getDate()
        d = d < 10 ? '0' + d :d
        return y + '-' + m +'-' + d
      }
    },

    onConfirm(date){
      [this.addForm.startAt, this.addForm.endAt] = date;
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onConfDate(date){
      [this.addForm.resultStartShow, this.addForm.resultEndShow] = date;
      const [start, end] = date;
      this.showConf = false;
      this.confDate = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
  },
}
</script>

