<template>

  <div>
    <van-card v-for="item in JSON.parse(this.order.bookList)"
              :num="item.count"
              :price="item.price"
              :desc="item.description"
              :title="item.title"
              :thumb="item.imgUrl"
    />
  </div>

</template>

<script>
export default {
  name: "OrderItem",
  props: {
    order: null
  },
  data() {
    return{
      bookList: null
    }
  },
  created() {
    this.bookList = JSON.parse(this.order.bookList)
  }
}
</script>

<style scoped>

</style>
