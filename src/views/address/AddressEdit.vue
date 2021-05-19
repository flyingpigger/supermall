<template>
  <div class="body">

    <van-nav-bar
      title="编辑地址"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="address">
      <van-address-edit
        :area-list="areaList"
        :address-info="info"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        show-postal
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {areaList} from '@vant/area-data';

import {deleteAddress, putAddress} from "@/network/address"
import {UID} from "@/common/cookie_keys"

export default {

  data() {
    return {
      areaList,
      uid: null,
      info: null
    };
  },
  created() {
    this.uid = this.$cookies.get(UID)
  },
  activated() {
    this.info = this.$route.params
  },
  methods: {
    onSave(content) {
      content.uid = this.uid
      putAddress(content).then((res) => {
        if (res.code === 200) {
          this.$bus.$emit("addressChanged")
          Toast('保存成功');
        }
        this.$router.back();
      })
    },
    onDelete(content) {
      content.uid = this.uid
      deleteAddress(content).then((res) => {
        if (res.code === 200) {
          Toast('删除成功');
          this.$router.back();
        } else {
          Toast('删除失败');
        }
      })
    },
    onClickLeft() {
      this.$router.back();
    }
  },
}

</script>

<style scoped>

.body {
  background-color: #e8e8e8;
  height: 100vh;
}

.address {
  padding: 12px;
}

</style>
