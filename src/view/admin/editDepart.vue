<template>
  <div>
    <van-form v-model="addForm" style="margin-top:10px;">
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

      <van-field v-model="addForm.name" label="部门名称" required
                 :rules="[{ required: true, message: '请填写部门名称' }]">

      </van-field>

      <van-field required :rules="[{ required: true, message: '请填写排序号' }]" v-model="addForm.sort" label="排序">

      </van-field>

      <van-button type="info" block native-type="submit" @click="editDepart">
        确定
      </van-button>
    </van-form>
  </div>
</template>

<script>
export default {
name: "editDepart",
  data(){
    return {
      //编辑内容
      addForm: {
        enable: false,
        depid: "",
        isParticipation: true,
        name: "",
        sort: "" //列表排序先后
      },
    }
  },
  created() {
    this.addForm = this.$route.query.item
  },
  methods: {
    editDepart(){
      const url = "api/management/department/update";
      this.$axios.post(url, this.addForm).then(res => {
        if (res.data.code == 0){
          this.$toast({
            message : "修改成功！",
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
  }
}
</script>

