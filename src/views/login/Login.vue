<template>
  <div class="body">

    <van-nav-bar style="background-color: #3090EC;">

      <template #left>
        <van-icon @click="back" color="white" name="arrow-left"/>
      </template>

      <template #title>
        <span style="color: white;">登录</span>
      </template>

    </van-nav-bar>

    <div class="main">
      <van-form>

        <van-field
          v-model="loginForm.username"
          name="用户名"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true }]"
        />

        <van-field
          v-model="loginForm.password"
          :type="passwordType"
          name="密码"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true },{pattern: /^\w{6,}$/,message:'密码不少于6位'}]"
        >
          <template #right-icon>
            <van-icon @click="onPassword" :class="{'van-icon-eye': isText, 'van-icon-closed-eye': !isText}"></van-icon>
          </template>
        </van-field>

        <div style="margin: 16px;">
          <van-button @click="onSubmit" round block type="info" native-type="submit" :loading="isLoading">
            登录
          </van-button>
        </div>

      </van-form>

      <div style="float: right;">
        <router-link to="/register">没有账号？点击注册</router-link>
      </div>

    </div>

  </div>
</template>

<script>
import {Toast} from "vant"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        // username: "zhou",
        // password: "zhouhaijian1"
        username: "",
        password: ""
      },
      passwordType: 'password', //密码的type类型
      isText: false,
      isLoading: false
    };
  },
  methods: {
    onSubmit() { //点击登录
      //如果不符合登录条件则不会继续执行
      if (this.loginForm.username.trim() === '') {
        return
      }
      if (!this.loginForm.password.match(/^\w{6,}$/)) {
        return
      }
      this.isLoading = true
      this.$store
        .dispatch("Login", this.loginForm)
        .then(response => {
          let code = response.code;
          if (code === 200) {
            Toast.success('登陆成功');
            // let uid = this.$cookies.get("uid");
            // let userName = this.$cookies.get("userName")
            // this.$store.commit(CHANGE_UID, uid);
            // this.$store.commit(CHANGE_USERNAME, userName);

            setTimeout(() => {
              this.$router.replace('/profile')
              this.isLoading = false
            }, 1000)
          } else {
            setTimeout(() => {
              this.isLoading = false
            }, 1000)
            Toast.fail('用户名或密码错误');
          }
        })
        .catch(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        });
    },

    onPassword() {
      this.isText = !this.isText
      if (this.isText) {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },

    back() {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
