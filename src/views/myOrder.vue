<template>
  <div class="myOrder">
    <headers tab="/myOrder"></headers>
    <p class="gwc">
      <span style="font-weight: 800;">吃货网</span>
      <span>>>我的订单</span>
    </p>
<!--    <div class="orderList" v-for="(i, index) in orders" :key="index">-->
<!--      <div class="top">-->
<!--        <span style="margin-right:30px">{{ i.createDate }}</span>-->
<!--        <span> 商品名称：{{ i.foodVo.name }} </span>-->
<!--      </div>-->
<!--      <div class="bottom">-->
<!--        <img :src="i.foodVo.mainPictureUrl" alt="" />-->
<!--        <span-->
<!--          style=" text-align: left;text-indent: 30px;   display: inline-block; width: 750px;"-->
<!--          >{{ i.foodVo.describe }}-->
<!--        </span>-->
<!--        <p>-->
<!--          价格:<span style="color:red"-->
<!--            >￥{{ i.foodVo.price }} x {{ i.count }}</span-->
<!--          >-->
<!--        </p>-->
<!--        <p>申请售后</p>-->
<!--        <p style="cursor: pointer" @click="delt(i.id)">删除订单</p>-->
<!--      </div>-->
<!--    </div>-->
    <div class="cardMain">
      <el-card class="box-card" v-for="(item, index) in orders" :key="index" style="height: 200px;margin: 10px 0">
        <div class="cardTop">
          <div class="ordersTime">购买时间:</div>
          <div>购买店铺:</div>
        </div>
        <div class="bottom" style="clear: both">
          <div class="cardBot">
            <img :src="item.foodVo.mainPictureUrl" alt="" style="width: 80px;height: 80px;float: left;margin-right: 10px"/>
            <div class="cardClass">
             <p>{{item.foodVo.name}}</p>
            </div>
            <div class="cardClass">
              这里展示规格
            </div>
            <div class="cardClass" style="width: 10%">
              这里展示单价
            </div>
            <div class="cardClass" style="width: 10%">
              这里展示数量
            </div>
            <div class="cardClass" style="width: 10%">
              这里展示总价
            </div>
            <div class="cardClass" style="width: 10%">
              这里展示状态
            </div>
            <div class="cardClass" style="width: 10%;text-align: center">
              <div style="color:#409eff;cursor:pointer">删除</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { orderList, delete1 } from "@/api/user";
export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.orderList()
  },
  methods: {
    orderList(){
      orderList().then((res) => {
      this.orders = res;
    });
    },
    delt(id) {
      this.$confirm("此操作将永久删除记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          delete1({id:id})
            .then((res) => {
              this.orderList()
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
  },
};
</script>

<style scoped lang="scss">
.myOrder {
  // background: rgb(237, 237, 237);
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
  .orderList {
    margin: 50px auto;
    width: 1200px;
    height: 200px;
    background: rgb(235, 235, 235);
    margin-bottom: 20px;
    box-shadow: 0 0 10px #ccc;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 30px;
      height: 40px;
      background: rgb(224, 224, 224);
    }
    .bottom {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 135px;
    }
    //  display: flex;
    //  justify-content: space-between;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
  .cardTop{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px #ddd solid;
    .ordersTime{
      width: 300px;
      float: left;
      margin-left: 20px;
    }
  }
.myOrder /deep/ .el-card__body{
  padding: 0 !important;
}
  .cardMain{
    width: 95%;
    margin: 0 auto;
    text-align: left;
  }
  .cardBot {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    height: 100px;
  }
.cardClass{
  width: 20%;
  font-size: 14px;
  float: left;
  /*border-right: 1px solid #ddd;*/
  height: 100%;
  text-align: center;
  /*line-height: 80px;*/
  margin-top: 2%;
}
</style>
