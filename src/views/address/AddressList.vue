<template>
  <div class="body">
    <van-nav-bar
      title="我的地址"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-address-list
      :list="list"
      default-tag-text="默认"
      :switchable=false
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>

import {getAddressList} from "@/network/address"

import {UID} from "@/common/cookie_keys"

export default {
  name: "AddressList",
  data() {
    return {
      list: [],
    }
  },
  activated() {
    getAddressList(this.$cookies.get(UID)).then((res) => {
      this.list = res
      this.list.forEach(item => (item.address = item.province
        + " " + item.city
        + " " + item.county
        + " " + item.addressDetail)
      )
    })
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onAdd() {
      this.$router.push("/addressAdd");
    },
    onEdit(index) {
      this.$router.push({name: "addressEdit", params: index});
    },
  }
}
</script>

<style scoped>

.body{
  background-color: #e8e8e8;
  height: 100vh;
}

</style>
