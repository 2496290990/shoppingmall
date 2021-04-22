<template>
  <div class="home">
    <div class="header">
      <ul>
        <li :class="{ active: tab === '/index' }" @click="jumpLink('/index')">
          首页
        </li>

        <!--  -->
         <li
         v-if="roleCode == 'admin'"
          :class="{ active: tab === '/adminType' }"
          @click="jumpLink('/adminType')"
        >
         管理分类
        </li>
        <li
          :class="{ active: tab === '/myOrder' }"
          @click="jumpLink('/myOrder')"
        >
          我的订单
        </li>
         <li
          :class="{ active: tab === '/shopCatList' }"
          @click="jumpLink('/shopCatList')"
        >
          购物车<img src="../assets/sp.png" alt="" />
        </li>

        <li
          v-if="roleCode == 'business'"
          :class="{ active: tab === '/perStores' }"
          @click="jumpLink('/perStores')"
        >
          我的店铺
        </li>
        <li>
          <el-dropdown trigger="click" style=" color: #e5e5e5;">
            <span class="el-dropdown-link">
              <span>{{userName?userName: '请登录'}}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="!userName">
              <el-dropdown-item class="clearfix">
                <span @click="jumpLink('/login')">登录</span>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <span @click="jumpLink('/register')">注册</span>
              </el-dropdown-item>
            </el-dropdown-menu>


             <el-dropdown-menu slot="dropdown" v-else>
              <el-dropdown-item class="clearfix">
                 <span @click="myCenter" style="display:flex">个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                <span @click="goBack">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <!-- <div class="content"></div> -->
  </div>
</template>

<script>
export default {
  props:["tab"],
  name: "Home",
  data() {
    return { input: "",userName:'',roleCode:'' };
  },
  created(){
    if(sessionStorage.getItem('userNameA')){

      this.userName=sessionStorage.getItem('userNameA')
    }
     if(sessionStorage.getItem('roleCode')){
      this.roleCode=sessionStorage.getItem('roleCode')
    }
  },
  methods: {
    myCenter(){
      this.$router.push({
         path: "/myCenter",
      })
    },
    goBack(){
      sessionStorage.removeItem("token")
      this.$router.push({
        path: '/login',
      });
    },
    jumpLink(url) {
      this.$router.push({
        path: url,
      });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-input-group--append .el-input__inner,
.el-input-group__prepend {
  height: 25px;
  border: 0;
}
.home {
  background: rgb(237, 237, 237);
  .header {
    .active {
      font-size: 15px;
      color: rgb(255, 255, 255);
    }
    width: 100%;
    background-image: linear-gradient(90deg, #222325, #3b3c3f, #222325);
    height: 45px;
    display: flex;
    justify-content: space-between;
    color: #e5e5e5;
    font-weight: 700;
    font-size: 14px;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      li {
        cursor: pointer;
        &:nth-child(1) {
          position: relative;
          left: 50px;
          margin-right: 60%;
        }
        width: 80px;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 5px;
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>
