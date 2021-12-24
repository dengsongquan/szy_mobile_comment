<template>
    <div class="downCompent">
      <van-loading v-if="loading" style="margin-left: 45%;z-index: 99999;" color="#1989fa" />
      <van-cell title="点击选择日期导出结果" :value="date" @click="show = true"></van-cell>
      <van-calendar :min-date="new Date('1970/01/01')" v-model="show" type="range" @confirm="onConfirm"></van-calendar>
      <van-button icon="down" type="info" style="float: right;margin-top: 20px;" @click="handleDown()" >下载</van-button>
      <van-overlay :show="loading"></van-overlay>
    </div>
</template>

<script>
export default {
name: "selfDownLo",
  data(){
    return{
      loading : false, //遮罩隐藏
      date : '',
      show: false,
      startTime: "", //开始时间
      endTime: "", //结束时间
    }
  },
  methods:{
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
        var h = date.getHours()
        h = h < 10 ? '0' + h : h
        var minute = date.getMinutes()
        minute = minute < 10 ? '0' + minute : minute
        var second = date.getSeconds()
        second = second < 10 ? '0' + second : second
        return y + '-' + m +'-' + d+' ' + h + ':' + minute +':' + second
      }
    },
    onConfirm(date){
      [this.startTime,this.endTime] = date;
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    },
    formatDate(date){
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    getUploadStatus(fileName){
      let url = `api/message/getUploadStatus?fileName=${fileName}`;
      this.axios(url).then(res => {
        if (res.data.data == 1){
          this.handleDownFileName(fileName);
        }else {
          setTimeout(() => {
            this.getUploadStatus(fileName)
          },5000);
        }
      }).catch(err => {
        this.postError(err)
      })
    },
    handleDownFileName(fileName){
      let url =`api/common/downlandByFileName?fileName=${fileName}`;
      this.$axios({
        method : "get",
        url : url,
        responseType : "blob"
      }).then(res => {
        var filenames = fileName.replace("personalStatisticResult","日常评价结果");
        this.fileDownload(res.data, filenames);
        this.loading = false;
      }).catch(err => {
        this.postError(err)
      })
    },
    fileDownload(data, name){
      let blob = new Blob([data], { type: "application/octet-stream"});
      let filename = name || "日常评价结果.xls";
      if (typeof window.navigator.msSaveBlob !== "undefined"){
        window.navigator.msSaveBlob(blob, filename);
      }else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined"){
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL)
      }
    },
    postError(err){
      this.loading = false;
      this.$alert(err.message, "错误",{
        confirmButtonText : "确定",
        type : "error"
      });
    },
    //下载文件 2021-01-05新增
    handleDown(){
      let start = this.time(this.startTime)
      let end = this.time(this.endTime)
      if (this.startTime === ""){
        this.$toast("日期为空")
      } else {
        this.loading = true;
        let url = `api/message/getDownloadName?startTime=${
            start
        }&endTime=${end}`;
        this.$axios({
          method : "GET",
          url : url
        }).then(res => {
          this.getUploadStatus(res.data.data);
        }).catch(er => {
          this.postError(er)
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
  .demonstration{
    font-size: 1rem;
    margin-right: 5px;
  }
</style>
