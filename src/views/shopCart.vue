<template>
  <div class="shopCart">
    <headers tab="/shopCart"></headers>
    <div class="content">
      <div class="leftC">
        <img :src="url" alt="" style="width:350px;height:200px" />
      </div>
      <div class="rightC">
        <div class="arightC">
          <h1 style="display: inline-block; margin-right: 20px;">
            {{ this.detailDist.name }}
          </h1>
          <span>（{{ this.detailDist.tasteTypeName }}）</span>
          <p class="deC">{{ this.detailDist.describe }}</p>
          <p class="deC price">价格￥{{ this.detailDist.price }}元</p>
          <div class="deC">
            <span style="margin-right:20px;color:#999;font-size:16px;"
              >数量</span
            >

            <el-input-number
              v-model="num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number
            ><span
              style="margin-left:30px;color: #666;
          font-size: 14px;"
              >件 &nbsp;&nbsp; 库存<span style="color:red">
                {{ this.detailDist.amount }}
              </span>
              件</span
            >
          </div>
          <div class="deC">
            <el-button size="small" @click="purchase">立即购买</el-button>
          </div>
          <div class="cn">
            <span style="color:#999;font-size:16px"> 服务承诺</span>
            <ul>
              <li>破损包退</li>
              <li>正品保证</li>
              <li>极速退款</li>
              <li>退货运费险</li>
              <li>七天无理由退换</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { info,purchase  } from "@/api/user";
export default {
  data() {
    return {
      num: 1,
      detailDist: {},
      url: "",
      count:'',
      id:''
    };
  },
  created() {
    if (this.$route.query.id) {
      this.info(this.$route.query.id);
    }
  },
  methods: {
    // 购买
    purchase() {
      purchase({foodId:this.id,count:this.num}).then((res) => {
          this.$message({
              message: '购买成功！！',
            type: "success",
          })
          this.$router.push('/myOrder')
       
      });
    },
    // 购买详情
    info(id) {
      info({ id: id }).then((res) => {
        this.detailDist = res;
        this.url = res.mainPictureUrl;
        this.id = res.id
      });
    },
    handleChange(value) {

    },
  },
};
</script>

<style scoped lang="scss">
.content {
  background:white;
  width: 1200px;
  height: 600px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;

  .leftC {
    width: 500px;
        // background: #f6f6f6;
    margin-right: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rightC {
    width: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    .arightC {
    }
    .price {
      color: red !important;
      background-color: #e9e9e9;
      background-repeat: no-repeat;
      position: relative;
      left: 0;
      z-index: 10;
      font: 12px/1.5 "Microsoft Yahei", tahoma, arial;
      padding-bottom: 5px;
      padding-top: 5px;
      margin-right: 20px;
    }
    .deC {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #666;
    }
    .cn {
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        display: flex;
        li {
          color: #666;
          font-size: 14px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
