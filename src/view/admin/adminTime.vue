<template>
  <div class="main w">
          <van-button size="small" @click="$router.push('/newTime')" type="info" icon="plus"
                      style="margin-top: 10px;margin-left: 10px;">新增时间
          </van-button>
    <div class="right4">
      <van-list :finished="finished" finished-text="没有更多了" :error.sync="errorData" error-text="没有数据">
        <van-row>
          <van-col span="12" v-for="(item, index) in evaluateTimeList" :key="index" style="width: 100% ;">
            <div style="background : #F8F8F8; text-align : left;">
              <p style="margin-left: 10px;padding-top: 10px;">评价开始日期：{{ item.startAt }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">评价结束日期：{{ item.endAt }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">结果开放时间：{{ item.resultStartShow }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">结果结束时间：{{ item.resultEndShow }}</p>
              <p style="margin-left: 10px;">是否启用：
                <template v-if="item.enable == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style=" fontWeight : 600;"/>
                </template>
              </p>
              <p style="margin-left: 10px;">编辑：
                <van-button size="small" icon="edit" type="info" @click="editInfo(item)" text="编辑">
                </van-button>
              </p>
              <van-divider/>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </div>
    </div>
</template>

<script>
export default {
name: "adminTime",
  data(){
    return {
      errorData : false, //没有数据提示
      searchName : '',//搜索姓名
      finished : false,
      evaluateTimeList : [],//时间列表
    }
  },
  methods: {
  //跳转到编辑时间
    editInfo(item){
      this.$router.push({ path: '/editTime', query: { item : item }})
    },
    //获取集体评价时间段列表
    getEvaluateTimeList() {
      const url = `api/management/evaluateTime/list`;
      this.axios.post(url).then(response => {
        if (response.data != null) {
          this.evaluateTimeList = response.data;
        }
      }).catch(() => {
        this.errorData = true;
      });
    }
  },
  created() {
    this.getEvaluateTimeList();
  },

}
</script>


