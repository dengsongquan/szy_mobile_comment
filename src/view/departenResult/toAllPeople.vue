<template>
  <div>
    <van-row class="collectResult">
      <van-col span="15">
        单位总人数： <span class="spanClass">{{totalCountS}}</span>人
      </van-col>
      <van-col span="15">
        已参评人数：<span class="spanClass">{{participationDetailData.participationCount}}</span>人
      </van-col>
      <van-col span="15">
        未参评人数： <span class="spanClass">{{nonparticipant}}</span>人
      </van-col>
      <van-col span="15">
        全部完成人数：<span class="spanClass">{{participationDetailData.fullFinishedCount}}</span>人
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
name: "toAllPeople",
  data() {
    return {
      totalCountS : 0,
      participationDetailData:{},
      nonparticipant:0,
    }
  },
  created() {
    this.participationDetailData = this.$route.query.participationDetailData;
    this.totalCountS = this.$route.query.totalCountS
    this.nonparticipant = this.$route.query.nonparticipant
  }
}
</script>
