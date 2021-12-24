<template>
  <div style="background-color:#fff;" class="">
    <div>
      <van-cell is-link title="按评价结果分类下载" @click="show = true" icon="down"></van-cell>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect"></van-action-sheet>
      <van-cell is-link title="按参评率分类下载" @click=" showRate = true" icon="down"></van-cell>
      <van-action-sheet v-model=" showRate " :actions="actionRate" @select="selectRate"></van-action-sheet>

<!--      按评价详情下载-->
      <van-cell is-link title="按评价详情下载" @click=" showDetail = true" icon="down"></van-cell>
      <van-action-sheet v-model = "showDetail" :actions="actionDetail" @select="selectDetail"></van-action-sheet>
    </div>

  </div>
</template>

<script>
export default {
name: "departentDownLo",
  data(){
  return {
    actions : [
      { name : "全部人员评价统计结果", tag : "0"},
      { name : "中层领导评价统计结果", tag : "1"},
      { name : "教工代表评价统计结果", tag : "2"},
      { name : "普通教师评价统计结果", tag : "3"},
    ],
    actionRate : [
      { name : "参评率统计结果", tag : "0"}
    ],
    refreshing : false,
    finished : false,
    show : false,
    showRate : false,
    showDetail : false, //评价详情下载显示 2020-12-11新增
    actionDetail :[
      { name : '机关教辅各单位服务作风的意见和建议', tag : "0"}
    ]
    }
  },
  methods:{
  //文件下载
    fileDownload(data, fileName){
      let blob = new Blob([data], {
        type : "application/octet-stream"
      });
      let filename = fileName || "filename.xls";
      if (typeof window.navigator.msSaveBlob !== "undefined"){
        window.navigator.msSaveBlob(blob, filename);
      }else {
        var blobURL = window.URL.createObjectURL(blob);
        var temLink = document.createElement("a");
        temLink.style.display = "none";
        temLink.href = blobURL;
        temLink.setAttribute("download", filename);
        if (typeof temLink.download === "undefined"){
          temLink.setAttribute("target", "_blank")
        }
        document.body.appendChild(temLink);
        temLink.click();
        document.body.removeChild(temLink);
        window.URL.revokeObjectURL(blobURL);
      }
    },
    //2020-12-11新增 参评率下载
    selectRate(){
      this.showRate = false;
      let url = `api/department/statistics/downloadParticipation`;
      this.$axios({
        method : "get",
        url : url,
        responseType : "blob"
      }).then(function (res){
        let filename = "参评率统计结果" + '.xls';
        this.fileDownload(res.data, filename);
      }.bind(this)).catch(function (err){
        alert(err)
      }.bind(this))
    },
    //机关教辅单位
    selectDetail(){
      let url = `api/department/statistics/downloadEvaluatedDetail`;
      this.$axios({
        method : "get",
        url : url,
        responseType : "blob"
      }).then(function (res){
        let filename = "机关教辅各单位服务作风的意见和建议" + '.doc';
        this.fileDownload(res.data, filename);
      }.bind(this)).catch(function (err) {
        alert(err);
      }.bind(this))
    },
    onSelect(item){
      this.show = false;
      let url = `api/department/statistics/dowland?employeeClassificationId=${item.tag} `;
      this.$axios({
        method:"get",
        url : url,
        responseType : "blob"
      }).then(function (res){
        let filename = item.name + '.xls';
        this.fileDownload(res.data, filename);
      }.bind(this)).catch(function (err){
        alert(err)
      }.bind(this));
    }
  }
}
</script>

<style scoped>
  .resultContent{
    font-family: "Microsoft" !important;
    width: 80%;
    margin: 50px 10% 50px;
    padding-bottom: 5%;
    -webkit-box-shadow: 0 6px 14px #e8e8e8;
    box-shadow: 0 6px 14px #e8e8e8;
    cursor: pointer;
  }
</style>
