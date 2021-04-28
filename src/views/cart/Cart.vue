<template>
  <div id="cart">
    <nav-bar class="cart_nav_bar">
      <div slot="center">
        <div>购物车({{ cartLength }})</div>
      </div>
    </nav-bar>

    <cart-list></cart-list>
    <cart-total></cart-total>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";

import CartList from "./childComps/CartList.vue";
import CartTotal from "./childComps/CartBottomBar.vue";

export default {
  name: 'Cart',
  data() {
    return {};
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    }
  },
  components: {
    NavBar,

    CartList,
    CartTotal
  },
  created() {
    let a = this.$cookies.get("uid")
    console.log(a)
  },
  methods: {}
};
</script>
<style scoped>
.cart_nav_bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
