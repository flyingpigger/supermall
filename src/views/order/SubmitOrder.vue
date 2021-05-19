<template>
  <div>
    <van-nav-bar class="van-nav-bar--fixed"
                 title="确认订单"
                 left-arrow
                 @click-left="onClickLeft"
    />

    <div class="main">
      <van-cell
        center
        is-link
        @click="onSelectAddress"
        :value="address.tel"
        style="padding-left: 30px"
      >
        <van-icon name="location"/>
        <template #title>
          <span class="title">{{ address.name }}</span>
        </template>
        <template #label>
          <span class="label">{{ address.addressDetail }}</span>
        </template>
      </van-cell>

      <div>
        <van-card v-for="item in goodsList"
                  :num="item.count"
                  :price="item.price"
                  :desc="item.description"
                  :title="item.title"
                  :thumb="item.imgUrl"
        />
      </div>
      <order-bottom-bar :count="totalCount" :price="totalPrice" @buyClick="buyClick"/>
    </div>
  </div>
</template>

<script>

import OrderBottomBar from "@/views/order/childrenComps/OrderBottomBar"
import {Toast} from 'vant'
import {Cell} from 'vant'

import {UID} from "@/common/cookie_keys"
import {getDefaultAddress} from "@/network/address"
import {postOrder} from "@/network/order"
import {deleteItem} from "@/network/cart"

export default {
  name: "SubmitOrder",
  components: {
    OrderBottomBar,
    Cell
  },
  data() {
    return {
      address: [],
      goodsList: [],
      totalCount: 0,
      totalPrice: 0
    }
  },
  created() {
    getDefaultAddress(this.$cookies.get(UID)).then((res) => {
      this.address = res
    })
  },
  activated() {
    let list = [];
    let count = 0;
    let price = 0;
    for (let item of this.$store.state.cartList) {
      if (item.checked) {
        count += item.count
        price += item.price * item.count
        list.push(item)
      }
    }
    this.goodsList = list
    this.totalCount = count
    this.totalPrice = price.toFixed(2);

    this.$bus.$on("changeSelectedAddress", this.changeSelectedAddress);
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    buyClick() {
      if (this.address.length === 0) {
        Toast('提交失败，请选择地址')
        return
      }
      if (this.goodsList.length === 0) {
        Toast('提交失败，请重新提交商品')
        return
      }
      let address = this.address
      let order = {}
      let time = new Date()
      let uid = this.$cookies.get(UID)
      order.uid = Number(uid)
      order.bookList = JSON.stringify(this.goodsList)
      order.totalPrice = this.totalPrice
      order.address = address.province + address.city + address.county
      order.tel = address.tel
      order.name = address.name
      order.date = time.toLocaleString()
      postOrder(order).then((res) => {
        if (res.code === 200) {
          let bookList = this.goodsList
          for (let i = 0; i < bookList.length; i++) {
            deleteItem(bookList[i].bid, uid)
          }
          Toast('提交成功')
          this.$router.back()
          setTimeout(
            function () {
              location.reload()
            }
            , 1500)
        }
      })
    },
    onSelectAddress() {
      this.$router.push("/addressSelect/" + this.address.id)
    },
    changeSelectedAddress(payload) {
      this.address = payload
    }
  }
}

</script>

<style scoped>

.label {
  color: black;
  overflow: auto;
}

.main {
  margin-top: 44px;
  position: relative;
  height: calc(100vh - 44px - 49px);
  overflow: auto;
}

</style>
