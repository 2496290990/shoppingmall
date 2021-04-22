<template>
  <div class="app-container">
     <headers ></headers>
      <div class="infoMain">
          <div slot="header" class="clearfix">
            <h1>基本信息</h1>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
      </div>
  </div>
</template>

<script>
import userInfo from './userInfo'
import resetPwd from './resetPwd'
// import { getUserProfile } from '@/api/system/user'

export default {
  name: 'Profile',
  components: {  userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: 'userinfo'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      // getUserProfile().then(response => {
        // this.user = response.data
        // this.roleGroup = response.roleGroup
        // this.postGroup = response.postGroup
      // })
    }
  }
}
</script>
<style>
  .infoMain{
    width: 80%;
    margin: 0 auto;
  }
</style>
