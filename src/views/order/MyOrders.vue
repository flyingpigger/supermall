<template>
  <div class="body">
    <van-nav-bar class="van-nav-bar--fixed"
                 title="我的订单"
                 left-arrow
                 @click-left="onClickLeft"
    />

    <div class="main">
      <span style="padding-top: 0.5px"></span>
      <van-tabs v-model="active">
        <van-tab title="待付款">
          <wait-for-pay :orderList="waitForPay"/>
        </van-tab>
        <van-tab title="待发货">
          <wait-for-deliver :orderList="waitForDeliver"/>
        </van-tab>
        <van-tab title="待收货">
          <wait-for-receive :orderList="waitForReceive"/>
        </van-tab>
        <van-tab title="已完成">
          <completed-orders :order-list="completedList"/>
        </van-tab>
        <!--        <van-tab title="待评价">内容 4</van-tab>-->
      </van-tabs>
    </div>
  </div>
</template>

<script>

import {myOrder} from "@/network/order"
import {UID} from "@/common/cookie_keys"

import WaitForPay from "@/views/order/childrenComps/WaitForPay"
import WaitForReceive from "@/views/order/childrenComps/WaitForReceive"
import WaitForDeliver from "@/views/order/childrenComps/WaitForDeliver"
import CompletedOrders from "@/views/order/childrenComps/CompletedOrders"

export default {
  name: "MyOrders",
  components: {
    WaitForDeliver,
    WaitForReceive,
    WaitForPay,
    CompletedOrders
  },
  data() {
    return {
      active: 0,
      waitForPay: [],
      waitForDeliver: [],
      waitForReceive: [],
      completedList: [],
    }
  },
  created() {
    myOrder(this.$cookies.get(UID)).then((orders) => {
      // console.log(orders)
      for (let order of orders) {
        if (order.isPaid === false) {
          this.waitForPay.push(order)
          continue
        }
        if (order.isDelivered === false) {
          this.waitForDeliver.push(order)
          continue
        }
        if (order.isReceived === false) {
          this.waitForReceive.push(order)
          continue
        }
        this.completedList.push(order)
      }
    })
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
  }
}

</script>

<style scoped>

.main {
  margin-top: 44px;
  position: relative;
  height: calc(100vh - 44px - 49px);
  z-index: 99;
}


.body {
  background-color: #e8e8e8;
}

.main {
  margin-top: 44px;
  position: relative;
  height: calc(100vh - 44px - 49px);
  overflow: auto;
}

</style>
