<template>
  <div style="text-align: center;">
    <div>
      <router-link to="/selfPage">
        <van-button type="primary" icon="comment-o" style="margin-top: 15rem;" class="unitLink">点击进入日常评价</van-button>
      </router-link>
    </div>
      <div>
        <router-link to="/departenList">
          <van-button type="primary" icon="comment-o" v-if=" seePersonResult == true" style="margin-top: 1rem;" class="unitLink">点击查看日常评价结果</van-button>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
name: "selfIndex",
  data() {
    return {
      showPopover: false,
      actions : [{text:'进入日常评价',path:'/selfPage'},{text:'查看日常评价结果',path:'/departenList'}],
      seePersonResult: false //是否可以看日常结果权限
    }
  },

  methods: {
    onSelect(action){
      this.$router.push(action.path)
    },
    filterInfo(){
      const url = `api/evaluate/filterInfo`;
      this.axios(url).then(res => {
        this.seePersonResult = res.data.canSeePersonalResult;
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
