<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <router-view v-if="isRouterAlive && !$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  //页面重载功能
  provide(){
    return{
      reload: this.reload,
    }
  },
  components: {
    // HelloWorld
  },
  data(){
    return{
      isRouterAlive : true,
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function (){
        this.isRouterAlive = true;
        window.scrollTo({ top: document.body.scrollHeight})
      })
    }
  }
}
</script>

<style>
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  //margin-top: 60px;
}
</style>
