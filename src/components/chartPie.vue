<template>
  <div>
    <!-- echart饼图 -->
    <div :id="id" style="width : 24rem; height : 20rem;"></div>
  </div>
</template>
 
<script>
import echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    // 标题文本
    titleText: {
      type: String,
      default: ""
    },
     // 提示框键名
    tooltipFormatter: {
    type: String,
    default: ''
    },
    // 扇形区域名称
    opinion: {
    type: Array,
    default(){
    return []
    }
    },
    // 提示框标题
    seriesName: {
    type: String,
    default: ''
    },
    // 扇形区域数据
    opinionData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 样式
    width: {
      type: String,
      default: "50rem"
    },
    height: {
      type: String,
      default: "50rem"
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.drawPie(this.id);
    });
  },
  watch: {
    //观察opinionData的变化
    opinionData: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.drawPie(this.id);
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(this.id));
      this.charts.setOption({
        title: {
          text: this.titleText, // 标题文本
          x: "38%", //位置
          y: "4%",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} :{d}%"
        },
        color: [
          "rgb(149, 10, 10)",
          "rgb(159, 189, 178)",
          "rgb(159, 593, 399)",
          "rgb(373, 220, 300)",
          "rgb(158, 400, 200)"
        ],
        series : [
          {
            type: 'pie',
            radius : '55%',
            center: ['50%', '67%'],
            name: this.seriesName,
            color: ["rgb(151, 202, 175)", "rgb(133, 157, 192)"],
            data: this.opinionData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
