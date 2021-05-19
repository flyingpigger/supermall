<template>
  <div>
    <nav-bar class="category_nav">
      <template #center>分类</template>
    </nav-bar>

    <div class="main">
      <van-sidebar v-model="active" @change="onChange">
        <div v-for="item in categories">
          <van-sidebar-item :title="item.name"/>
        </div>
      </van-sidebar>

      <scroll class="right" ref="scroll"
              :pull-up-load="true"
              @pullingUpEvent="loadMore"
              >
        <goodsList :goods="showGoods"/>
      </scroll>
    </div>

  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar"
import Scroll from "@/components/common/scroll/Scroll"
import GoodsList from "@/components/content/goods/GoodsList"
import {Toast} from 'vant'
import Vue from 'vue'

import {getCategory} from "@/network/category"
import {getBooksByType} from "@/network/book"
import {deBounce} from "@/common/utils"

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      active: 0,
      categories: [{"id": 1, "name": "童书"}],
      books: {
        '童书': {page: 0, list: []},
      },
      bcFunc: null,
      currentType: '童书',
    }
  },
  created() {
    this.getCategoryAndBooks()
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
  computed: {
    showGoods() {
      return this.books[this.currentType].list
    }
  },
  methods: {
    onChange(index) {
      this.currentType = this.categories[index].name;
      this.$refs.scroll.scrollTo(0,0)
    },

    getBooks(type) {
      let page = this.books[type].page + 1;
      getBooksByType(type, page).then(res => {
        this.books[type].list.push(...res);

        this.books[type].page += 1;
      })
    },

    getCategoryAndBooks() {
      getCategory().then((res) => {
        this.categories = res
        for (let item of this.categories) {
          //vue给对象新添加属性，一定要使用Vue.set( target, key, value )这个API来添加
          // this.books[item.name] = {page: 0, list: []} 不可以做到响应式
          Vue.set(this.books, item.name, {page: 0, list: []})
          this.getBooks(item.name)
        }
      })
    },
    loadMore() {
      this.getBooks(this.currentType);

      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 500);
    },
  }
}
</script>

<style scoped>

.category_nav {
  background-color: var(--color-tint);
  color: white;
}

.right {
  flex: 1;
  overflow: hidden;
  /*width: calc(100% - 80px);*/
}

.main {
  display: flex;
  font-size: 0.6rem;
  height: calc(100vh - 44px - 49px);
}

</style>
