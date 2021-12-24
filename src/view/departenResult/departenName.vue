<template>
    <div class="main w" >
      <div class="mainTitle">
        <span>
          机关教辅单位服务作风评价 -
          <i class="voting">集中评价结果</i>
        </span>
      </div>
      <van-search label="部门名称" shape="round" background="rgb(150, 97, 119)" v-model="searchName"
                  placeholder="请输入部门名称">
      </van-search>
      <div class="left3">
        <van-cell icon="user-o" :title="item.name" v-for="(item, index) in newItems" is-link :key="index" @click="getItem(item, index)">
        </van-cell>
      </div>
      <router-view/>
    </div>
</template>

<script>
import bus from "../../components/common";

export default {
  name: "departenName",
  data(){
    return {
      vestinList : [],
      itemClass : 0,
      tabActive : 0,
      searchName : '', //搜索名称
    };
  },
  created() {
    this.getVestinList();
  },
  mounted() {
    if (this.$route.params.depId -1){
      this.itemClass = this.$route.params.depId - 1;
    } else {
      this.itemClass = 0;
    }
  },
  methods:{
    //获取部门列表
    getVestinList(){
      this.axios.get("api/department/statistics/findAllEnable").then(res => {
        this.vestinList = res.data;

        var firstId = this.vestinList[0].depid;

        //传递参数到其他页面 firstId
        bus.$emit("depFirstId", firstId);
      });
    },

    //部门列表点击样式
    getItem(item, index){
      this.itemClass = index;
      this.$router.push({
        name: 'departentResult',
        path : '/departentResult',
        query:{
          depId : item.depid,
          isParticipation:item.isParticipation
        }
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  //监听 newItems数组变化
  computed: {
    newItems(){
      let that = this;
      var newItems = [];
      //数组比较
      if(escape(that.searchName).indexOf("%u") == -1 && that.searchName != ''){
        that.vestinList.map(function(item){
          if(that.searchName == that.$pinyin.getFullChars(item.name).toLowerCase() || that.$PinYinMatch.match(item.name,that.searchName) ){
            newItems.push(item);
          }
        })
      }else{
        that.vestinList.map(function(item){
          if(item.name.search(that.searchName) != -1){
            newItems.push(item);
          }
        });
      }
      return newItems;
    }
  },
}
</script>


