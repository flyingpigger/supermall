<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        ref="loginForm"
        label-position="left"
      >
        <h2 class="login-title color-main">mall-admin-web</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {CHANGE_UID, CHANGE_USERNAME, CHANGE_CART} from "@/store/mutations_type"

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "zhou",
        password: "888888"
      },
      loading: false,
      pwdType: "password",
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              this.loading = false;
              let code = response.code;
              if (code === 200) {
                this.$toast.show("登陆成功");
                let uid = this.$cookies.get("uid");
                let userName = this.$cookies.get("userName")
                let cartList = response.data;
                this.$store.commit(CHANGE_UID, uid);
                this.$store.commit(CHANGE_USERNAME, userName);
                this.$store.commit(CHANGE_CART, cartList);
                console.log(response.data)

                this.$router.replace("/profile/" + uid);
              } else {
                this.$toast.show("账号或密码错误");
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/*.login-form-layout {*/
/*  position: absolute;*/
/*  left: 0;*/
/*  right: 0;*/
/*  width: 360px;*/
/*  margin: 140px auto;*/
/*  border-top: 10px solid #409eff;*/
/*}*/

.login-title {
  text-align: center;
}

.login-form-layout {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
