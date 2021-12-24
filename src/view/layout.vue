<template>
  <div id="top" >
    <van-dialog v-model="sendVal" title="提示" :message="hintMessage" show-cancel-button confirmButtonText="查看" @confirm="clickConfirm">
    </van-dialog>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/page/home">主页</van-tabbar-item>
      <van-tabbar-item icon="down" replace to="/downloadResult" v-if="this.$store.state.isSeeMessageCenter">下载结果</van-tabbar-item>
      <van-tabbar-item icon="comment-o" replace to="/personResultList" v-if="this.$store.state.isSeeMessageCenter">消息中心</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/management" v-if="this.$store.state.isSeeMessageCenter">后台管理</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<script>
  import api from "../util/api.js";
  const sc = require("../../js/http_isz-web");
  export default {
  name : "layout",
  data(){
    return {
      loading : false, //遮罩隐藏
      userName : "" , //用户信息
      hintMessage : "" , // 弹窗消息
      actions : [ { text : '下载日常评价结果', path : '/selfDownLo'}, { text:'下载集体评价结果', path : '/departentDownLo'} ],
      showResult : false,//显示下载结果
      active : 0,
      downloadResult : 0,
      downloadArr : [
        { text : '下载日常评价结果' , value : 0 , url : '/selfDownLo'},
        { text : '下载集体评价结果' , value : 1, url : '/departentDownLo'},
      ],
      fPage : [
        { text : '首页', value:0}
      ],
      messageCenter : [
        { text : '消息中心', value : 0}
      ],
      manegeArr : [
        { text : '人员管理', value : 0, url:'/adminPerson'},
        { text : '部门管理', value : 1, url:'/adminDepartment'},
        { text : '时间管理', value : 2, url:'/adminTime'},
        { text : '题目管理', value : 3, url:'/adminQuestion'},
      ],
      sendVal : false, // 提示弹窗
      list : [
        { id : 0, image : require('../assets/szylogo.png') }
      ],
      initCode : null, //初始化code 2021-01-12新增
      requestCode : null, //请求code 2021-01-12新增
      userAccessToken : null, //用户权限code 2021-01-12新增
    }
  },
  methods : {
    //获取用户登陆信息
    login(){
      let that = this;
      that.axios.get('api/evaluate/currentUser').then(res => {
        if (res.data == null || res.data == "") {
          that.$toast.fail({
            message :  '系统检测到你的账号没有评价权限,请联系管理员' ,
            duration : 1000
          });
          setTimeout(() => {
            window.location.href = api.logout; // 跳转退出
          }, 3000);
          return;
        }else {
                that.initWebSocket();
                that.getfilterInfo();
                that.$store.state.isSeeMessageCenter = res.data.seeResult;
                that.$store.state.currentUserEid = res.data.eid;
        }
      })
    },
    //获取初始code 2021-01-12新增
    getInitCode(){
      let that = this;
      const url = `/isz/initCode`;
      that.axios.post(url).then( res => {
        if (res.data.code == 200) {
          that.initCode = res.data.data.initCode
        }
        sc.config({
          debug : false,
          appId : '422101a4e10d4795bd8efb707e61b17d',
          initCode : that.initCode
        });
        sc.ready(function() {
          sc.userAuth({ appId : '422101a4e10d4795bd8efb707e61b17d'}, function (res3) {
            if (res3.code === 0){
              that.requestCode = res3.data.requestCode;
              that.getRequestCode()
            }
          })
        });
        sc.error(function(res) {
          console.log(res)
        })
      })
    },
    getRequestCode(){
      let that = this;
      let formData = new FormData();
      formData.append('requestCode', this.requestCode);
          that.axios.post('/isz/checkRequestCode',formData).then( res => {
            if (res.data.code === 200) {
              that.userAccessToken = res.data.data.userAccessToken
              that.getUserInfo();
            }
      })
    },
    //获取用户信息
    getUserInfo(){
      let that = this;
      let formData = new FormData();
      formData.append('userAccessToken',that.userAccessToken);
          that.axios.post('/isz/getUserInfo',formData).then(res => {
            if (res.data.code === 200) {
              // that.userName = res.data.data.userName;
              setTimeout(() => {
                that.login();
              },500)

            }
          })
    },
    //集体评价权限
    getfilterInfo(){
      let that = this;
      return new Promise(function() {
        setTimeout(() => {
          that.axios('api/evaluate/filterInfo').then(res => {
            that.$store.state.seeResult = res.data.seeResult;
          })
        },500)
      })
    },
    //获取初始化信息
    initWebSocket(){
      let that = this;
      let websock = new WebSocket(api.message);
      return new Promise(function() {
        setTimeout(() => {
          websock.onmessage = e => {
            let wsData = e.data.split("&");
            if (wsData[0] == 1) {
              that.hintMessage = "你有" + wsData[1] + "条新的离线消息";
            }else {
              that.hintMessage = "有一条新的评价消息";
            }
            setTimeout(() => {
              that.openMask();
            },1000);
          };
        }, 3000)
      })
    },
    onSelect(action){
      this.$router.push(action.path)
    },
    //弹窗组件
    openMask(){
      this.sendVal = true;
      setTimeout(() => {
        this.sendVal = false;
      },10000);
    },
    //确认
    clickConfirm(){
      this.$router.push("/personResultList");
      this.sendVal = false;
    },
    //退出
    logout(){
      this.$dialog.confirm({
        title : '提示',
        message :  '确定要退出吗？' ,
      }).then(() => {
        sessionStorage.clear(); //退出之前先清空sessionStorage
        window.location.href = api.logout; //登出跳转
      });
    },
    exit(){
      this.$router.go(-1)
    },
    //主页跳转
    goHome(){
      this.$router.push({path:'/page/home'})
    },
  },
  //关闭弹窗提示
  beforeRouteLeave(to, from, next){
      next();
  },
  created(){
    this.getInitCode();
    // this.login();
  },
}
</script>

<style scoped>
</style>
