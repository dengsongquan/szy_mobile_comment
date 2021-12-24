<template>
  <div style="text-align: center;">
    <div>
      <router-link to="/adminPerson">
        <van-button type="primary" icon="manager-o" style="margin-top: 15rem;">
          人员管理
        </van-button>
      </router-link>
    </div>
    <div>
      <router-link to="/adminDepartment">
        <van-button type="primary" icon="comment-o" style="margin-top: 1rem;">
          部门管理
        </van-button>
      </router-link>
    </div>

    <div>
      <router-link to="/adminTime">
        <van-button type="primary" icon="underway-o" style="margin-top: 1rem;">
          时间管理
        </van-button>
      </router-link>
    </div>

    <div>
      <router-link to="/adminQuestion">
        <van-button type="primary" icon="todo-list-o" style="margin-top: 1rem;">
          题目管理
        </van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
name: "management"
}
</script>


