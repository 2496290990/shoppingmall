<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="parentData.show" :close-on-click-modal="false">
      <el-form :model="form" label-width="120px" :rules="rules">
        <el-form-item label="地址信息" :label-width="formLabelWidth">
          <v-distpicker  :province="form.province" :city="form.city" :area="form.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细信息" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置为默认" :label-width="formLabelWidth">
          <div style="text-align: left">
            <el-switch v-model="form.isDefault" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
        </el-form-item>
        <div>
          <el-button type="primary" size="small" @click="subClick()">提交</el-button>
          <el-button type="primary" size="small" @click="cancel()">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {addAddress,updateAddress} from "../../../api/user";

export default {
  name: "addAddress",
  components: { VDistpicker },
  props:['parentData'],
  data() {
    return{
      form:{
        isDefault:false,
        province:'',
        city:'',
        area:''
      },
      formLabelWidth:'25%',
      rules:{
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          }
        ]
      }
    }
  },
  mounted() {
    if (this.parentData.parentEvent === 'update'){
      this.form = this.parentData.obj
      let mapList = this.parentData.obj.mapId.split('-')
      this.form.province = mapList[0]
      this.form.city = mapList[1]
      this.form.area = mapList[2]
      console.log(this.form,'form')
    }
  },
  methods:{
    subClick(){
      this.form.mapId = `${this.form.province}-${this.form.city}-${this.form.area}`
      if (this.parentData.parentEvent ==='add'){
        addAddress(this.form).then(res => {
          this.$message({
            type:'success' ,
            message:res
          })
          this.$emit('closeDia')
          this.parentData.show = false
        })
      } else{
        updateAddress(this.form).then(res => {
          this.$message({
            type:'success' ,
            message:'修改成功'
          })
          this.$emit('closeDia')
          this.parentData.show = false
        })
      }

    },
    cancel() {
      this.parentData.show = false
    },
    onChangeProvince(value){
      this.form.province = value.value
    },
    onChangeCity(value){
      this.form.city = value.value
    },
    onChangeArea(value){
      this.form.area = value.value
    }
  }
}
</script>

<style scoped>
 /deep/ .distpicker-address-wrapper select{
    height: 35px !important;
   width: 32%;
  }
</style>
