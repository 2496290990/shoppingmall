<template>
  <div class="type">
    <headers tab="/adminType"></headers>
    <div class="content">
      <h3 style="margin-bottom:40px">分类管理</h3>
      <el-card
        style="margin-bottom: 50px"
      >
        <div class="typeList">
          <span style="font-size: 18px;font-weight: 700;">类型分类</span>
          <el-button type="primary" size="mini" @click="newFood"
            >新增</el-button
          >
        </div>
        <div class="kunag">
          <div class="itemK" v-for="(im, index) in foodList" :key="index">
            {{ im.dicName }}
            <i
              class="el-icon-edit"
              style="padding:0 10px"
              @click="fDetail(im)"
            ></i>
          </div>
        </div>
      </el-card>
      <el-card
        style="margin-bottom: 50px"
      >
        <div class="typeList">
          <span class="typeA">口味分类</span
          ><el-button type="primary" class="newInt" size="mini" @click="newIntm"
            >新增</el-button
          >
        </div>
        <div class="kunag">
          <div class="itemK" v-for="(im, index) in flavorList" :key="index">
            {{ im.dicName }}
            <i
              class="el-icon-edit"
              style="padding:0 10px"
              @click="voDetail(im)"
            ></i>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 分类新增 -->
    <el-dialog
      :title="inputNux + '分类'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input v-model="dicName" placeholder="请输入分类"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFoodType">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 口味新增 -->
    <el-dialog
      :title="inputNux1 + '口味'"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <el-input v-model="kwName" placeholder="请输入口味"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="saveTasteType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFoodType,
  getTasteType,
  saveFoodType,
  saveTasteType,
} from "@/api/user";

export default {
  data() {
    return {
      inputNux: "新增",
      inputNux1: "新增",
      foodList: [],
      flavorList: [],
      dicName: "",
      dicCode: "",
      kwName: "",
      kwCode: "",
      dialogVisible: false,
      dialogVisible1: false,
    };
  },
  created() {
    this.getFoodType();
    this.getTasteType();
  },
  methods: {
    // 食品分类新增
    newFood() {
      this.dialogVisible = true;
      this.inputNux = "新增";
    },
    saveFoodType() {
      saveFoodType({ dicName: this.dicName, dicCode: this.dicCode }).then(
        (data) => {
          this.dialogVisible = false;
          this.getFoodType();
          this.dicName = ''
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
      );
    },

    // 食品分类编辑
    fDetail(fl) {
      (this.dialogVisible = true), (this.dicName = fl.dicName);
      this.dicCode = fl.dicCode;
      this.inputNux = "修改";
    },
    // 口味分类新增
    newIntm() {
      this.dialogVisible1 = true;
      this.inputNux1 = "新增";
    },
    // 口味分类编辑
    voDetail(kw) {
      this.dialogVisible1 = true;
       this.kwName = kw.dicName;
      this.kwCode = kw.dicCode;
      this.inputNux1 = "修改";
    },
    saveTasteType() {
      saveTasteType({ dicName: this.kwName, dicCode: this.kwCode }).then(data=>{
         this.dialogVisible1 = false;
          this.getTasteType();
           this.kwName = ''
          this.$message({
            type: "success",
            message: "保存成功",
          });
      })
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
  },
};
</script>

<style scoped lang="scss">
.content {
  margin: 50px auto;
  width: 1200px;
  .typeList {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 40px;
    // flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    .typeA {
      position: absolute;
      left: 30px;
      top: 20px;

      font-size: 18px;
      font-weight: 700;
    }

    .newInt {
      position: absolute;
      right: 30px;
      top: 20px;
    }
  }
  .kunag {
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
  }
  .itemK {
    height: 30px;
    margin-right: 20px;
    width: 200px !important;
    justify-content: center;
    display: flex;
    align-items: center;
    background: rgb(223, 223, 223) !important;
  }
}
</style>
