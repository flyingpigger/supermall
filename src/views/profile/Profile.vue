<template>
  <div>
    <div class="profile">
      <div class="title">
        个人中心
      </div>
      <div class="cell" @click="login">
        <div class="left">
          <img class="avatar" src="~assets/img/profile/avatar.svg" alt="">

          <span class="login" v-if="uBaseInfo.uid == null">登陆</span>
          <span class="login" v-else>{{ uBaseInfo.userName }}</span>
        </div>
        <div class="arrow">
          <img src="~assets/img/common/arrow-left.svg" alt="">
        </div>
      </div>
    </div>

    <div v-if="isLogin" class="clear-fix">
      <div class="options">
        <van-button @click="changePasswordClick">修改密码</van-button>
        <van-button class="login_out" @click="quitClick">退出账号</van-button>
      </div>
    </div>

    <div style="height: 15px; background-color: #eeeeee"></div>

    <van-cell is-link @click="myOrder">
      <van-icon name="bag"/>
      我的订单
    </van-cell>
    <van-cell is-link @click="myAddress">
      <van-icon name="map-marked"/>
      我的地址
    </van-cell>

    <div style="height: 13px; background-color: #eeeeee"></div>

    <van-cell is-link>我的消息</van-cell>
    <van-cell is-link>积分商城</van-cell>

  </div>
</template>

<script>

import {UID} from "@/common/cookie_keys"

export default {
  name: "Profile",
  data() {
    return {
      uBaseInfo: {
        uid: "",
        userName: ""
      }
    }
  },
  computed: {
    isLogin() {
      return this.uBaseInfo.uid !== null
    }
  },
  activated() {
    this.uBaseInfo.uid = this.$cookies.get(UID);
    this.uBaseInfo.userName = this.$cookies.get("userName");
  },
  methods: {
    login() {
      if (this.isLogin === false) {
        this.$router.push("/login");
      }
    },
    myOrder() {
      if (this.$cookies.get(UID) !== null) {
        this.$router.push("/myOrder");
      } else {
        this.$router.push("/login")
      }
    },
    myAddress() {
      if (this.$cookies.get(UID) !== null) {
        this.$router.push("/address");
      } else {
        this.$router.push("/login")
      }
    },
    quitClick() {
      this.$cookies.remove(UID)
      this.$cookies.remove("userName")
      location.reload()
    },
    changePasswordClick() {
      this.$router.push("/changePassword")
    }
  }
}
</script>

<style scoped>


.profile {
  height: 120px;
  color: white;
  background-color: #ff8198;
}

.title {
  text-align: center;
  padding: 12px;
  font-size: 1.1rem;
  border-bottom: white;
  border-bottom-width: 2px;
}

.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  height: 70px;
  padding-left: 20px;
}

.left {
  display: flex;
  align-items: center;
}

.login {
  padding-left: 10px;
}

.arrow {
  padding-right: 15px;
}

.arrow img {
  height: 20px;
}

.options{
  /*display: flex;*/
  /*justify-content: space-between;*/
  float: right;
}

</style>
