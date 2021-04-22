<template>
  <div class="myOrder">
    <headers tab="/myOrder"></headers>
    <p class="gwc">
      <span style="font-weight: 800;">吃货网</span>
      <span>>>我的订单</span>
    </p>
    <div class="orderList" v-for="(i, index) in orders" :key="index">
      <div class="top">
        <span style="margin-right:30px">{{ i.createDate }}</span>
        <span> 商品名称：{{ i.foodVo.name }} </span>
      </div>
      <div class="bottom">
        <img :src="i.foodVo.mainPictureUrl" alt="" />
        <span
          style=" text-align: left;text-indent: 30px;   display: inline-block; width: 750px;"
          >{{ i.foodVo.describe }}
        </span>
        <p>
          价格:<span style="color:red"
            >￥{{ i.foodVo.price }} x {{ i.count }}</span
          >
        </p>
        <p>申请售后</p>
        <p style="cursor: pointer" @click="delt(i.id)">删除订单</p>
      </div>
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
</style>
