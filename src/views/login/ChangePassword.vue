<template>
  <div>

    <van-nav-bar style="background-color: #07C160;">

      <template #left>
        <van-icon @click="back" color="white" name="arrow-left"/>
      </template>

      <template #title>
        <span style="color: white;">修改密码</span>
      </template>

    </van-nav-bar>

    <van-form>

      <van-field
        v-model="password"
        :type="passwordType"
        name="原密码"
        label="原密码"
        placeholder="请填写原密码"
        :rules="[{ required: true },{pattern: /^(?=.*[a-z])(?=.*\d)[^]{6,}$/,message:'密码不少于6位且至少包含一个字母'}]"
      />

      <van-field
        v-model="newPassword"
        :type="passwordType"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true },{pattern: /^(?=.*[a-z])(?=.*\d)[^]{6,}$/,message:'密码不少于6位且至少包含一个字母'}]"
      />

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
          确定
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {Toast} from 'vant';
import {changPassword} from "@/network/login"
import {UID} from "@/common/cookie_keys"

export default {
  name: "ChangePassword",
  data() {
    return {
      password: "",
      newPassword: "",
      rePassword: "",
      passwordType: 'password', //密码的type类型
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      if (!this.password.match(/^(?=.*[a-z])(?=.*\d)[^]{6,}$/)) {
        return
      }
      if (!this.newPassword.match(/^(?=.*[a-z])(?=.*\d)[^]{6,}$/)) {
        return
      }
      let uid = this.$cookies.get(UID)
      let username = this.$cookies.get("userName")
      let user = {}
      user.id = uid
      user.username = username
      user.password = this.password
      changPassword(user, this.newPassword).then((res) => {
        if (res.code === 200) {
          Toast.success(res.message);
          setTimeout(() => {
            this.$router.replace('/profile')
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

    validator() {
      return this.rePassword === this.newPassword
    },

    back() {
      this.$router.back()
    }
  }
}
</script>

<style>
</style>
