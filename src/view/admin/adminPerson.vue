<template>
  <div class="main w">
    <van-search label="姓名" shape="round" background="rgb(150, 97, 119)" show-action v-model="searchName" @input="getSearch"
                placeholder="请输入姓名">
      <template #action>
        <van-button size="small" @click="$router.push('/addInfo')" type="info" icon="plus"
                    style="margin-top: 10px;margin-left: 10px;">新增
        </van-button>
      </template>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item @change="handleDeparentChange" title="选择部门" v-model="departDown" :options="departArr">

      </van-dropdown-item>

      <van-dropdown-item @change="handleSeeResultChange" title="超级管理" v-model="manageDown" :options="manageArr">
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="right6">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list :finished="finished" finished-text="没有更多了" @load="getFreshData" :error.sync="errorData" error-text="没有数据">
          <van-row>
            <van-col span="12" v-for="(item, index) in newItems" :key="index" style="width: 100% ;">
              <div style="background : #F8F8F8; text-align : left; " v-if="item != null">
                <p style="margin-left: 10px;">所属部门：{{ item.departmentName }}</p>
                <p style="margin-left: 10px;">姓名：{{ item.name }}</p>
                <p style="margin-left: 10px;">工号：{{ item.eid }}</p>
                <p style="margin-left: 10px;">职责：{{ item.role }}</p>
                <p style="margin-left: 10px;">超级管理：
                  <template v-if="item.seeResult == false">
                    <van-icon name="minus" size="1.2rem" style="font-weight: 600;"/>
                  </template>
                  <template v-else>
                    <van-icon name="success" color="#13ce66" size="1.2rem" style=" font-weight : 600; "/>
                  </template>
                </p>
                <p style="margin-left: 10px;">
                  角色：{{ item.title == 1 ? "正职" : item.title == 2 ? "副职" : item.title == 3 ? "普通教师" : "" }}</p>
                <p style="margin-left: 10px;">中层干部：
                  <template v-if="item.midLevRepresent == true">
                    <van-icon name="success" color="#13ce66" size="1.2rem" style="font-weight : 600;"/>
                  </template>
                  <template v-else>
                    <van-icon name="minus" size="1.2rem" style=" font-weight : 600;"/>
                  </template>
                </p>
                <p style="margin-left: 10px;">教工代表：
                  <template v-if="item.tradeUnionRepresent == true">
                    <van-icon name="success" color="#13ce66" size="1.2rem" style="font-weight : 600;"/>
                  </template>
                  <template v-else>
                    <van-icon name="minus" size="1.2rem" style="font-weight : 600;"/>
                  </template>
                </p>
                <p style="margin-left: 10px;">编辑：
                  <van-button size="small" icon="edit" type="info" @click="editInfo(index,item)" text="编辑">
                  </van-button>
                  <van-button size="small" icon="minus" @click="deleteInfo(item.id)" type="danger" text="删除">
                  </van-button>
                </p>
                <van-divider/>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  inject : ['reload'],
  name: "adminPerson",
  data() {
    return {
      isLoading : false, //下拉加载
      showEdit : false, //是否显示编辑框
      loadingList: false, //是否在加载
      //编辑数据
      errorData : false, //没有数据提示
      finished: false,
      pageLen: 0, //总条数
      currentPage: 0, //当前默认加载的页码
      pageSize: 20, //页容量
      pageCount: 1,//页码数量
      depArr: [],//下拉部门
      manageArr: [
        {
          value: "",
          text: "查看全部"
        },
        {
          value: true,
          text: "是"
        },
        {
          value: false,
          text: "否"
        },
      ],//下拉超级管理
      searchName: '', //输入搜索的姓名
      departOne: 0,//部门名称第一位
      finish: true,
      nameCol: [], //名字下拉
      showName: false, //现实下拉弹出框
      showCell: false, //是否选中
      value1: "",
      name: "", //名称搜索
      departArr: [], //部门
      departmentId: "", //部门ID
      departmentData: {}, //选中的值
      userName: "",
      teachNo: "",//教职工号
      duty: "",//职责
      departName: '',//获取选中的部门名称 2020-12-16
      timeout: null, //超时设置 2020-12-16
      departDown: 0,
      manageDown: "",
      employeeList: [],
      seeResult: "",//supermanager
      newArr : [], //每次获取的人员数组
    }
  },

  methods: {
    editInfo(index,value){
      this.$router.push({ path:'/editInfo', query : { value : value}})
    },
    //2020-12-17删除一行数据
    deleteInfo(id) {
      let useId = id;
      this.$dialog.confirm({
        title: "提示",
        message: '确认删除吗?'
      }).then(() => {
        const url = `api/management/employee/delete?id=${useId}`;
        this.axios.get(url).then(res => {
          if (res.data.code == 0){
            // this.pageCount = res.data;
            this.$toast.success({
              message: "删除成功",
              duration: 900,
            });
          }else{
            this.$toast.fail({
              message: res.data.message,
              duration: 900
            });
          }
        }).then(() => {
          this.reload();
        })
      }).catch(() =>{})
    },
    //触发超级管理函数
    handleSeeResultChange(value) {
      this.manageDown = value;
      this.employeeList = [];
      this.setContextData("manageDown", this.manageDown);
      let pageVal = 1;
      this.handleCurrentChange(pageVal);
    },
    //触发搜索姓名
    getSearch(){
      let i = 0;
      this.currentPage = 0;
      let x = Math.ceil(this.pageLen / this.pageSize);
      while(i <  x  ){
        if (JSON.stringify(this.newArr) !== "[]") {
          this.getEmployeeList();
        }
          i++;
      }
    },
    //触发选择部门函数
    handleDeparentChange(depId) {
      this.departmentId = depId;
      this.employeeList = [];
      this.departmentData = this.departArr.find(item => {
        return item.value === depId;
      });
      this.setContextData("departDown", this.departmentData.text);
      this.setContextData("departmentId", this.departmentId);
      let pageVal = 1;
      this.handleCurrentChange(pageVal);
    },
    handleCurrentChange(pageVal) {
      this.currentPage = pageVal;
      this.setContextData("currentPage", this.currentPage);
      this.getEmployeeList();
    },
    //下拉刷新函数
    onRefresh(){
      setTimeout(() => {
        this.getEmployeeList();
      })
    },
    //获取列表条数
    getListCount() {
      const url = `api/management/employee/listCount?departmentId=${
          this.departmentId
      }&employeeName=${this.searchName}&seeResult=${
          this.manageDown
      }&currentPage=${this.currentPage}&pageSize=20`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          this.pageLen = res.data;
          // this.pageCount = Math.ceil(this.pageLen / this.pageSize);
        }
      })
    },
    //获取下拉数据
    getFreshData(){
      if (this.employeeList.length < this.pageLen && JSON.stringify(this.newArr) !== "[]") {
        this.getEmployeeList();
      }
    },
    //员工列表
    getEmployeeList() {
      let that = this;
      this.newArr = [];
      let obj = {};
      const url = `api/management/employee/list?departmentId=${
          this.departmentId
      }&employeeName=${this.searchName}&seeResult=${
          this.manageDown
      }&currentPage=${++this.currentPage}&pageSize=20`;
        this.axios.post(url).then(res => {
          this.newArr = res.data.data;
          if (res.data.data !== []) {
            that.employeeList = that.employeeList.concat(res.data.data);
            // that.unique(that.employeeList)
            //数组去重 2021-01-18新增
            that.employeeList = that.employeeList.reduce(function(item, next) {
              obj[next.name] ? '' : obj[next.name] = true && item.push(next);
              return item;
            },[]);
            that.isLoading = false;
          }
        }).catch(err => {
          this.errorData = true;
        })
    },
    //搜索名称列表
    searchList(val) {
      this.userName = val;
      let pageVal = 1;
      this.employeeList = [];
      this.handleCurrentChange(pageVal);
    },

    //确认名称 2020-12-17
    confName(value) {
      this.showName = false;
      this.userName = value;
      let tmpData;
      tmpData = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(value)
      this.teachNo = tmpData[2];
    },
    //搜索名称
    querySearchAsync() {
      this.showName = true;
      var list = [{}];
      const url = `api/management/employee/listSystemEmployee?searchName=${
          this.userName
      }`;
      if (this.nameCol != []) {
        this.nameCol = [];
        this.axios.post(url).then(res => {
          for (let i of res.data) {
            i.value = i.employeeName + "(" + i.employeeId + ")";
          }
          list = res.data;
          list.forEach(item => {
            this.nameCol.push(item.value)
          })
        }).catch(err => {
          console.log(err)
        });
      }
    },
    //获取部门名称
    getDepart(value) {
      this.departArr.forEach(item => {
        if (item.value == value) {
          this.departName = item.text;
        }
      })
    },
    //给sessionStorage存值
    setContextData: function (key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function (key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (err) {
          return str;
        }
      }
      return;
    },
    getDepartmentList() {
      const url = `api/management/employee/listDepartment`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          let depList = res.data;
          let allDep = {
            text: "查看所有部门",
            value: ""
          };
          let tempArr = [];
          depList.map(item => {
            tempArr.push({text: item.name, value: item.depid})
          })
          tempArr.unshift(allDep);
          this.departArr = tempArr;
        }
      })
    }
  },

  //监听数组变化
  computed:{
    newItems(){
      let that = this;
      var newItems = [];
      // var pyArr = [];
      // //1.获取拼音数组
      // that.employeeList.map(function(item){
      //   pyArr.push(that.$pinyin.getFullChars(item.name))
      // })
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
    this.departmentId = this.getContextData("departmentId") || ""; //部门id
    // this.currentPage = this.getContextData("currentPage") || 0;
    this.manageDown = this.getContextData("manageDown") || ""; //是否超级管理员
    this.departDown = this.getContextData("departDown") || ""; //选择部门
    this.getListCount();
    this.getDepartmentList();
    this.getEmployeeList();
  }
}
</script>


