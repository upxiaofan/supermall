<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街区</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar
    },
    data() {
      return {
        result: null
      }
    },
    //首页创建完，赶紧发送网络请求
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        console.log('首页创建之后：', res);
        this.result = res
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
