<template>
  <div>
    <van-form v-model="addForm" ref="addForm">
      <van-cell title="评价开始和结束日期" :value="date" @click="show = true" />
        <van-calendar :min-date="new Date('1970/01/01')" v-model="show" type="range" @confirm="onConfirm">

        </van-calendar>
      <van-cell title="评价结果开始和结束日期" :value="confDate" @click="showConf = true" />
      <van-calendar :min-date="new Date('1970/01/01')" v-model="showConf" type="range" @confirm="onConfDate">

      </van-calendar>
      <van-cell center title="是否启用">
        <template>
          <van-switch v-model="addForm.enable">

          </van-switch>
        </template>
      </van-cell>
      <van-button type="info" block native-type="submit" @click="addTime">
        确定
      </van-button>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "newTime",
  data(){
    return{
      minDate: new Date(1970, 1, 1),
      show : false,
      showConf : false, //评价结果显示
      addForm: {
        enable: false,
        endAt: '',
        id: "",
        resultEndShow: "",
        resultStartShow: "",
        startAt: '',
      },
      date : '', //时间
      confDate : '', //评价结果结束时间
    }
  },
  methods: {
    //确定时间 2020-12-21新增
    addTime(){
      const url = "api/management/evaluateTime/insert";
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
      } else{
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


