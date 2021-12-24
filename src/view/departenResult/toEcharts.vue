<template>
  <div id="main1" style="float:left;width:100%;height: 300px;background-color: aliceblue;">
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name:"toEcharts",
  data(){
    return{
      participationCount : 0,
      nonparticipant : 0,
    }
  },
  methods: {
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
      // 绘制图表
      myChart.setOption({
        title : {
          text: '评价情况',//主标题
          x:'center',//x轴方向对齐方式
          y:'10%'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}人 ({d}%)"
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['已参评','未参评']
        },
        series : [
          {
            // name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '55%'],
            name: "本部门参评情况",
            color: ["rgb(151, 202, 175)", "rgb(133, 157, 192)"],
            data: [
              {
                value: this.participationCount,
                name: "已参评"
              },
              {
                value: this.nonparticipant,
                name: "未参评"
              }
            ],
          }
        ]
      });
    },
  },
  created() {
    this.participationCount = this.$route.query.participationCount
    this.nonparticipant = this.$route.query.nonparticipant

  },
  mounted() {
    this.initData();
  },
}
</script>

