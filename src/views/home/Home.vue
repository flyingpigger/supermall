<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">东东书店</div></nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollEvent="contentScroll"
            @pullingUpEvent="loadMore"
    >
      <home-swiper :banners="banners"/>
<!--      <home-recommend-view :recommends="recommends"/>-->
      <feature-view/>
      <tab-control class="tab-control" :titles="['新书', '好评', '推荐']"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <transition name="back-top">
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </transition>
  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childrenComps/HomeSwiper"
  import HomeRecommendView from "@/views/home/childrenComps/HomeRecommendView"
  import FeatureView from "@/views/home/childrenComps/FeatureView"

  import NavBar from "@/components/common/navbar/NavBar"
  import TabControl from "@/components/content/tabControl/TabControl"
  import GoodsList from "@/components/content/goods/GoodsList"
  import Scroll from "@/components/common/scroll/Scroll"
  import BackTop from "@/components/content/backtop/BackTop"

  import {getHomeBanner,getHomeGoods} from "@/network/home"
  import {deBounce} from "@/common/utils.js";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          '教育' : {page: 0, list: []},
          '童书' : {page: 0, list: []},
          '推荐' : {page: 0, list: []}
        },
        currentType: '教育',
        isShowBackTop: false,
        bcFunc: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      TabControl,
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求多个数据
      this.getHomeBanner()
      this.getHomeGoods('教育');
      // this.getHomeGoods('')
      // this.getHomeGoods('')
    },
    mounted() {
      // 防抖
      let deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50);
      this.bcFunc = () => {
        //利用 $bus 事件监听，去刷新 scroll的高度
        deBounceRefresh();
      }
    },
    activated() {
      console.log("进入home")
      this.$bus.$on("goodsImgLoadEvent", this.bcFunc);
    },
    deactivated() {
      console.log("离开home")
      this.$bus.$off("goodsImgLoadEvent", this.bcFunc);
    },
    methods: {

      /**
       * 组件调用方法
       */

      loadMore() {
        //下拉加载更多goods，但是会有bug，该bug由于DOM高度问题
        //图片的DOM高度是异步加载的，所以没那么快能加载出来，会导致scroll的高度跟不上
        //如何解决？
        //让img每次加载完之后，就refresh()一次滚动条
        this.getHomeGoods(this.currentType);

        console.log("上拉了");
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
        }, 2000);
      },

      /**
       * 事件监听相关
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = '教育'
            break
          case 1:
            this.currentType = '所有'
            break
          case 2:
            this.currentType = '教育'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },

      /**
       * 网络请求相关
       */
      getHomeBanner() {
        getHomeBanner().then(res => {
          this.banners = res;
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res);

          this.goods[type].page += 1;
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 100px);
    overflow: hidden;

    margin-top: 44px;
  }

  /**
  * 回到顶部按钮过渡效果
  */
  .back-top-enter,
  .back-top-leave-to {
    transform: translateY(1rem);
    opacity: 0;
  }

  .back-top-enter-active {
    transition: all 0.5s;
  }

  .back-top-leave-active {
    transition: all 0.2s;
  }
</style>
