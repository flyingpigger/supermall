<template>
  <div id="home">
    <!--    <nav-bar class="home-nav">-->
    <!--      <div slot="center">-->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
    >
      <template #action>
        <div style="padding-right: 10px" @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!--      </div>-->
    <!--    </nav-bar>-->

    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollEvent="contentScroll"
            @pullingUpEvent="loadMore"
    >
      <home-swiper :banners="banners"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['推荐','搜索']" @tabClick="tabClick"/>
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

import {getHomeBanner} from "@/network/home"
import {getBooks, searchBook} from "@/network/book"
import {deBounce} from "@/common/utils.js";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'recommend': {page: 0, list: []},
        'search': {page: 0, list: []},
      },
      currentType: 'recommend',
      searchValue: "",
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
    this.getBooks('recommend');
  },
  mounted() {
    // 防抖
    let deBounceRefresh = deBounce(this.$refs.scroll.refresh, 50);
    this.bcFunc = () => {
      deBounceRefresh();
    }
  },
  activated() {
    this.$bus.$on("goodsImgLoadEvent", this.bcFunc);
  },
  deactivated() {
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
      this.getBooks(this.currentType);

      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 500);
    },

    /**
     * 事件监听相关
     */

    onSearch() {
      this.searchBook()
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'recommend'
          break
        case 1:
          this.currentType = 'search'
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
    getBooks(type) {
      if (type === 'search') {
        this.searchBook()
      }
      if (type === 'recommend') {
        let page = this.goods[type].page + 1;
        getBooks(page).then(res => {
          this.goods[type].list.push(...res.data);

          this.goods[type].page += 1;
        })
      }
    },
    searchBook() {
      let value = this.searchValue.trim()
      console.log(value)
      if (value !== "" && value != null) {
        searchBook(this.searchValue).then(res => {
          this.goods['search'].list = res
        })
      }
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
  height: calc(100% - 105px);
  overflow: hidden;

  /*margin-top: 44px;*/
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
