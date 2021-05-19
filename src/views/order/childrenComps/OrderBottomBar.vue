<template>
  <div id="order_bottom_bar">

    <div class="bottom">
      <div class="count">
        共{{ count }}件
      </div>
      <div class="calc">
        合计：￥{{ price }}
      </div>
      <div class="buy" @click="buyClick">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderBottomBar",
  props: {
    count: 0,
    price: 0
  },
  methods: {
    buyClick() {
      this.$emit("buyClick");
    }
  }
}
</script>

<style scoped>
#order_bottom_bar {
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.3rem;
  text-align: center;
  display: flex;
  z-index: 10;
}

.bottom {
  display: flex;
  flex: 1;
}

.bottom > div {
  line-height: 3rem;
}

.count{
  padding-left: 20px;
}

.calc {
  flex: 1;
}

.buy {
  width: 7rem;
  background-color: #f03;
  color: white;
}

</style>
