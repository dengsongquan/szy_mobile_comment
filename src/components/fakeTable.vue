<template>
<div class="fake-table">
  <van-row class="fake-table_head">
    <van-col class="col" v-for="(item, index) in headData" :key="index" :span="item.span">{{item.label}}</van-col>
  </van-row>
  <van-row class="fake-table_body" v-for="(item, index) in bodyData" :key="index">
     <template v-for="(colItem, colIndex) in headData">
<!--       这里其实重点只要关注v-model绑定的属性名。其他属性看项目具体需要-->
       <van-col class="col" :span="colItem.span" :key="colIndex">
         <van-field v-model="item[colItem.prop]"  :class="[item.editDisable ? 'input-disabled':'input-abled']"></van-field>
<!--          <slot></slot>-->
       </van-col>
<!--       这里是项目需要，不让事件冒泡，如果不许哟可以去掉，stop修饰符.-->
<!--       <van-col class="col" :span="colItem.span" :key="colIndex" @click.stop.capture="doThis($event, index)">-->
<!--         {{item.name}}-->
<!--       <slot></slot>-->
<!--       </van-col>-->
     </template>
  </van-row>
</div>
</template>

<script>
export default {
name: "fakeTable",
  props:{
  headData:{
      type: Array,
      default : () => []
    },
    bodyData:{
      type: Array,
      default: () => []
    }
  },
  methods:{
  doThis(e, rowIdx){
    if (e.target.id === 'edit'){
      this.$emit('edit', rowIdx)
    }else if (e.target.id === 'delete'){
      this.$emit('delete', rowIdx)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@inputPaddingLeft: 5px;
@colPaddingLeft:10px;

.fake-table /deep/ .van-file_control{
  padding-left: @inputPaddingLeft;
}
.col /deep/ .van-cell{
  padding: 0;
}
.col /deep/ .input-disabled{
  border: none;
}
.col /deep/ .input-abled{
  border: 1px solid #DDDDDD;
}
.table-col{
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "PingFang SC";
  color: #313131;
}
.fake-table{
  margin: 0 12px;
  &_head, &_body{
    border: 1px solid #DDDDDD;
    &:not(:last-child){
      border-bottom: none;
    }
  }
  &_head{
    height: 40px;
    background: #F5FAFF;
    .col:extend(.table-col){
      font-size: 1rem;
      font-weight: 500;
      line-height: 20px;
      padding: @colPaddingLeft;
    }
  }
  &_body{
    .col:extend(.table-col){
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      padding: @colPaddingLeft @colPaddingLeft @colPaddingLeft calc(@colPaddingLeft - @inputPaddingLeft);
      &:last-child{
        padding-left: @inputPaddingLeft;
      }
    }
  }
}
</style>