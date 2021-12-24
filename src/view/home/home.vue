<template>
  <div style="text-align: center;">
    <div>
      <router-link to="/departentIndex">
        <van-button type="primary" icon="comment-o" style="margin-top: 15rem;">
          集中评价
        </van-button>
      </router-link>
    </div>
    <div>
      <!--canEvaluatedDepartment == false ? '/selfIndex' : ''-->
      <!--<router-link :to="toPath">-->
        <van-button type="primary" icon="comment-o" style="margin-top: 1rem;" @click="showDialog">
          日常评价
        </van-button>
      <!--</router-link>-->
    </div>
  </div>
</template>

<script>

export default {
  name : "home",
  data () {
    return {
      // toPath : '',//跳转到selfIndex
      // actions : [{text:'集中评价',path:'/departentIndex'},{text:'日常评价',path:'/selfIndex'}],
      canEvaluatedDepartment : false,
      to_routes : 0,
    }
  },
  methods: {
    //弹出提示内容
    showDialog(){
        if (this.canEvaluatedDepartment == true && this.to_routes == 0) {
          this.to_routes = 1;
          this.$dialog.alert({
            message : '集中评价期间，可不用进行日常评价。',
            theme : 'round-button',
            confirmButtonColor : '#07c160'
          })
          //   .then(() => {
          //
          // })
        } else {
          this.$router.push('/selfIndex')
          // this.$dialog.alert({
          //   message : '集中评价期间，可不用进行日常评价。',
          //   theme : 'round-button',
          //   confirmButtonColor : '#07c160'
          // })
        }
    },
    onSelect(action){
      this.$router.push(action.path)
    },
    filterInfo(){
      this.axios("/api/evaluate/filterInfo").then(res => {
        this.canEvaluatedDepartment = res.data.canEvaluatedDepartment;
      })
    }
  },
  created() {
    this.filterInfo();
  },
}
</script>

<style scoped>
</style>
