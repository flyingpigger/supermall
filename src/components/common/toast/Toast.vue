<template>
  <div id="toast">
    <transition name="toast">
      <div class="toast_div" v-show="isShowTip">{{ message }}</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowTip: false,
      message: ""
    };
  },
  methods: {
    show(msg, delay = 1000) {
      this.isShowTip = true;
      this.message = msg;
      setTimeout(() => {
        this.isShowTip = false;
      }, delay);
    }
  }
};
</script>
<style scoped>
.toast {

}
.toast_div {
  font-size: 0.8rem;
  text-align: center;
  line-height: 2rem;
  height: 2rem;
  width: 10rem;

  background-color: rgba(128, 128, 128, 0.9);
  border-radius: 0.4rem;
  color: white;

  position: fixed;
  top: 80%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
.toast-enter-active {
  transition: opacity 0.2s;
}
.toast-leave-active {
  transition: opacity 0.2s;
}
</style>
