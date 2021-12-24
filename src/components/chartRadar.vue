
<template>
  <div>
    <!-- 雷达图 -->
    <div id="id" style="width : 24rem; height : 20rem;"></div>
  </div>
</template>
 
<script>
export default {
  props: {
     // 样式
    width: {
      type: String,
      default: "20rem"
    },
    height: {
      type: String,
      default: "20rem"
    },
    id: {
      type: String,
      default: ""
    },
    // 标题文本
    titleText: {
      type: String,
      default: ""
    },
    //名称
    indicatorName: {
      type: Array,
      default() {
        return [];
      }
    },
    //数值
    opinionValue: {
        type: Array,
        default() {
          return [];
        }
      },
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
      this.drawRadar(id);
    });
  },
 watch: {
    //观察opinionValue的变化
    opinionValue: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal);
          } else {
            this.chart.setOption(oldVal);
          }
        } else {
          this.drawRadar(id);
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    drawRadar(id) {
      this.charts = this.$echarts.init(document.getElementById("id"));
      this.charts.setOption({
        title: {
          text: this.titleText, // 标题文本
           x: "38%", //位置
           y: "4%",
        },
        tooltip: {
          confine: true //鼠标移入超出界限显示
        },
        color: ["rgb(239, 132, 149)"],
        radar: {
          center: ["50%", "67%"], // 图的位置
          name: {
            textStyle: {
              color: "#333"
            }
          },
          indicator: this.indicatorName
          // [
          //   { max: 100, name: "" },
          //   { max: 100, name: "" },
          //   { max: 100, name: "" }
          // ]
        },
        series: [
          {
            name: this.seriesName, // 提示框标题
            type: "radar",
            areaStyle: { normal: {} },
            data: [{ value: this.opinionValue, name: this.titleText }] // 区域数据
          }
        ]
      });
    }
  }
};
</script>
 
<style>

</style>
  
  

