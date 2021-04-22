<template>
  <div class="perStores">
    <headers tab="/perStores">></headers>
<!--    <p class="gwc">-->
<!--      <span style="font-weight: 800;">吃货网</span>-->
<!--      <span>>>我的店铺</span>-->
<!--      <el-button-->
<!--        type="primary"-->
<!--        style="margin-left: 80%;"-->
<!--        @click="dialogFormVisible = true"-->
<!--        >新增</el-button-->
<!--      >-->
<!--    </p>-->
    <div class="tabsMain">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="店铺商品" name="first">
          <div class="content">
            <el-card style="margin-bottom:50px">
              <el-row slot="header">
                <header>
                  <h5 style="margin-left: 25px;
                  float: left;
                font-weight: bolder;
                font-size: 18px;
                line-height: 60px;
                color: #666;display: flex;
                height: 25px;
                align-items: center;
                justify-content: space-between;">我的店铺商品</h5>
                  <div style="text-align: end">
                    <el-button type="primary" size="small" @click="addClick()">新增</el-button>
                  </div>
                </header>
              </el-row>
              <!-- 列表 -->
              <el-row :gutter="20">
                <el-col
                    :span="6"
                    v-for="(card, index) in persList"
                    :key="index"
                    style="height: 370px;"
                >
                  <el-card :body-style="{ padding: '0px' }">
                    <img  :src="card.mainPictureUrl" class="image" style="width: 280px;height: 200px;">
                    <div style="padding: 14px;">
                      <div class="bottom clearfix">
                        <h3 style=" margin-bottom: 10px;">{{ card.name }}</h3>
                        <p style="color:red">￥{{ card.price }}元</p>
                        <div>
                          <el-button type="text" class="button">下架</el-button>
                          <el-button type="text" class="button" @click="xgRelease(card.id)">修改</el-button>
                          <el-button type="text" class="button" style="color: red" @click="deleteS(card.id)">删除</el-button>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品统计" name="second">
          <statistics></statistics>
        </el-tab-pane>
        <el-tab-pane label="销量统计" name="third">
          <pie-chart></pie-chart>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增 -->
    <el-dialog
      :title="inputNX"
      :visible.sync="dialogFormVisible"
      @close="closeDia"
    >
      <el-row style="overflow: hidden;     margin-left: -20px">
        <div class="notice">
          <el-form ref="form">
            <el-row type="flex" style="justify-content: space-between;">
              <!-- <span class="bt">*</span> -->
              <el-col :span="11">
                <el-form-item
                  label="商品名称："
                  :label-width="formLabelWidth"
                  prop="empName"
                  style="margin-bottom:0px"
                >
                  <el-input
                    v-model.trim="form.name"
                    autocomplete="off"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 222 -->
              <el-col :span="11">
                <el-form-item
                  label="库存："
                  :label-width="formLabelWidth"
                  style="margin-bottom:0px"
                >
                  <el-input
                    v-model.trim="form.amount"
                    autocomplete="off"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 2 -->
            <el-row type="flex" style="justify-content: space-between;">
              <!-- <span class="bt">*</span> -->
              <el-col :span="11">
                <el-form-item
                  label="价格："
                  :label-width="formLabelWidth"
                  prop="price"
                  style="margin-bottom:0px"
                >
                  <el-input
                    v-model.trim="form.price"
                    autocomplete="off"
                    size="small"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- 222 -->
              <el-col :span="11">
                <el-form-item
                  label="口味："
                  :label-width="formLabelWidth"
                  style="margin-bottom:0px"
                >
                  <el-select v-model="form.tasteTypeCode" placeholder="请选择">
                    <el-option
                      v-for="item in flavorList"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 3 -->
            <el-row type="flex" style="justify-content: space-between;">
              <el-col :span="11">
                <el-form-item
                  label="食品类型："
                  :label-width="formLabelWidth"
                  prop="foodTypeCode"
                  style="margin-bottom:0px"
                >
                  <el-select v-model="form.foodTypeCode" placeholder="请选择">
                    <el-option
                      v-for="item in foodList"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 222 -->
              <el-col :span="11">
                <el-form-item
                  label="图片："
                  :label-width="formLabelWidth"
                  style="margin-bottom:0px"
                >
                  <el-upload
                    :headers="{
                      Authorization: token,
                    }"
                    :on-change="handleChange"
                    :on-success="handSuccess"
                    :before-upload="beforeUpload"
                    name="file"
                    :show-file-list="false"
                    id="upload"
                    type="flex"
                    justify="left"
                    class="upload-demo"
                    action="http://localhost:8090/foodie-net/file/uploadFile"
                    :on-preview="handlePreview"
                    list-type="picture"
                  >
                    <el-button
                      size="small"
                      style="background: rgb(24, 144, 255); width: 60px; height: 32px; color: rgb(255, 255, 255); border-radius: 0px 4px 4px 0px;"
                      >上传
                    </el-button>
                  </el-upload>
                </el-form-item>

                <span class="tpuplod"
                  >(限.jpg .png格式，建议宽高尺寸115*125)</span
                >
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">
                <el-form-item
                  label="商品描述："
                  :label-width="formLabelWidth"
                  style="margin-bottom:0px"
                >
                  <el-input type="textarea" v-model="form.describe"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="24">
                <el-form-item
                    label="商品规格："
                    :label-width="formLabelWidth"
                    style="margin-bottom:0px"
                >
                  <div style="text-align: left">
                    <el-button type="primary" size="small" @click="pushData()">增行</el-button>
                  </div>
                  <el-table :data="tableData" border style="width: 100%" height="150px">
                    <el-table-column prop="date" label="规格名称" >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.date" placeholder="请输入内容" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="单价" >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.date" placeholder="请输入内容" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="数量" >
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.date" placeholder="请输入内容" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="操作" width="80px" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" @click="delClick(scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-row>

      <el-row>
        <div class="dialog-footer">
          <el-button
            type="primary"
            size="small"
            @click="NewRelease"
            style="margin-right: 20px"
            >提交</el-button
          >
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  perList,
  putOnOrOff,
  save,
  deleteS,
  getFoodType,
  getTasteType,
  info,
} from "@/api/user";
import Statistics from "../components/Statistics";
import PieChart from "../components/pieChart";
export default {
  components: {PieChart, Statistics},
  data() {
    return {
      activeName: 'first',
      foodList: [],
      flavorList: [],
      tableData: [],// 规格
      value: "",
      token: "",
      inputNX: "商品新增",
      persList: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        amount: "",
        price: "",
        // 口味
        tasteTypeCode: "",
        // tasteTypeName: "",
        foodTypeCode: "",
        // foodTypeName: "",
        mainPictureUrl: "",
        describe: "",
        guige: "",// 商品规格
      },
      formLabelWidth: "110px",
    };
  },
  created() {
    this.perList();
    this.getFoodType();
    this.getTasteType();
    this.token = sessionStorage.getItem("token");
  },
  methods: {
    // 新增
    addClick() {
      this.dialogFormVisible = true
      for (let i in this.form){
        this.form[i] = ''
      }
    },
    pushData(){
      let obj ={

      }
      this.tableData.push(obj)
    },
    delClick(index) {
      this.tableData.splice(index,1)
    },
    // 所有分类
    getFoodType() {
      getFoodType().then((data) => {
        this.foodList = data;
      });
    },
    // 口味
    getTasteType() {
      getTasteType().then((data) => {
        this.flavorList = data;
      });
    },
    deleteS(id) {
      this.$confirm("此操作将永久删除记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          deleteS({ id: id })
            .then((res) => {
              this.perList();
            })
            .catch((err) => {});
          this.$message({
            type: "sucess",
            message: "删除成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 上下架
    upOdo(id, status) {
      putOnOrOff({ id: id, status: status == 1 ? 2 : 1 }).then((res) => {
        this.$message({
          message: "操作成功！！",
          type: "success",
        });
        this.perList();
      });
    },
    // 商家列表
    perList() {
      perList().then((res) => {
        this.persList = res.list;
      });
    },
    // 编辑发布
    xgRelease(i) {
      this.form.id = i;
      this.dialogFormVisible = true;
      console.log("xg", this.form.id);
      this.info(i);
    },
    // 购买详情
    info(id) {
      info({ id: id }).then((res) => {
        console.log("回显", res);
        this.form = res;
      });
    },
    // 新增发布保存
    NewRelease() {
      save(this.form).then((res) => {
        (this.dialogFormVisible = false),
          this.$message({
            message: "保存成功",
            type: "success",
          });
        this.perList();
        this.form = {
          name: "",
          amount: "",
          price: "",
          // 口味
          tasteTypeCode: "",
          // tasteTypeName: "",
          foodTypeCode: "",
          // foodTypeName: "",
          mainPictureUrl: "",
          describe: "",
        };
      });
    },
    // 弹出菜单 上传成功/失败调用
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3)
    },
    // 上传成功,赋值附件
    handSuccess(response, file, fileList) {
      this.form.mainPictureUrl = response.data;
      this.$message({
        message: "上传成功！！",
        type: "success",
      });
    },
    //  上传文件名
    beforeUpload(file) {
      var arr = [".jpg", ".png"]; //允许上传的文件类型
      var flaig = arr.some((val) => {
        return file.name.endsWith(val);
      });
      if (!flaig) {
        this.$message({
          message: "请上传正确的文件格式！！",
          type: "error",
        });

        return false;
      } else if (file.size > 1024 * 1024) {
        this.$message({
          message: "请上传1M以内的照片",
          type: "error",
        });
        return false;
      }
    },
    handlePreview(file) {
      console.log(file);
    },

    closeDia() {
      this.nameList = [];
      this.urlList = [];
      this.fileList = [];
    },
    jumpLink(url) {
      this.$router.push({
        path: url,
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>

<style scoped lang="scss">
.textHidden {
  height: 37px;
  width: 230px;
  margin: 0 auto;
  text-indent: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 10px;
}
::v-deep .el-input--suffix .el-input__inner {
  height: 32px;
  width: 240.5px;
}
::v-deep .el-dialog__header {
  background: #3a8ee6;
}
::v-deep .el-icon-close:before {
  content: "\e6db";
  color: white;
}
::v-deep .el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: white;
  font-weight: 700;
}
.el-row {
  margin-bottom: 20px;
}
.tpuplod {
  margin-top: 5px !important;
  color: red;
}
.perStores {
  // background: rgb(237, 237, 237);
}
.gwc {
  width: 1180px;
  margin: 20px auto 0;
  height: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
  align-items: center;
  font-size: 16px;
  // font-weight: 800;
}
.content {
  margin: 0px auto;
  width: 100%;
}
  .tabsMain{
    width: 90%;
    margin: 0 auto;
  }
/deep/ .el-card__header{
  padding: 9px 20px !important;
}
.perStores .el-table td, .el-table th{
  padding: 0 !important;
}
</style>
