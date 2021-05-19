<template>
  <div id="cart">
    <nav-bar class="cart_nav_bar">
      <div slot="center">
        <div>购物车({{ cartLength }})</div>
      </div>
    </nav-bar>

    <cart-list ref="scroll"></cart-list>
    <cart-total></cart-total>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartTotal from "./childComps/CartBottomBar.vue";

import {getCart} from "@/network/cart"
import {CHANGE_CART} from "@/store/mutations_type"
import {UID} from "@/common/cookie_keys"

export default {
  name: 'Cart',
  data() {
    return {
      userID: null
    }
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    }
  },
  activated() {
    this.userID = this.$cookies.get(UID)
    this.loadCart()

    this.$bus.$on("cartImgLoadEvent", this.$refs.scroll.refresh());
  },
  methods: {
    loadCart() {
      if (this.userID) {
        getCart(this.userID).then((res) => {
          this.$store.commit(CHANGE_CART, res);
        })
      }
    }
  },
  components: {
    NavBar,

    CartList,
    CartTotal
  }
};
</script>
<style scoped>
.cart_nav_bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
