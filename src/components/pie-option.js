export const option2 = {
    
      title: {
        text: "没有数据",
        // subtext: '纯属虚构',
        x: "center",
        y: "10"
      },
      tooltip: {
        trigger: "item",
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
        formatter: "{a} <br/>{b} :{d}%"
      },
  color: ['rgb(149, 163, 189)', 'rgb(159, 189, 178)', 'rgb(159, 193, 199)', 'rgb(173, 149, 199)','rgb(158, 169, 149)'],
      series: [
        {
          name: "评价结果",
          type: "pie",
          radius: "70%",
          center: ["50%", "55%"],
          data: []
            // { value: 335, name: "直接访问" },
            // { value: 310, name: "邮件营销" },
            // { value: 234, name: "联盟广告" },
            // { value: 135, name: "视频广告" },
            // { value: 1548, name: "搜索引擎" }
          ,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    }
 