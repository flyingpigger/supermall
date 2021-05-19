<template>
  <div id="detail">
    <detail-nav-bar ref="navBarRef"/>
    <scroll class="detail_wrapper" ref="scroll">

      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img class="img" :src="book.imgUrl"/>
        </van-swipe-item>
      </van-swipe>

      <div class="title"> {{ book.title }}</div>
      <div class="description"> {{ book.description }}</div>
      <div class="price"> ¥{{ book.price }}</div>

      <div style="height: 10px; background-color: #eeeeee"></div>

      <div class="van-cell">
        <span class="left">作者</span>
        <span class="center">{{ book.author }}</span>
        <span class="right">查看作品</span>
      </div>
      <div class="van-cell">
        <span class="left">出版</span>
        <span class="center">{{ book.publisher }}，{{ book.publishDate }}</span>
        <span class="right">查看作品</span>
      </div>
      <div class="van-cell">
        <span class="left">分类</span>
        <span class="center">{{ book.type }}</span>
        <span class="right">查看作品</span>
      </div>

      <div style="height: 10px; background-color: #eeeeee"></div>

      <img class="detail_img" :src="book.detailUrl" alt="">
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childrenComps/DetailNavBar"
import DetailBottomBar from "@/views/detail/childrenComps/DetailBottomBar"

import Scroll from "@/components/common/scroll/Scroll"

import {getDetail} from "@/network/detail"
import {addCount, addItem} from "@/network/cart"
import {UID} from "@/common/cookie_keys"
import {Toast} from "vant"

export default {
  name: "Detail",

  components: {
    DetailNavBar,
    DetailBottomBar,
    Scroll
  },

  data() {
    return {
      id: null,
      book: {},
      images: [
        'http://img3m9.ddimg.cn/58/34/29198029-1_e_31.jpg',
        'http://img3m9.ddimg.cn/58/34/29198029-2_e_31.jpg',
        'http://img3m9.ddimg.cn/58/34/29198029-3_e_31.jpg',
        'http://img3m9.ddimg.cn/58/34/29198029-4_e_31.jpg',
        'http://img3m9.ddimg.cn/58/34/29198029-5_e_31.jpg',
        'http://img3m9.ddimg.cn/58/34/29198029-6_e_31.jpg'
      ]
    }
  },

  created() {
    this.id = parseInt(this.$route.params.id);

    //详情数据
    this.getDetail(this.id);

    setTimeout(this.scrollRefresh, 1000)
  },

  methods: {
    /**
     * 网络请求
     * @param id
     */
    getDetail(id) {
      getDetail(id).then(res => {
        this.book = res
      })
    },
    addCount(bookID, userID){
      addCount(bookID, userID).then(() => {
        console.log("购买数量+1")
        this.$toast.show("购买数量+1");
      })
    },
    addItem(bookID, userID) {
      addItem(bookID, userID).then(() => {
        console.log("加入购物车");
        this.$toast.show("加入购物车");
      })
    },
    scrollRefresh() {
      this.$refs.scroll.refresh()
    },

    /**
     * 触发事件
     */
    addToCart() {
      //把信息发送到vuex里
      if (this.$cookies.get(UID) === null) {
        Toast('请登录')
        this.$router.push("/login")
        return
      }
      const obj = {
        bid: this.id,
        uid: this.$cookies.get(UID),
        price: this.book.price,
        title: this.book.title,
        imgUrl: this.book.imgUrl,
        description: this.book.description
      };
      this.$store
        .dispatch("AddProduct", obj)
        .then(() => {
          this.addItem(this.id, this.$cookies.get(UID))
        })
        .catch(() => {
          this.addCount(this.id, this.$cookies.get(UID))
        });
    },

  },
}

</script>

<style scoped>

#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail_wrapper {
  position: absolute;
  top: 44px;
  bottom: 2.09rem;
  left: 0;
  right: 0;
  overflow: hidden;
}

.detail_img {
  width: 100vw;
}

.title {
  display: -webkit-box;
  margin: .25rem .5rem .2rem .5rem;
  font-size: .9rem;
  color: #4d525d;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
}

.description {
  margin: .25rem .5rem .2rem .5rem;
  line-height: 1rem;
  color: rgb(150, 150, 150);
  font-size: .7rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.price {
  font-size: 1.2rem;
  padding-left: 3px;
  padding-right: 5px;
  display: block;
  overflow: hidden;
  margin: 0rem .5rem;
  color: deeppink;
}



.van-cell{
  display: flex;
}

.left{
  color: #969696;
  display: block;
  float: left;
  width: 20%;
  padding-left: 2%;
}
.center{
  display: block;
  float: left;
  width: 58%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.right{
  color: #969696;
  display: block;
  float: left;
  text-align: right;
  width: 20%;
  font-size: 0.85rem;
}

.img{
  width: 100%;
  height: auto;
}

</style>
