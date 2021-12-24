<template>
    <div class="main w">
      <div class="mainTitle">
        <van-search label="姓名" shape="round" background="rgb(150, 97, 119)" v-model="searchName" placeholder="请输入姓名">
        </van-search>
        <div class="rightTop">
          <span>当前单位:</span>
          <span class="depName">{{findEmployee.departmentName}}</span>
        </div>
        <div class="right6">
          <div class="personList">
            <van-grid :column-num="2" >
              <van-grid-item v-for="(value,index) in newItems" :key="index" style="width:0;">
                <div class="photo" @click="goDetailPage(value.eid,value.departmentId)">
                  <van-image width="8rem" height="10rem" :src="imgSrc +value.eid"></van-image>
                </div>
                <p>姓名:{{value.name}}</p>
                <p @click="changeRole(value.role)">点击查看职责:</p>
                <van-popup position="bottom" :style="{ height: '30%' }" v-model="showRole" :overlay-style="{ backgroundColor: 'rgba(0, 0, 0,0.1)'}">
                  <p style="margin-left: 10px;">{{role}}</p>
                </van-popup>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <!--<van-overlay :show="loadData"></van-overlay>-->
      </div>
    </div>
</template>
<script>
import bus from "../../components/common";
import api from "../../util/api.js";
export default {
name: "personList",
  data(){
    return{
      showRole : false, //是否显示职责弹出框
      itemClass : 0,
      tabActive : 0,
      employeeList : [],//员工列表
      findEmployee : [],
      depIds : '', //部门id
      imgSrc : api.findImage,
      headPortrait: 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      role : "" ,//现实职责 2020-12-17
      searchName : '',//搜索名称
      loadData : false, //加载数据
    }
  },
  methods: {
  changeRole(value){
    this.showRole = true;
    this.role = value;
  },
  //日常评价 2020-12-15新增
    goDetailPage(employeeId, departmentId){
      this.$router.push({
        name:"personResult",
        params:{
          eid: employeeId,
          departmentId: departmentId
        }
      })
    },
    //部门列表
    personList() {
      bus.$on("depFirstId", firstId => {
        const url = `api/employee/statistics/getEmployees?departmentId=${firstId}`;
        this.axios.post(url).then(res => {
          if (res.data.data != null){
              this.findEmployee  = res.data.data;
              this.employeeList = res.data.data.employeeList;
          }
        })
      })
    },

    //获取部门列表
    getDepId(){
      this.depIds = this.$route.params.depId;
      const url =  `api/employee/statistics/getEmployees?departmentId=${
          this.depIds
      }`;
      this.axios.post(url).then(res => {
        if (res.data.data == null){
          this.employeeList = [];
        }
        if (res.data.data != null){
          this.findEmployee = res.data.data;
          this.employeeList = res.data.data.employeeList;
        }
      })
    },
  },
  watch : {
    $route: function (newVal, oldVal) {
      this.getDepId();
    }
  },
  computed:{
    newItems(){
      let that = this;
      var newItems = [];
      var pyArr = [];
      //1.获取拼音数组
      that.employeeList.map(function(item){
        pyArr.push(that.$pinyin.getFullChars(item.name))
      })
      //2.数组比较
      if(escape(that.searchName).indexOf("%u") == -1 && that.searchName != '')
      {
        that.employeeList.map(function(item){
          if(that.searchName == that.$pinyin.getFullChars(item.name).toLowerCase() || that.$PinYinMatch.match(item.name,that.searchName)){
            newItems.push(item);
          }
        })
      }else{
        that.employeeList.map(function(item){
          if(item.name.search(that.searchName) != -1){
            newItems.push(item);
          }
        });
      }
      return newItems;
    }
  },
  created() {
    this.getDepId();
    this.personList();
  }
}
</script>
