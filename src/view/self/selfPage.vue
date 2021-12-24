<template>
<div class="main w">
  <div class="mainTitle">
    <span>
      机关教辅单位服务作风评价 -
      <i class="voting">日常评价</i>
    </span>
  </div>
  <van-search label="部门名称" shape="round" background="rgb(150, 97, 119)" v-model="searchName" placeholder="请输入部门名称">
  </van-search>
  <div class="left3" >
      <van-cell :title="item.name" v-for="(item, index) in newItems" :key="index" @click="getItem(item,index)" icon="user-o" is-link>
      </van-cell>
  </div>
</div>
</template>

<script>
import bus from "../../components/common";
export default {
name: "selfPage",
  data() {
    return {
      vestinList : [],
      searchName:'',// 搜索条件
      tabActive : 0,
    }
  },
  methods: {
    getVestinList(){
      this.axios.get("api/employee/index").then(res => {
        this.vestinList = res.data;
        var firstId = this.vestinList[0].depid;
        bus.$emit("depFirstId", firstId);
      })
    },
    //部门列表点击样式 2020-12-14新增
    getItem(item,index){
      this.$router.push({
        name: 'vestin',
        params:{
          depId : item.depid
        },
        path : '/vestin/' + item.depid
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  computed:{
    newItems(){
      let that = this;
      var newItems = [];
      var pyArr = [];
      //1.获取拼音数组
      that.vestinList.map(function(item){
        pyArr.push(that.$pinyin.getFullChars(item.name))
      })
      //2.数组比较
      if(escape(that.searchName).indexOf("%u") == -1 && that.searchName != '')
      {
        that.vestinList.map(function(item){
          if(that.searchName == that.$pinyin.getFullChars(item.name).toLowerCase() || that.$PinYinMatch.match(item.name,that.searchName)){
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
  created(){
    this.getVestinList();
  },
}
</script>


