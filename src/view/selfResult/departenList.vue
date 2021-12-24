<template>
    <div class="main w">
      <div class="mainTitle">
        <span>机关教辅单位服务作风评价 -
          <i>日常评价结果</i>
        </span>
      </div>
      <van-search label="部门名称" shape="round" background="rgb(150, 97, 119)" v-model="searchName" placeholder="请输入部门名称">
      </van-search>
      <div class="left3">
        <van-cell :title="item.name" v-for="(item, index) in newItems" :key="index" @click="getItem(item,index)" is-link icon="user-o"></van-cell>
      </div>
      <router-view />
    </div>
</template>

<script>
import bus from "../../components/common";

export default {
name: "departenList",
  data(){
    return{
      vestinList : [],
      itemClass : 0,
      tabActive : 0,
      searchName : '', //搜索名字
    }
  },
  methods:{
    //获取部门列表
    getVestinList() {
      this.axios
          .get("api/employee/statistics/getDepartments")
          .then(response => {
            this.vestinList = response.data;
            var firstId = this.vestinList[0].depid;
            bus.$emit("depFirstId", firstId); // bus发送第一个部门Id
          });
    },
    //部门列表点击样式 2020-12-14新增
    getItem(item,index){
      this.itemClass = index;
      this.$router.push({
        name: 'personList',
        params:{
          depId : item.depid
        },
        path : '/personList/' + item.depid
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    //部门列表高亮显示
    if (this.$route.params.depId - 1) {
      this.itemClass = this.$route.params.depId - 1;
    } else {
      this.itemClass = 0;
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
  created() {
    this.getVestinList();
  }
}
</script>


