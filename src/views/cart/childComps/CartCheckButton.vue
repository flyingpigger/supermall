<template>
  <div class="item_check">
    <div class="check-button" :class="{ checked: isChecked }">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: "CartCheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.item_check {
  width: 1.2rem;
}
.check-button {
  position: relative;
  top: calc(50% - 0.5rem);
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  border-radius: 50%;
  line-height: 20px;

  border: 0.04rem solid rgba(128, 128, 128, 0.4);
}

.checked {
  width: 1rem;
  height: 1rem;
  border-style: none;
  top: calc(50% - 0.5rem);
  background-color: red;
}
</style>
