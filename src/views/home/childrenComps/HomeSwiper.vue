<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.imgUrl" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from "@/components/common/swiper/Swiper"
  import SwiperItem from "@/components/common/swiper/SwiperItem"

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
