<template>
  <div class="main w">
    <div class="participationEchartsContent">
      <span class="joinTitle">未参评人数：{{nonparticipant}}</span>
      <ul>
        <li v-for="(items, index) in participationDetailData.unParticipationList" :key="index">
          <van-tag plain type="primary" style="font-size: 1.5rem;" size="large">
            {{items}}
          </van-tag>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
name: "toUnparticition",
  data() {
    return{
      participationDetailData : {},
      nonparticipant : "" , //未参评人数
      nameList : [], //姓名数组
      searchName : '',// 搜索姓名
    }
  },
  created() {
    this.participationDetailData = this.$route.query.participationDetailData
    // this.nameList.push(JSON.stringify(this.participationDetailData.unParticipationList));
    this.nonparticipant = this.$route.query.nonparticipant;
  },
}
</script>
