<template>
  <div>

    <van-nav-bar style="background-color: #07C160;">

      <template #left>
        <van-icon @click="back" color="white" name="arrow-left"/>
      </template>

      <template #title>
        <span style="color: white;">新用户注册</span>
      </template>

    </van-nav-bar>

    <van-form>

      <van-field
        v-model="registerForm.username"
        name="用户名"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[{ required: true },{pattern:/^[a-zA-Z0-9_-]{4,16}$/ , message: '长度为4-16位'}]"
      />

      <van-field
        v-model="registerForm.password"
        :type="passwordType"
        name="密码"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true },{pattern: /^(?=.*[a-z])(?=.*\d)[^]{6,}$/,message:'密码不少于6位且至少包含一个字母和数字'}]"
      >
        <template #right-icon>
          <van-icon @click="onPassword" :class="{'van-icon-eye': isText, 'van-icon-closed-eye': !isText}"></van-icon>
        </template>
      </van-field>

      <van-field
        v-model="rePassword"
        :type="passwordType"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true },{validator , message: '两次输入的密码不一致'}]"
      />

      <div style="margin: 16px;">
        <van-button @click="onSubmit" round block type="primary" native-type="submit" :loading="isLoading">
          注册
        </van-button>
      </div>
    </van-form>

    <div style="float: right;">
      <router-link to="/login">立即登录</router-link>
    </div>

  </div>
</template>

<script>
import {Toast} from 'vant';
import {register} from "@/network/login"

export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        // username: "zhou",
        // password: "zhou888888"
        username: "",
        password: ""
      },
      rePassword: "",
      passwordType: 'password', //密码的type类型
      isText: false,
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      if (this.registerForm.username.trim() === '') {
        return
      }
      if (!this.registerForm.username.match(/^[a-zA-Z0-9_-]{4,16}$/)) {
        return
      }
      if (!this.registerForm.password.match(/^(?=.*[a-z])(?=.*\d)[^]{6,}$/)) {
        return
      }
      register(this.registerForm).then((res) => {
        if (res.code === 200) {
          Toast.success('注册成功');
          setTimeout(() => {
            this.$router.replace('/login')
            this.isLoading = false
          }, 1000)
        } else {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
          Toast.fail(res.message);
        }
      })

    },

    onPassword() {
      this.isText = !this.isText
      if (this.isText) {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },

    validator() {
      return this.rePassword === this.registerForm.password
    },

    back() {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
