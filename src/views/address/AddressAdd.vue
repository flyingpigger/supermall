<template>
  <div class="body">

    <van-nav-bar
      title="新增地址"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="address">
      <van-address-edit
        :area-list="areaList"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :address-info="addressInfo"
        show-postal
        show-set-default
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {areaList} from '@vant/area-data';

import {UID} from "@/common/cookie_keys"
import {postAddress} from "@/network/address"

export default {
  name: "AddressAdd",
  data() {
    return {
      areaList,
      addressInfo: {}
      // addressInfo: {
      //   name: "周海鉴",
      //   tel: "15002872774",
      //   province: "河北省",
      //   city: "石家庄市",
      //   county: "长安区",
      //   addressDetail: "水岸尚城",
      //   areaCode: "130102",
      //   postalCode: "065700"
      // }
    };
  },
  methods: {
    onSave(content) {
      content.uid = this.$cookies.get(UID)
      postAddress(content).then(() => {
        Toast('保存成功')
        this.$router.back()
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

</style>
