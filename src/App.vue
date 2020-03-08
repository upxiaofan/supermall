<template>
  <div id="app">
    <router-view></router-view>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
  import MainTabbar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  /*  路径已经在vue.config里面设置了别名  */
  @import "assets/css/base.css";

</style>
