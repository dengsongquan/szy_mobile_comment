<template>
  <div>
    <van-form v-model="addForm" ref="addForm">
      <van-cell center title="是否启用">
        <template>
          <van-switch v-model="addForm.enable">

          </van-switch>
        </template>
      </van-cell>

      <van-cell center title="是否参与评价">
        <template>
          <van-switch v-model="addForm.isParticipation">

          </van-switch>
        </template>
      </van-cell>

      <van-field required :rules="[{ required: true, message: '请填写部门名称' }]" v-model="addForm.name" label="部门名称">

      </van-field>

      <van-field required :rules="[{ required: true, message: '请填写排序号' }]" v-model="addForm.sort" label="排序">

      </van-field>
      <div style="margin-top:10px;">
        <van-button type="info" block native-type="submit" @click="newDepart">
          确定
        </van-button>

        <van-button block style="margin-top:10px;" @click="clearAll" type="warning">
          重置
        </van-button>
      </div>

    </van-form>
  </div>
</template>

<script>
export default {
name: "newDepart",
  data(){
    return {
      departName : "" ,//部门名称
      departArr : [], //部门列表


      addForm: {
        enable: false,
        depid: "",
        isParticipation: true,
        name: "",
        sort: "" //列表排序先后
      },
    }
  },
  methods: {
  //重置
    clearAll(){
      this.addForm.name = "";
      this.addForm.sort = "";

    },
    newDepart(){
      const url = "api/management/department/insert";
      this.$axios.post(url, this.addForm).then(res => {
        if (res.data.code == 0){
          this.$toast({
            message:'添加成功！',
            duration : 1000
          });
        }else{
          this.$toast({
            message: res.data.message,
            duration : 1000
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
        this.addForm.name = this.departName
      })
    },
    //获取部门列表
    // getDepartmentList(){
    //   const url = `api/management/department/list`;
    //   this.axios.post(url).then(res => {
    //     if (res.data != null){
    //       let depList = res.data;
    //       let allDep = {
    //         text: "查看所有部门",
    //         value: ""
    //       };
    //       let tempArr = [];
    //       depList.map(item => {
    //         tempArr.push({text: item.name, value: item.depid})
    //       })
    //       tempArr.unshift(allDep);
    //       this.departArr = tempArr;
    //     }
    //   })
    // },
  },

  created(){
    // this.getDepartmentList();
  }
}
</script>


