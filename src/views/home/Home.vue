<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街区</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- <back-top @backClick="backClick"/>-->
    <!-- 组件是不能直接监听点击的，必须要添加native修饰符   -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

  import HomeSwiper from './childrenComps/HomeSwiper'
  import RecommendView from './childrenComps/RecommendView'
  import FeatureView from './childrenComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {debounce} from "common/utils"

  import Bscroll from 'better-scroll'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log("Home destroyed");
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 1)
      this.$refs.scroll.refresh()
      // console.log('activated');
    },
    deactivated() {
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY()
    },

    //首页创建完，赶紧发送网络请求
    //一般在create里面只写主要逻辑
    created() {
      //1.请求多个数据,结果用变量接收
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {

      //图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      // 3.监听item中图片加载完成
      this.$bus.$on("itemImageLoad", () => {
        //执行频率特别高,调用特别频繁;频繁刷新的防抖函数处理
        // console.log("-----");
        // this.$refs.scroll.refresh()
        refresh()
      })


    },


    methods: {
      /*
      * 事件监听相关的方法
      * */
      tabClick(index) {
        // console.log('tabclick:', index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // console.log('backClick');
        //点击返回顶部，500表示
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        //对返回顶部进行封装
        this.$refs.scroll.scrollTo(0, 0, 500)

      },
      contentScroll(positon) {
        // 1.判断BackTop是否显示
        // console.log(positon);y值本身就是一个负值
        this.isShowBackTop = -(positon.y) > 1000

        //  2.判断tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-positon.y > this.tabOffsetTop)

      },
      loadMore() {
        //  上拉加载更多
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabControl的tabOffsetTop
        //所有的属性都有$el
        // console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

      },

      /*
      * 网络请求相关的方法
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log('首页创建之后：', res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })

      },

    }

  }


</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*适口高度*/
    height: 100vh;

  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*吸顶实现*/
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*style里面的scope会增加作用域*/
  /*.content {*/
  /*  !*height: 300px;*!*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/


</style>
