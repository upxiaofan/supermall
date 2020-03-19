<template>
  <div id="app">
    <keep-alive  exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /*  路径已经在vue.config里面设置了别名  */
  @import "assets/css/base.css";

</style>
