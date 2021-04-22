<template>
  <div class="home">
    <headers tab="/index"></headers>
    <!-- 轮播图 -->
    <el-carousel
      :interval="2000"
      arrow="always"
      height="400px"
      style="width: 1000px; margin: 0 auto; margin-top: 50px"
    >
      <el-carousel-item v-for="(item, index) in lbtFoodList" :key="index">
        <img
          @click="toBuy('/shopCart', item.id)"
          :src="item.mainPictureUrl"
          alt=""
          style="width: 100%; height: 100%"
        />
      </el-carousel-item>
    </el-carousel>
    <el-input
      placeholder="请输入内容"
      v-model="seName"
      style="height:15px;width: 25%;position: absolute; top: 9px;left: 40%;"
      @keyup.enter.native="serchFood"
    >
      <template slot="append"
        ><span @click="serchFood" style="cursor: pointer;">搜索</span></template
      >
    </el-input>
    <div class="content">
      <!-- ----左侧分类 -->

      <ul class="leftMenu">
        <li class="gird-item" v-for="(i, index) in foodAllList" :key="index">

          <a :href="'#' + index" style="text-decoration: none;color: #666;">{{
            i
          }}</a>

        </li>
      </ul>

      <!-- ---end -->
      <el-card
        style="width: 1000px;margin: 50px auto;"
        v-for="(item, index) in foodList"
        :key="index"
        :id="item.type"
      >
        <el-row slot="header">
          <header>
            <h5
              style="
                margin-left: 25px;
                font-weight: bolder;
                font-size: 18px;
                line-height: 60px;
                color: #666;
                display: flex;
                height: 25px;
                align-items: center;
                justify-content: space-between;
              "
            >
              {{ foodAllList[item.type] }}
              <span
                style="font-size: 14px; cursor: pointer"
                @click="jumpLink('/footList', item.type)"
                >更多&nbsp;&nbsp;>></span
              >
            </h5>
          </header>
        </el-row>
        <!-- 列表 -->
        <el-row>
          <el-col
            :span="6"
            v-for="(i, index) in item.goods"
            :key="index"
            @click.native="toBuy('/shopCart', i.id)"
            style="cursor: pointer;"
          >
            <aside
              class="common-flex-box flex-four animation"
              style="
                transform: translate(0px, 0px);
                display: flex;
                justify-content: center;
              "
            >
              <section class="spu-item-normal-box flex-item;">
                <figure class="item-cover">
                  <img
                    data-lazywidth="216"
                    data-lazyheight="216"
                    style="width: 280px;height: 200px;"
                    :src="i.mainPictureUrl"
                    lazy="loaded"
                  />
                </figure>
                <article>
                  <h3 style=" margin-bottom: 10px;">{{ i.name }}</h3>
                  <h5 class="txt-product-title textHidden" :title="i.describe">
                    {{ i.describe }}
                  </h5>
                </article>
                <aside class="item-attr-colors"></aside>
                <article class="item-price">
                  <span style="color:red">￥{{ i.price }}元</span>
                </article>

                <div class="markup-tag"></div>
              </section>
            </aside>
          </el-col>
        </el-row>
      </el-card>
      <!--6猜你喜欢-->
      <el-card style="margin: 50px auto;width: 1000px;" v-if="foodList6.length">
        <el-row slot="header">
          <header>
            <h5
              style="
                margin-left: 25px;
                font-weight: bolder;
                font-size: 18px;
                line-height: 60px;
                color: #666;
                display: flex;
                height: 25px;
                align-items: center;
                justify-content: space-between;
              "
            >
              猜你喜欢
            </h5>
          </header>
        </el-row>
        <!-- 列表 -->
        <el-row>
          <el-col
            :span="6"
            v-for="(i, index) in foodList6"
            :key="index"
            @click.native="toBuy('/shopCart', i.id)"
          >
            <aside
              class="common-flex-box flex-four animation"
              style="
                transform: translate(0px, 0px);
                display: flex;
                justify-content: center;
              "
            >
              <section class="spu-item-normal-box flex-item;">
                <figure class="item-cover">
                  <img
                    data-lazywidth="216"
                    data-lazyheight="216"
                    style="    width: 280px;height: 200px;"
                    :src="i.mainPictureUrl"
                    lazy="loaded"
                  />
                </figure>
                <article>
                  <h3 style=" margin-bottom: 10px;">{{ i.name }}</h3>
                  <h5 class="txt-product-title textHidden" :title="i.describe">
                    {{ i.describe }}
                  </h5>
                </article>
                <aside class="item-attr-colors"></aside>
                <article class="item-price">
                  <span style="color:red">￥{{ i.price }}元</span>
                </article>

                <div class="markup-tag"></div>
              </section>
            </aside>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { list, likeList, getFoodType } from "@/api/user";
export default {
  name: "Home",
  data() {
    return {
      input: "",
      seName: "",
      foodAllList: {},
      foodList: [],
      foodList6: [],
      lbtFoodList: [],
      imgList: [
      ],
    };
  },

  created() {
    this.getFoodType();
    this.likeList();
  },
  methods: {
    // 搜索列表
    serchFood() {
      this.$router.push({
        path: "/footListSerch",
        query: {
          name: this.seName,
        },
      });
    },
    // 所有分类
    getFoodType() {
      getFoodType().then((data) => {
        data.forEach((val) => {
          this.foodAllList[val.dicCode] = val.dicName;
        });
        data.forEach((val) => {
          this.list(val.dicCode);
        });
      });
    },
    // 猜你喜欢
    likeList() {
      likeList().then((res) => {
        this.foodList6 = res;
        this.lbtFoodList = res.slice(0, 4);
      });
    },
    // 去更多
    jumpLink(url, typeCode) {
      this.$router.push({
        path: url,
        query: {
          typeCode,
        },
      });
    },
    // 去购买
    toBuy(url, id) {
      console.log("urlid", url, id);
      this.$router.push({
        path: url,
        query: {
          id,
        },
      });
    },
    // 列表
    list(type) {
      list({ foodTypeCode: type, name: this.seName }).then((data) => {
        this.foodList.push({
          type: type,
          goods: data.list.splice(0, 8),
        });
      });
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-input__inner {
  height: 30px;
}
.home {
  // background: rgb(237, 237, 237);
  // background: url('../assets/bj4.jpg') no-repeat;


}

.content {
  position: relative;
  margin: 50px auto;
  width: 100%;
  .leftMenu {
    width: 100px;
    position: fixed;
    top: 18%;
    left: 5.7%;

    .gird-item {
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      list-style: none;
      background-color: #e2e3e5;
      cursor: pointer;
      margin-bottom: 5px;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:hover {
        background-color: #b61d1d;
        a {
          // background: #ecf5ff;
          color: #fff !important;
        }
      }
    }
  }
  .activity-tag {
  }
  .textHidden {
    width: 230px;
    height: 37px;
    margin: 0 auto;
    text-indent: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 10px;
  }
}
</style>
