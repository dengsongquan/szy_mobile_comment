<template>
  <div style="text-align: center;">
      <router-link to="/selfDownLo">
        <van-button type="primary" icon="comment-o" style="margin-top: 15rem;">
          下载日常评价结果
        </van-button>
      </router-link>
    <div>
      <router-link to="/departentDownLo">
        <van-button type="primary" icon="comment-o" style="margin-top: 1rem;" v-if="this.$store.state.seeResult">
          下载集体评价结果
        </van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
name: "downloadResult"
}
</script>


