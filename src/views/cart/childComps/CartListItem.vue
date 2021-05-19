<template>
  <div class="cart_list_item">
    <cart-check-button
      @click.native="checkClick"
      :isChecked="item.checked"
      ref="checkButtonRef"
      class="checkButton"
    />
    <div class="item_img" @click="checkClick">
      <img :src="item.imgUrl" alt="" @load="imgLoad"/>
    </div>
    <div class="item_info">
      <div @click="infoClick(item)">
        <p class="item_title">{{ item.title }}</p>
        <p class="item_desc">{{ item.description }}</p>
        <span class="item_price">￥{{ item.price }}</span>
        <!--      <span class="item_count">x{{ item.count }}</span>-->
      </div>
      <van-stepper
        @plus="plus(item)"
        @minus="minus(item)"
        class="item_count"
        v-model="item.count"
        min="0"
        theme="round"
        button-size="15"
      />
    </div>
  </div>
</template>
<script>
import CartCheckButton from "./CartCheckButton.vue";
import {addCount, checkClick, deleteItem, minusCount} from "@/network/cart"
import {ADD_COUNTER, DELETE_FROM_CART} from "@/store/mutations_type"

export default {
  props: {
    item: Object
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
      checkClick(this.item.bid, this.item.checked, this.item.uid);
    },
    infoClick(item) {
      this.$router.push("/detail/" + item.bid);
    },
    plus(item) {
      addCount(item.bid, item.uid)
    },
    minus(item) {
      if (item.count-1 === 0){
        deleteItem(item.bid, item.uid).then((res) => {
          if (res.code == 200) {
            location.reload()
          }
        })
      } else {
        minusCount(item.bid, item.uid)
      }
    },

    imgLoad() {
      this.$emit("cartImgLoadEvent");
    },
  },
  components: {
    CartCheckButton
  }
};
</script>

<style scoped>
.checkButton {
  margin: 0 0.4rem 0;
}

.cart_list_item {
  width: 100%;
  height: 5.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 0.4rem 0.4rem 0.4rem 0;
}

.item_img {
  width: 100%;
  height: 100%;
}

.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item_info {
  position: relative;
  width: calc(100% - 4.2rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}

.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item_title {
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
}

.item_desc {
  font-size: 0.6rem;
  color: gray;
}

.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}

.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>
