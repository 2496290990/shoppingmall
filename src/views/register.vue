<template>
  <div class="register-container">
    <section class="container">
      <!-- <block-title name="注册" margin-top="0" /> -->
      <section class="form-container">
        <el-form ref="form1" :model="form1" :rules="rules1" label-width="120px">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form1.phone" placeholder="手机号为登录账号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form1.email" placeholder="邮箱为接收验证码邮箱" />
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="vc">
            <el-input v-model="form1.vc" placeholder="邮箱验证码">
              <template slot="append">
                <el-button @click="sendVc">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="form1.userName" placeholder="用户姓名" />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              v-model="form1.password"
              show-password
              autocomplete="new-password"
              placeholder="登录密码"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="form1.password2"
              show-password
              autocomplete="new-password"
              placeholder="确认密码"
            />
          </el-form-item>

          <el-form-item label="请选择角色">
            <el-radio-group v-model="form1.roleList[0].roleCode" style="margin-right: 335x;">
               <el-radio label="customer" style="margin-right:40px">用户</el-radio>
              <el-radio label="business">商家</el-radio> 
             
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button
              style="margin-left: -100px;"
              class="w-100"
              type="primary"
              :loading="form1Loading"
              @click="submitPsw"
              >{{ form1Loading ? "正在提交" : "提交" }}</el-button
            >
          </el-form-item>
          <el-form-item class="text-center" style="margin-left: -100px;">
            已有账号，<span
              @click="jumpLink('/login')"
              style="color:#409eff;    cursor: pointer;"
              >去登录</span
            >
          </el-form-item>
        </el-form>
      </section>
    </section>
  </div>
</template>

<script>
import { register, sendVc } from "@/api/user";

import { isPhone, checkPassword,isEmail } from "@/api/validate";
let loadingInstance = null;

export default {
  name: "Register",
  data() {
    return {
      active: 0,
      steps: ["注册账号", "创建企业", "安全账号", "配置功能"],
      token: "",
      hasRegister: false, // 是否注册
      hasComList: [], // 已注册公司
      form1Loading: false,

      form1: {
        phone: "",
        email: "",
        vc: "", // 验证码类型，
        userName: "",
        password: "",
        password2:'',
        roleList: [{  roleCode: "customer"}],
        vcToken: "123123", 
      },
      options: [],
      orgId: "",
    };
  },
  created() {},
  computed: {
    rules1() {
      const valiPhone = (rule, value, callback) => {
        if (isPhone(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      };
       const valEmail = (rule, value, callback) => {
        if (isEmail(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      };
      const checkdPassword = (rule, value, callback) => {
        if (checkPassword(value)) {
          callback();
        } else {
          callback(
            new Error(
              "密码长度8-16位，且必须包含小写字母、大写字母、数字、特殊符号的两种及以上"
            )
          );
        }
      };
      const valiPassword = (rule, value, callback) => {
        if (this.form1.password === value) {
          callback();
        } else {
          callback(new Error("二次输入的密码不一致"));
        }
      };

      return {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: valiPhone, trigger: "change" },
        ],
          email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { validator: valEmail, trigger: "change" },
        ],
        vc: [
          { required: true, message: "请输入短信验证码", trigger: "change" },
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { max: 20, message: "最大20个字符", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: checkdPassword, trigger: "change" },
        ],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "change" },
          { validator: valiPassword, trigger: "change" },
        ],
      };
    },
  },
  methods: {
    jumpLink(url) {
      this.$router.push({
        path: url,
      });
    },
    // 获取token
    sendVc() {
      sendVc({ email: this.form1.email }).then((data) => {
        this.form1.vcToken = data;
        this.$message({
          message: "验证码发送成功",
          type: "success",
        });
      });
    },

    submitPsw() {
      this.$refs.form1.validate((validate) => {
        if (validate) {
          this.form1Loading = true;
          register(this.form1)
            .then((data) => { 
              this.$alert("注册成功！", "提示", {
                type: "success",
                confirmButtonText: "去登录",
                showClose: false,
                callback: () => {
                  this.$router.push({
                    path: "/login",
                  });
                },
              });
            })
            .finally(() => {
              this.form1Loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  line-height: 1.5;
}
.register-container {
  display: flex;
  align-items: center;
  background: url("../assets/img/bjt.jpeg") no-repeat left center; 
  background-size: cover;
  background-position-x: right;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 800px;
  margin: 30px auto;
  box-shadow: 0px 0px 10px #c0c0c0;
  border-radius: 10px;
  opacity: 0.8;
  padding: 50px 0;
  background: white;
}
.steps {
  margin: 0 auto 50px;
}

.form-container {
  width: 600px;
  margin: 0 auto;
}

.goLoginBtn {
  display: block;
  width: 480px;
  margin: 50px auto 22px;
}
</style>
