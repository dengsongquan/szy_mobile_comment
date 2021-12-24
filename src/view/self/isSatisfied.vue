<template>
  <div class="main w">
    <van-list :finished="finished" finished-text="没有更多了"  class="right7">
      <van-row>
        <van-col span="12" v-for="(item, index) in historyList" :key="index" style="width: 100% ;">
          <div style="background: #F8F8F8;text-align: left;">
            <p style="margin-left: 10px;padding-top: 10px;">是否满意 ： <van-tag :type="item.positive == false ? 'danger' : 'success'">{{ item.positive == true ? '满意' : '不满意'}}</van-tag> </p>
            <p style="margin-left: 10px;padding-top: 10px;">历史评价内容 ：{{ item.detail }}</p>
            <p style="margin-left: 10px;padding-top: 10px;">时间 ：{{ item.evaluateTime }}</p>
            <van-divider  />
          </div>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
export default {
name: "isSatisfied",
  data(){
    return{
      historyList: [], //已评价历史记录
      finished : false,
    }
  },
  created(){
    this.historyList = this.$route.query.item
  },
  methods: {
  },
}
</script>


