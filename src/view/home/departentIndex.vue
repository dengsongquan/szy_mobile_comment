<template>
    <div style="text-align: center;">
        <!--提示图片-->
      <van-grid :column-num="1" v-show=" !canEvaluatedDepartment && !seeResult">
        <van-grid-item v-for="(item,index) in list" :key="index">
          <img alt :src="item.image" style="width: 100%;height: 100%;">
        </van-grid-item>
      </van-grid>

      <div>
        <router-link to="/teachUnit">
          <van-button v-if="canEvaluatedDepartment == true" type="primary" icon="comment-o" style="margin-top: 15rem;" class="unitLink">
            点击进入集中评价
          </van-button>
        </router-link>
      </div>

    <div>
      <router-link to="/departenName">
        <van-button v-if="seeResult == true" type="primary" icon="comment-o" style="margin-top: 1rem;" class="unitLink">
          点击查看集中评价结果
        </van-button>
      </router-link>
    </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
name: "departentIndex",
  data(){
  return {
    showPopover : false,
    list:[
        { id : 0, image : require('../../assets/kaifang.jpg') }
      ],
    canEvaluatedDepartment: false,
    seeResult : false,
    actions : [{text:'进入集中评价',path:'/teachUnit'},{text:'查看集中评价结果',path:'/departenName'}],
    }
  },
  methods:{
    //选择跳转路径
  onSelect(action){
      this.$router.push(action.path)
    },

  filterInfo(){
      this.axios("/api/evaluate/filterInfo").then(res => {
        this.canEvaluatedDepartment = res.data.canEvaluatedDepartment;
        this.seeResult = res.data.seeResult;
      })
    }
  },
  created() {
    this.filterInfo();
  },

}
</script>


