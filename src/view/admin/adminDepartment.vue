<template>
  <div class="main w">
      <van-search label="部门名称" shape="round" background="rgb(150, 97, 119)" show-action v-model="searchName"
                  placeholder="请输入部门名称">
        <template #action>
          <van-button size="small" @click="$router.push('/newDepart')" type="info" icon="plus"
                      style="margin-top: 10px;margin-left: 10px;">新增部门
          </van-button>
        </template>
      </van-search>

      <div class="right3">
        <van-list :finished="finished" finished-text="没有更多了" :error.sync="errorData" error-text="没有数据">
          <van-row>
            <van-col span="12" v-for="(item, index) in newItems" :key="index" style="width: 100% ;">
              <div style="background : #F8F8F8; text-align : left;">
                <p style="margin-left: 10px;padding-top: 10px;">部门名称：{{ item.name }}</p>
                <p style="margin-left: 10px;">是否启用：
                  <template v-if="item.enable == true">
                    <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                  </template>
                  <template v-else>
                    <van-icon name="minus" size="1.2rem" style=" fontWeight : 600;"/>
                  </template>
                </p>
                <p style="margin-left: 10px;">是否参与评价：
                  <template v-if="item.isParticipation == true">
                    <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                  </template>
                  <template v-else>
                    <van-icon name="minus" size="1.2rem" style="fontWeight : 600;"/>
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
  name: "adminDepartment",
  data(){
    return {
      errorData : false, //没有数据提示
      searchName: '',//姓名
      finished : false,
      departmentList : [], //部门列表
      module : [],
    }
  },
  computed: {
   newItems(){
     let that = this;
     var newItems = [];
     var pyArr = [];
     //1.获取拼音数组
     that.departmentList.map(function(item){
       pyArr.push(that.$pinyin.getFullChars(item.name))
     })
     //2.数组比较
     if(escape(that.searchName).indexOf("%u") == -1 && that.searchName != '')
      {
       that.departmentList.map(function(item){
         if(that.searchName == that.$pinyin.getFullChars(item.name).toLowerCase() || that.$PinYinMatch.match(item.name,that.searchName)){
           newItems.push(item);
         }
       })
     }else{
       that.departmentList.map(function(item){
         if(item.name.search(that.searchName) != -1){
           newItems.push(item);
         }
       });
     }
     return newItems;
   }
  },
  methods: {
    editInfo(item){
      this.$router.push({ path:'/editDepart', query : { item : item}})
    },
    //获取集体评价部门列表
    getDepartmentList() {
      const url = `api/management/department/list`;
      this.axios.post(url).then(response => {
        if (response.data != null) {
          this.departmentList = response.data;
        }
      }).catch(() => {
        this.errorData = true;
      });
    },
  },
  created(){
    this.getDepartmentList();
  }
}
</script>


