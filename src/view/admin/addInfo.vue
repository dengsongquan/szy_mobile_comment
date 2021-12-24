<template>
  <div class="main w">
    <div class="right5">
      <van-form v-model="addForm" ref="addForm">
        <van-cell center title="部门名称">
          <template>
            <van-dropdown-menu :rules="[{required : true, message : '请选择部门名称'}]">
              <van-dropdown-item :title="departName" v-model="addForm.departmentId" :options="departArr"
                                 @change="getDepart(addForm.departmentId)">
              </van-dropdown-item>
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-field @focus="querySearchAsync" @input="querySearchAsync" v-model="addForm.name" label="姓名" id="name"
                   placeholder="用户名">
        </van-field>
        <van-field required :rules="[{ required: true, message: '请填写教职工号' }]" v-model="addForm.eid" label="教职工号">
        </van-field>
        <van-popup position="bottom" v-model="showName" :overlay="true" :get-container="getContainer" :style="{height : '60%'}">
          <van-picker
                  :columns="nameCol"
                  show-toolbar
                  @cancel=" showName = !showName"
                  @confirm="confName">
          </van-picker>
        </van-popup>
        <van-field v-model="addForm.priority" label="排序" required :rules="[{ required: true, message: '请填写' }]"
                   placeholder="排序">
        </van-field>
        <van-field v-model="addForm.role" label="职责" placeholder="职责" required
                   :rules="[{ required: true, message: '请填写职责' }]">
        </van-field>

        <van-cell center title="是否超级管理">
          <template>
            <van-switch v-model="addForm.seeResult">
            </van-switch>
          </template>
        </van-cell>

        <van-cell center title="是否中层干部">
          <template>
            <van-switch v-model="addForm.midLevRepresent">
            </van-switch>
          </template>
        </van-cell>

        <van-cell center title="是否教工代表">
          <template>
            <van-switch v-model="addForm.tradeUnionRepresent">
            </van-switch>
          </template>
        </van-cell>

        <van-cell center title="是否参与统计">
          <template>
            <van-switch v-model="addForm.statistic">
            </van-switch>
          </template>
        </van-cell>

        <van-cell center title="是否被评价">
          <template>
            <van-switch v-model="addForm.isEvaluated">
            </van-switch>
          </template>
        </van-cell>

        <van-cell title="部门职务">
          <van-radio-group v-model="addForm.title" direction="horizontal">
            <template>
                <van-radio name="1">正职</van-radio>

                <van-radio name="2">副职</van-radio>

                <van-radio name="3">普通教师</van-radio>
            </template>
          </van-radio-group>
        </van-cell>
        <div style="margin-top:10px;">
          <van-button type="info" block native-type="submit" @click="submitInfo">
            提交
          </van-button>
          <van-button type="warning" block  @click="clearAll('addForm')" style="margin-top:10px;">
            重置
          </van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "addInfo",
  data(){
    return{
      nameCol: [], //名字下拉
      departArr : [],//下拉数组
      departName : "",
      formInfo:{},//表单信息数据
      showName: false, //现实下拉弹出框
      addForm: {
        departmentId: "", //部门id
        eid: "", //教工号
        midLevRepresent: false, //是否中层干部
        name: "", //姓名
        origin: 1, //添加来源 1统一添加，2管理系统，3微信企业号 ,
        role: "", //工作职责
        seeResult: false, //是否超级管理员
        statistic: true, //用户是否参与统计
        isEvaluated: false, //是否参与被评价
        title: "3", //用户角色:1正职 2副职 3普通教师 ,
        priority: "0", //部门员工列表中排序优先级：数字越大，排序越靠前 ,
        tradeUnionRepresent: "false" //是否教工代表
      },
      userName : "",
    }
  },
  methods: {
    clearAll(formName){
      this.addForm.name = "";
      this.addForm.eid = "";
      this.addForm.role = "";
      this.addForm.priority = "";
    },

    //提交新增信息 2020-12-18
    submitInfo(){
      const url = "api/management/employee/insert";
      this.$axios.post(url, this.addForm).then(res => {
        if (res.data.code == 0){
          this.$message({
            showClose : false,
            message : '添加成功',
            type : 'success',
            center : true,
            duration : 1200
          });
        }else{
          this.$message({
            showClose: false,
            message: res.data.message,
            type : 'error',
            center: true,
            duration: 1200
          })  ;
          return;
        }
      })
    },
    //获取下拉部门数据 2020-12-18
    getDepartmentList() {
      const url = `api/management/employee/listDepartment`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          let depList = res.data;
          let allDep = {
            text : "查看所有部门",
            value : ""
          };
          let tempArr = [];
          depList.map(item => {
            tempArr.push({text : item.name, value : item.depid})
          })
          tempArr.unshift(allDep);
          this.departArr = tempArr;
        }
      })
    },
    //
    confName(value) {
      this.showName = false;
      this.addForm.name = value;
      let tmpData;
      tmpData = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(value)
      this.addForm.eid = tmpData[2];
    },
    querySearchAsync() {
      this.showName = true;
      var list = [{}];
      this.userName = this.addForm.name;
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
    //指定下拉数据挂载节点
    getContainer(){
      // return document.getElementById("name");
    },

    //获取部门名称
    getDepart(value) {
      this.departArr.forEach(item => {
        if (item.value == value) {
          this.departName = item.text;
        }
      })
    },
  },
  created() {
    this.getDepartmentList();
  }
}
</script>

<style scoped>
.address{
  .van-cell__value{
    min-width: 35.5rem;
    van-radio-group{
      display: inline-block;
      text-align: left;
      word-break: break-all;
    }
  }
}
</style>
