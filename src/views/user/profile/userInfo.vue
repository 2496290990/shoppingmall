<template>
  <div>
    <el-form ref="form" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="用户昵称" prop="userName">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="user.phone" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" maxlength="50" disabled />
      </el-form-item>
      <el-form-item label="收获地址" prop="email">
        <div style="text-align: left">
          <el-button size="small" type="primary" @click="addClick('add')">添加</el-button>
        </div>
        <div>
          <el-table
          :data="tableData"
          border
          style="width: 100%">
            <el-table-column  label="收货人"></el-table-column>
            <el-table-column  label="所在地区"></el-table-column>
            <el-table-column  label="详细地址"></el-table-column>
            <el-table-column  label="手机号码"></el-table-column>
            <el-table-column  label="默认地址">
              <template slot-scope="scope">
                <el-switch v-model="value" aria-readonly active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100%" />
          </el-table>
        </div>
        <div>
          <el-table :data="tableData" border style="width: 100%">

            <el-table-column prop="nickname" label="收货人"></el-table-column>
            <el-table-column prop="mapId" label="所在地区"></el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column prop="isDefault" label="默认地址">
              <template slot-scope="scope">
                <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button  type="text" size="small" style="color: red">删除</el-button>
                <el-button type="text" size="small" @click="editClick(row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button type="danger" size="mini" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
    <add-address v-if="parentData.show" :parentData="parentData"></add-address>
  </div>
</template>

<script>
import { getUserInfo ,updateUser,fetchAddressList} from "@/api/user";
import AddAddress from "./addAddress";

export default {
  components: {AddAddress},
  // props: {
  //   user: {
  //     type: Object,
  //   },
  // },
  data() {
    return {
      dataroleList: [],
      tableData:[{}],// 收获地址
      user: {
        email: "",
        phone: "",
        userName:'',
        id:''
      },
      value:false,
      parentData:{
        show: false
      },
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
         phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],

      },
    };
  },
  created() {
    this.getUserInfo(true);
    this.getUserAddressList();
  },
  methods: {
    // 获取用户信息
    getUserInfo(type) {
      getUserInfo().then((data) => {
        this.user.email = data.email;
        this.user.phone = data.phone;
        this.user.id = data.id
        this.user.userName = data.userName;
        if(type == false){
          sessionStorage.setItem("idA",data.id);
         sessionStorage.setItem("userNameA",data.userName);
          location.reload()
        }
      });
    },
    //获取用户收货地址列表
    getUserAddressList() {
      fetchAddressList().then(res => {
        this.tableData = res
      })
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateUser(this.user).then((response) => {
              this.$message('修改成功');
              sessionStorage.setItem("token",response);
              this.getUserInfo(false)

          });
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },
    // 添加
    addClick() {
      this.parentData.show = true
    },
    editClick(row) {
      console.log(row)
      // this.parentData.show = true
    }
  },
};
</script>
<style>
  .el-table td, .el-table th{
    padding: 0 !important;
  }
</style>
