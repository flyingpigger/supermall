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
          <span class="login" v-else>{{uBaseInfo.userName}}</span>
        </div>
        <div class="arrow">
          <img src="~assets/img/common/arrow-left.svg" alt="">
        </div>
      </div>
      <!--      <div class="login_out" @click="quitClick">退出账号</div>-->
    </div>

    <div style="height: 15px; background-color: #eeeeee"></div>

    <van-cell is-link @click="myOrder">我的订单</van-cell>
    <van-cell is-link>我的地址</van-cell>

    <div style="height: 13px; background-color: #eeeeee"></div>

    <van-cell is-link>我的消息</van-cell>
    <van-cell is-link>积分商城</van-cell>

  </div>
</template>

<script>


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
  activated() {
    this.uBaseInfo.uid = this.$route.params.uid;
    // this.uBaseInfo.userName = this.$cookies.get("userName");
    this.uBaseInfo.userName = this.$store.state.userName;
    console.log("111111111")
  },
  methods: {
    login() {
      this.$router.replace("/login");
    },
    myOrder() {
      this.$router.push("/order");
    },
    myAddress() {
      this.$router.push("/address");
    }
  }
  // activated() {
  //   if (this.$store.state.uid === "") {
  //     this.$router.replace("/login");
  //   }
  // }
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
  padding-right: 3px;
}

.arrow img {
  height: 20px;
}

</style>
