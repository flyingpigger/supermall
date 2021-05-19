<template>
  <div class="body">
    <van-nav-bar
      title="选择地址"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :switchable=true
      default-tag-text="默认"
      add-button-text="确定"
      @add="onConfirm"
      @edit="onEdit"
      @select="selectItem"
    />
  </div>
</template>

<script>

import {getAddressList} from "@/network/address"

import {UID} from "@/common/cookie_keys"

export default {
  name: "AddressSelect",
  data() {
    return {
      list: [],//地址列表
      chosenIndex: 0,//当前选中的序号
      chosenAddress: {},//当前选中的地址信息
      chosenAddressId: 0,//当前选中的地址id
      currentAddressEdited: false //是否对当前选中的地址进行了更改
    }
  },
  activated() {
    this.getAddressList()
    this.$bus.$on("addressEdited", this.addressEdited)
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onEdit(item, index) {
      this.$router.push({name: "addressEdit", params: item});
      if (this.chosenIndex === index) {
        this.currentAddressEdited = true
      }
    },
    selectItem(item, index) {
      this.chosenAddress = item
      this.chosenIndex = index
    },
    onConfirm() {
      this.$bus.$emit("changeSelectedAddress", this.chosenAddress)
      this.$router.back()
    },
    addressEdited() {
      if (this.currentAddressEdited) {
        this.chosenAddress = this.list[this.chosenIndex]
      }
    },
    getAddressList() {
      getAddressList(this.$cookies.get(UID)).then((res) => {
        this.list = res
        this.list.forEach(item => (item.address = item.province
          + " " + item.city
          + " " + item.county
          + " " + item.addressDetail)
        )
        //设置chosenAddressId、chosenIndex、chosenAddress的初值
        this.chosenAddressId = Number(this.$route.params.id)
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].id === this.chosenAddressId) {
            this.chosenIndex = i
            this.chosenAddress = this.list[i]
          }
        }
      })
    }
  }
}
</script>

<style scoped>

.body {
  background-color: #e8e8e8;
  height: 100vh;
}

</style>
