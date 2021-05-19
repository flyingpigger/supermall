<template>
  <div>

    <div v-if="orderList.length!==0">
      <div class="order" v-for="order in orderList">
        <div style="background-color: #bbb; margin: 8px"></div>
        <div class="order_top">
          {{ order.date.split(" ")[0] }}
          <span style="color: black">待付款</span>
        </div>
        <div class="order_item" @click="orderClick(order)">
          <van-card style="background-color: white"
                    v-for="item in JSON.parse(order.bookList)"
                    :num="item.count"
                    :price="item.price"
                    :desc="item.description"
                    :title="item.title"
                    :thumb="item.imgUrl"
          />
        </div>
        <div class="total_price">合计实付：￥<span style="font-size: 1.2rem">{{ order.totalPrice }}</span></div>
        <div class="clear-fix">
          <van-button @click="payClick(order.id)" class="pay_button"
                      color="linear-gradient(to right, #ff6034, #ee0a24)">
            立即支付
          </van-button>
        </div>
      </div>
    </div>

    <div v-else class="hint">
      没有此类订单
    </div>

  </div>

</template>

<script>
import OrderItem from "@/views/order/childrenComps/OrderItem"
import {payForOrder} from "@/network/order"
import {Toast} from "vant"

export default {
  name: "WaitForPay",
  components: {OrderItem},
  props: {
    orderList: null
  },
  methods: {
    orderClick(order) {
      console.log(order)
    },
    payClick(oid) {
      payForOrder(oid).then((res) => {
        if (res.code === 200) {
          Toast("购买成功")
          setTimeout(
            function () {
              location.reload()
            }
          ,2000)
        }
      })
    }
  }
}
</script>

<style scoped>

.order {
  background-color: white;
  font-size: 0.9rem;
}

.pay_button {
  height: 35px;
  width: 100px;
  float: right;
  margin: 10px;
  border-radius: 100px;
}

.order_item {
  height: 210px;
  overflow: hidden;
}

.order_top {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: solid #ddd;
  border-width: 0 0 1px 0;
}

.total_price {
  width: 100%;
  text-align: right;
  padding: 10px;
  color: black;
  border: solid #ddd;
  border-width: 1px 0;
}

.hint{
  margin-top: 35vh;
  text-align: center;
}

</style>
