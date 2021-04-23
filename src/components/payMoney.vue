<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="parentData.show" width="70%">
        <div class="payMoney">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品名称:">
              <span>1111</span>
            </el-form-item>
            <el-form-item label="商品单价:">
              <span>1111</span>
            </el-form-item>
            <el-form-item label="商品数量:">
              <span>1111</span>
            </el-form-item>
            <el-form-item label="总价:">
            <span>1111元</span>
          </el-form-item>
            <el-form-item label="收货信息:">
              <el-table
                  :data="tableData"
                  border
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="nickname" label="收货人"></el-table-column>
                <el-table-column prop="mapId" label="所在地区"></el-table-column>
                <el-table-column prop="address" label="详细地址"></el-table-column>
                <el-table-column prop="phone" label="手机号码"></el-table-column>
                <el-table-column  label="默认地址">
                  <template slot-scope="scope">
                    <el-switch disabled v-model="scope.row.isDefault" aria-readonly active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <div style="text-align: right">
              <el-button size="small">取消订单</el-button>
              <el-button size="small" type="primary" @click="payClick()">付款</el-button>
            </div>
          </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchAddressList} from "@/api/user";
import { purchase  } from "@/api/user";
export default {
  name: "payMoney",
  props:['parentData'],
  data() {
    return{
      tableData:[],// 收获地址
      multipleSelection:[],
      form:{
        name:''
      }
    }
  },
  mounted() {
    this.getUserAddressList()
  },
  methods:{
    //获取用户收货地址列表
    getUserAddressList() {
      fetchAddressList().then(res => {
        this.tableData = res
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    payClick() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择收获地址')
        return
      }
      if (this.multipleSelection.length > 1) {
        this.$message.error('只能选择一条收货地址')
        return
      }
      let data ={
        foodId:this.parentData.foodId,
        count:this.parentData.count,
      }
      purchase(data).then((res) => {
          this.$message({
              message: '购买成功！！',
            type: "success",
          })
          this.$router.push('/myOrder')

      });
    }
  }
}
</script>

<style scoped>
.payMoney{
  text-align: left !important;
}
  .payMoney .el-form-item{
    margin-bottom: 5px !important;
  }
</style>
