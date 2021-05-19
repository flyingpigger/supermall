<template>
  <div class="goods_item" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad"/>
    <div class="goods_info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("goodsImgLoadEvent");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.id);
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.imgUrl;
    }
  }
};
</script>

<style scoped>
.goods_item {
  width: 48%;
  position: relative;
  padding: 0.21rem 0.21rem 1.68rem;
}

.goods_item img {
  width: 100%;
  padding: 10px;
  border-radius: 0.21rem;
}

.goods_info {
  /* 信息 */
  font-size: 0.8rem;
  text-align: center;
  position: absolute;
  padding-left: 10px;
  left: 0;
  right: 0;
}

.goods_info p {
  /* 标题 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.price {
  /* 价格 */
  color: var(--color-high-text);
  margin-right: 0.85rem;
}

.collect::before {
  display: inline-block;
  content: "";
  background: url("~assets/img/common/collect.svg") 0 0/0.6rem 0.6rem;
  position: relative;
  top: 0.04rem;
  right: 0.08rem;
  height: 0.6rem;
  width: 0.6rem;
}
</style>
