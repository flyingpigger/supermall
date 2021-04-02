<template>
  <div class="goods">
    {{ goods }}
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem"

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}
</style>
