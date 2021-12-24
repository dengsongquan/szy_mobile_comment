<template>
  <div class="main">
    <div class="peosonResultTitle">
      <van-search label="姓名" shape="round" background="rgb(150, 97, 119)" v-model="searchName" @focus="getTmpArr"
                  placeholder="请输入姓名">
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item title="选择是否满意" @change="handleSatisfyChange" v-model="pleasure" :options="pleasureArr">
        </van-dropdown-item>

        <van-dropdown-item title="选择部门" v-model="depart" @change="handleDeparentChange" :options="departArr">
        </van-dropdown-item>

        <van-dropdown-item title="是否已读" v-model="isRead" :options="readArr" @change="handleIsRead" @open="getPersonResultList">
        </van-dropdown-item>
      </van-dropdown-menu>
    <div class="right2">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list @load="getRefreshData" :finished="finished" finished-text="没有更多了" :error.sync="errorData" error-text="没有数据">
            <van-row>
              <van-col span="12" v-for="(item, index) in newItems" :key="index" style="width: 100% ;">
                <div style="background : #F8F8F8; text-align : left;" @click="goPersonResult(item.employeeId, item.departmentId)">
                  <p style="margin-left: 10px;">时间：{{ item.time }}</p>
                  <p style="margin-left: 10px;">姓名：{{ item.name }}</p>
                  <p style="margin-left: 10px;">所属部门：{{ item.departmentName }}</p>
                  <p style="margin-left: 10px;">满意(次)：{{ item.satisfiedCount }}</p>
                  <p style="margin-left: 10px;">不满意(次)：{{ item.unSatisfiedCount }}</p>
                  <p style="margin-left: 10px;">是否已读：{{ item.isRead == true  ?  "已读"  :  "未读" }}</p>
                  <van-divider />
                </div>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personResultList",
  data(){
    return{
      errorData : false, //没有数据提示
      userName:'',//搜索参数
      searchName : '',//搜索条件
      name :"姓名：",
      isShow : false, //弹出框是否显示
      pleasure : 0,
      personList : [],
      perPage: 10,
      depart : 0,
      isRead : 0,
      pleasureArr : [
        {
          value: 0,
          text: "查看全部"
        },
        {
          value: 1,
          text: "不满意"
        },
        {
          value: 2,
          text: "满意"
        }
      ],// 是否满意
      departArr : [], //选择部门
      readArr : [
        {
        value : 0,
        text : "全部"
        },
        {
          value : 1,
          text : "已读"
        },
        {
          value : 2,
          text : "未读"
        }
      ], //是否已读
      loading : false,
      finished : false,
      isLoading : false, //下拉是否加载
      pageLen : 0, //总条数
      currentPage : 0, //当前默认加载的页码 下表从0开始
      pageSize : 10, //页容量
      pageCount : 1,//页码数量
      isSatisfied : "", //是否满意
      departmentId : "", //部门ID
      departmentName : "",//部门name
      headList : [],//表头
      departmentData : {},// 选中的值
      read : 0, //判断是否已读
      newArr : [] ,//获取新数组
      tmpArr : [], //缓存数组
      tmpLen : 0, //获取递增的长度
    }
  },
  methods:{
    //选择部门
    handleDeparentChange(depId){
      this.departmentId = depId;
      this.departmentData = this.departArr.find(item => {
        return item.value === depId;
      });
      this.setContextData("departmentName", this.departmentData.text);
      this.setContextData("departmentId", this.departmentId);
      this.personList = [];
      let currentPage = 0;
      this.handleCurrentChange(currentPage);
    },
    //是否已读
    handleIsRead(value){
      this.read = value;
      this.setContextData("isRead", this.read);
      this.personList = [];
      let currentPage = 0;
      this.handleCurrentChange(currentPage);
    },
    //获取全部数组
    getTmpArr(){
      let i = 0;
      let x = Math.ceil(this.pageLen / this.pageSize)
      if (this.searchName == "") {
        this.currentPage = 0;
      }
      if (this.personList.length < this.pageLen -1) {
        while ( i < x) {
            this.getPersonResultList();
          i++;
        }
      }
    },
    //自动聚焦搜索
    getSearch(){
      let i = 0;
      this.currentPage = 0;
      let x = Math.ceil(this.pageLen / this.pageSize);
      while(i <  x){
        if (this.tmpLen < x) {
          this.getPersonResultList();
        }
        i++;
      }
    },
    //选择是否满意
    handleSatisfyChange(value){
      if (value === 2){
        value = false
      }else if (value === 1){
        value = true
      }else if (value === 0){
        value = "";
      }
      this.isSatisfied = value;
      this.setContextData("isSatisfied", this.isSatisfied);
      this.personList = [];
      // this.isRead = this.read;
      // this.setContextData("currentPage", this.currentPage);
      let currentPage = 0;
      this.handleCurrentChange(currentPage);
    },
    //分页切换 2021-01-04新增注释
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.isRead = this.read;
      this.setContextData("currentPage", this.currentPage);
      this.getPersonResultList();
    },
    //跳转到详情界面
    goPersonResult(eid,departmentId){
      this.$router.push({
        name : "personResult",
        params:{
          eid : eid,
          departmentId : departmentId
        }
      });
    },
    getVestinList(){
      this.axios.get("api/employee/statistics/getDepartments").then(res => {
        let depList = res.data;
        let allDep = {
          text  :  "查看所有部门",
          value  :  "",
        }
        let tempArr = [];
        depList.map(item => {
          tempArr.push({ text : item.name, value : item.depid})
        })
        tempArr.unshift(allDep);
        this.departArr = tempArr;
      })
    },

    //下拉刷新
    onRefresh(){
      let that = this;
      setTimeout(() => {
        that.pageLen = 0;
        that.getPersonResultList();
      })
    },
    //获取刷新数据
    getRefreshData(){
      if (this.personList.length < this.pageLen && JSON.stringify(this.newArr) !== "[]") {
        this.getPersonResultList();
      }
    },
    //获取人员信息列表 2020-12-31新增
    getPersonResultList(){
      this.newArr = [];
      let obj = {};
      let that = this;
      const url = `api/message/list?pageSize=${this.pageSize}&pageNumber=${
          ++this.currentPage
      }&departmentId=${this.departmentId}&isSatisfied=${this.isSatisfied}`;
      this.axios.post(url).then(res => {
        this.newArr = res.data;
        if (res.data !== []) {
          this.personList = this.personList.concat(res.data);
          that.personList = that.personList.reduce(function(item, next) {
            obj[next.name] ? '' : obj[next.name] = true && item.push(next);
            return item;
          },[]);
          //数组过滤 已读 未读
          if (this.read === 1){
            this.personList = this.personList.filter(item => item.isRead === true);
          }else if (this.read === 2){
            this.personList = this.personList.filter(item => item.isRead === false)
          }
          this.isLoading = false;
          this.setContextData('personList',this.personList)
        }
      }).catch(err => {
        this.errorData = true
      });
      // this.getPageLen();
    },
    //获取评论总数
    getPageLen(){
      const url = `api/message/countAll?departmentId=${this.departmentId}&isSatisfied=${this.isSatisfied}`;
      this.axios.post(url).then(res => {
        this.pageLen = res.data;
      })
    },
    getContextData : function (key){
      const str = sessionStorage.getItem(key);
      if (typeof str == "string"){
        try{
          return JSON.parse(str);
        } catch (e){
          return str;
        }
      }
      return ;
    },
    setContextData : function (key ,value){
      if (typeof value == "string"){
        sessionStorage.setItem(key, value);
      }else {
        sessionStorage.setItem(key, JSON.stringify(value))
      }
    },
  },

  created() {
    // this.isSatisfied = this.getContextData("isSatisfied") || '';
    this.pageSize = this.getContextData("pageSize") || 10;
    this.personList = this.getContextData("personList") || [];
    // this.currentPage = this.getContextData("currentPage") || 1;
    // this.departmentId = this.getContextData("departmentId") || "";
    this.getPageLen();
    this.getVestinList();
  },
  activated(){
    this.getPersonResultList();
  },
  //监听数组变化
  computed: {
    newItems(){
      let that = this;
      var newItems = [];
      //数组比较
      if(escape(that.searchName).indexOf("%u") == -1 && that.searchName != ''){
        that.personList.map(function(item){
          if(that.searchName == that.$pinyin.getFullChars(item.name).toLowerCase() || that.$PinYinMatch.match(item.name,that.searchName)){
            newItems.push(item);
          }
        })
      } else {
        that.personList.map(function(item){
          if(item.name.search(that.searchName) != -1){
            newItems.push(item);
          }
        });
      }
      return newItems;
    }
  },
}
</script>

<style lang="less" scoped>
  .vant-table{
    height: 440px;
    overflow: scroll;
    .table {
      border-radius: .185185rem;
      .th {
        height: 1.074074rem;
        line-height: 1.074074rem;
        background-color: #393943;
        text-align: center;
        border-top-left-radius: .185185rem;
        border-top-right-radius: .185185rem;
      }
      .list-tr {
        height: 1.074074rem;
        line-height: 1.074074rem;
      }
      .list-tr:nth-child(2n) {
        background-color: #33333b;
      }
    }
  }
</style>
