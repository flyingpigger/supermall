<template>
  <div id="bottom-bar">
    <div @click="checkClick" style="display: flex;">
      <cart-check-button :isChecked="checkAll" ref="checkButtonRef" class="check-button"/>全选
    </div>
    <div class="calc">总计：￥{{ totalPrice }}</div>
    <div class="buy" @click="buySth">去结算({{ totalLength }})</div>
  </div>
</template>
<script>
import CartCheckButton from "./CartCheckButton.vue";
import {checkAllClick} from "@/network/cart"
import {UID} from "@/common/cookie_keys"

export default {
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    checkedItem() {
      return this.cartList.filter(item => item.checked === true);
    },
    totalLength() {
      return this.checkedItem.length;
    },
    totalPrice() {
      return this.checkedItem.reduce(
        (preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2);
    },
    checkAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return this.cartList.every(value => value.checked === true);
      }
    }
  },
  components: {
    CartCheckButton
  },
  // filters: {
  //   keep2Decimal(value) {
  //     return Math.round(value * 100) / 100;
  //   }
  // },
  methods: {
    checkClick() {
      /* if (this.checkAll == true) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);
      } */
      let checkFlag = !this.checkAll;
      this.cartList.forEach(item => (item.checked = checkFlag));
      checkAllClick(this.$cookies.get(UID), checkFlag);
    },
    buySth() {
      if (this.totalLength === 0) {
        this.$toast.show("请选择要购买的商品");
      } else {
        this.$router.push('/submitOrder');
      }
    }
  }
};
</script>
<style scoped>
#bottom-bar {
  position: relative;
  display: flex;

  background-color: rgb(228, 228, 228);
  line-height: 40px;
  height: 40px;
  text-align: center;

  font-size: 0.9rem;
}

.check-button {
  margin: 0 6px 0;
}

.calc {
  flex: 1;
}
.buy {
  width: 5rem;
  background-color: #f03;
  color: white;
}
</style>
