<template>
<div class="main w">
  <div class="right5">
    <van-form v-model="addForm" >
      <van-cell center title="部门名称">
        <template>
          <van-dropdown-menu :rules="[{required : true, message : '请选择部门名称'}]">
            <van-dropdown-item :title="departName" v-model="addForm.departmentId" :options="departArr"
                               @change="getDepart(addForm.departmentId)">

            </van-dropdown-item>
          </van-dropdown-menu>
        </template>
      </van-cell>
      <van-field v-model="addForm.name" label="姓名" placeholder="用户名">

      </van-field>
      <van-field required :rules="[{ required: true, message: '请填写教职工号' }]" v-model="addForm.eid" label="教职工号">

      </van-field>

      <van-field required :rules="[{ required: true, message: '请填写排序号' }]" v-model="addForm.priority" label="排序">

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
        <van-button type="info" block native-type="submit" @click="editPerson">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</div>
</template>

<script>
export default {
name: "editInfo",
  data() {
    return {
      departArr : [],//下拉数组
      departName : "",
      value1 : "",//默认值
      formInfo:{},//表单信息数据
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
    };
  },
  created(){
    this.addForm = this.$route.query.value;
    this.getDepartmentList();
  },
  methods: {
    editPerson(){
      const url = "api/management/employee/update";
      this.$axios.post(url, this.addForm).then(res => {
        if (res.data.code == 0){
          this.$message.success({
            showClose: false,
            message:"修改成功",
            type: "success",
            center: true,
            duration: 1200,
          });
          this.getDepartmentList();
        }else {
          this.$message({
            showClose: false,
            message: res.data.message,
            type: "error",
            center: true,
            duration: 1200,
          });
          return;
        }
      })
    },
    getDepart(value) {
      this.departArr.forEach(item => {
        if (item.value == value) {
          this.departName = item.text;
        }
      })
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
    },
  },
}
</script>


