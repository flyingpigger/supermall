<template>
  <div id="detail">
    <detail-nav-bar ref="navBarRef"/>
    <scroll class="detail_wrapper" ref="scroll">
      <div class="title"> {{ book.title }}</div>
      <div class="description"> {{ book.description }}</div>
      <div class="price"> ¥{{ book.price }}</div>
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
      book: {}
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
    addCount(booID){
      addCount(booID).then(() => {
        console.log("购买数量+1")
        this.$toast.show("购买数量+1");
      })
    },
    addItem(booID, userID) {
      addItem(booID, userID).then(() => {
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
      const obj = {
        bookID: this.id,
        userID: this.$store.state.uid,
        price: this.book.price,
        title: this.book.title,
        imgUrl: this.book.imgUrl,
        description: this.book.description
      };
      this.$store
        .dispatch("AddProduct", obj)
        .then(() => {
          this.addItem(this.id, this.$store.state.uid)
        })
        .catch(() => {
          this.addCount(this.id)
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
}

</style>
