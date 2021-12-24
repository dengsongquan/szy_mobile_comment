<template>
  <div class="main w">
    <div class="left">
      <div class="leftTitle">
        <span>评价项目</span>
      </div>
      <div class="leftContent">
        <span class="subject">
          {{index == allEvaluateList.length ? allEvaluateList.length : (index + 1)}}.{{evaluateItmes.title}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "departentPage",
  data(){
    return{
      allEvaluateList: [], //全部的数据
      evaluateItmes: {}, //当前题的信息
      index: 0,
    }
  },
  created(){
    this.allEvaluateList = this.$route.query.allEvaluateList
    this.evaluateItmes = this.$route.query.evaluateItmes
  }
}
</script>
