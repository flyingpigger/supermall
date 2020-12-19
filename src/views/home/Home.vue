<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar"
  import HomeSwiper from "@/views/home/childrenComps/HomeSwiper"
  import HomeRecommendView from "@/views/home/childrenComps/HomeRecommendView"

  import {getHomeMultiData} from "@/network/home"

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    created() {
      //1.请求多个数据
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
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