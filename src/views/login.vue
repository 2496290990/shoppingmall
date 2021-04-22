<template>
  <div class="login-container">
    <div class="login-cnt">
      <div class="cnt2">
        <p class="title_logo">吃货网</p>
        <p class="title">Sign in</p>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          style="margin-top: 30px"
        >
          <el-form-item label="" prop="email">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱账号"
              @keyup.enter.native="goLogin"
            />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="goLogin"
            />
          </el-form-item>
          <!-- <el-form-item>
            <div class="tool-cnt">
              <el-checkbox v-model="remember">记住密码</el-checkbox>
              <el-link type="primary" href="/resetPsw" style="line-height: 1.4">忘记密码？</el-link>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              class="w-100"
              :loading="loading"
              @click="goLogin"
              >{{ loading ? "正在登录" : "登 录" }}</el-button
            >
          </el-form-item>
          <el-form-item class="register-cnt">
            <!-- 还没有账号？<el-link type="primary" href="/register/register" style="line-height: 1.4">马上注册</el-link> -->
            还没有账号？
            <span
              @click="jumpLink('/register')"
              style="color:#409eff;    cursor: pointer;"
              >马上注册</span
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login,getUserInfo } from "@/api/user";
let loadingInstance = null;

export default {
  name: "Login",
  data() {
    const valiUsername = (rule, value, callback) => {
      if (isEmail(value)) {
        callback()
      } else {
        callback(new Error('请输入账号'))
      }
    }
    const valiPassword = (rule, value, callback) => {
      if (value.trim()) {
        callback();
      } else {
        callback(new Error("请输入密码"));
      }
    };

    return {
      // banners: [banner1],

      loginForm: {
        email: "",
        password: "",
      },
      loginRules: {
        username: [
          { validator:valiUsername,trigger: "change" },
        ],
        password: [{ validator: valiPassword, trigger: "change" }],
      },

      loading: false,
      remember: false,
      redirect: null,
    };
  },
  mounted() {
  },
  methods: {
    jumpLink(url) {
      this.$router.push({
        path: url,
      });
    },
    // 获取用户信息
    getUserInfo(){
        getUserInfo().then(data=>{
             sessionStorage.setItem("userNameA",data.userName);
             sessionStorage.setItem("userName",data.roleList[0].roleName);
            sessionStorage.setItem("roleCode",data.roleList[0].roleCode);
             this.$router.push({
                  path: "/index",
                });
        })
    },

    // 登录
    goLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login(this.loginForm)
            .then((data) => {
               sessionStorage.setItem("token",data);
                this.$message({
                  message: "登录成功",
                  type: "success",
                });

                this.getUserInfo()

            })
            .finally(() => {
              this.loading = false;
            });

        }
      });
    },


  },
};
</script>

<style lang="scss" scoped>
$bg: #f5f5f5;
$cnt-width: 1100px;
$cnt-height: 480px;
$cnt1-width: 600px;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  // background-color: $bg;
  // background: url("../assets/img/s0.jpg") no-repeat left center;
  background: url("../assets/img/bjt.jpeg") no-repeat left center;
  background-size: cover;
  background-position-x: right;
}
.login-cnt {
  display: flex;
  justify-content: space-between;
  width: $cnt-width;
  border-radius: 8px;
  overflow: hidden;

  .cnt1 {
    width: $cnt1-width;
  }
  .cnt2 {
    width: 500px;
    padding: 30px 80px;
    margin: 0 auto;
    box-shadow: 0px 0px 10px #c0c0c0;
    border-radius: 10px;
    opacity: 0.8;
    background-color: #fff;
    margin-bottom: 10px;
    width: $cnt-width - $cnt1-width;
    // padding: 30px 80px;
    .title {
      font-size: 20px;
      text-align: left;
      margin-bottom: 20px;
    }
    .title_logo {
      margin-top: 20px;
      font-size: 30px;
      color: #303030;
      font-weight: 600;

      text-indent: 30px;

      margin-bottom: 10px;
    }
  }
}
.title {
  color: #303030;
  font-weight: 600;
  text-align: center;
}
.tool-cnt {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-cnt {
  margin-bottom: 0;
  text-align: center;
}
.bannerCnt {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 100px;
  .bannerCnt-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .bannerCnt-body {
    max-width: 600px;
  }
  .bannerCnt-body_title {
    font-size: 34px;
    color: #ffffff;
  }
  .bannerCnt-body_line {
    width: 40px;
    height: 6px;
    background: #ffa70f;
    margin-bottom: 20px;
    margin-top: 5px;
  }
  .bannerCnt-body_text {
    margin-top: 10px;
    margin-bottom: 40px;
    font-size: 20px;
    color: #e7eaec;
  }
}
</style>
<style>
.register-cnt .el-form-item__content {
  line-height: 35px;
}
</style>
