<template>
  <div class="shopCatList">
    <headers tab="/shopCatList"></headers>
    <p class="gwc">
      <span style="font-weight: 800;">吃货网</span>
      <span>>>我的购物车</span>
    </p>
    <div class="catList" v-for="i in 5" :key="i">
      <div class="top">
        <span>时间：20121212</span>
        <span>
          公司：武汉长江大桥111111111111111
        </span>
      </div>
      <div class="bottom">
        <img src="../assets/logo.png" alt="" />
        <span
          >【38活动价】回力运动鞋女2021春季新款品牌正品ins百搭潮流官方旗舰店老爹鞋
          [交易快照]</span
        >
        <p>￥20000</p>
        <p style="cursor: pointer;">删除</p>
        <p>相似宝贝</p>
      </div>
    </div>

    <!-- - -->
    <div id="J_FloatBar" class="float-bar" style="">
      <div class="float-bar-wrapper">
        <div class="float-bar-right">
          <div id="J_CheckCOD" class="check-cod" style="display: none;">
            <span class="icon-cod"></span
            ><span class="s-checkbox J_CheckCOD"></span>货到付款
          </div>
          <div class="pipe"></div>
          <div class="price-sum">
            <span class="txt">合计（不含运费）：</span
            ><strong class="price"
              ><em id="J_Total" style="color: red;"
                ><span class="total-symbol">&nbsp;￥</span>918.00</em
              ></strong
            >
          </div>
          <div class="btn-area">
            <a
              href="javascript:void(0)"
              id="J_Go"
              class="submit-btn"
              aria-label="请注意如果没有选择宝贝，将无法结算"
              ><span>结&nbsp;算</span><b></b
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.shopCatList {
  background: rgb(237, 237, 237);
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
  .catList {
    margin: 0px auto;
    width: 1200px;
    height: 200px;
    background: rgb(235, 235, 235);
    margin-bottom: 50px;
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
      width: 50px;
      height: 50px;
    }
  }
  .float-bar-wrapper {
    .float-bar {
      height: 70px;
      width: 100%;
      background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 0px;
      background: #e5e5e5;
    }
  }
}
</style>
