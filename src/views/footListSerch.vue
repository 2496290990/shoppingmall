<template>
  <div class="footList">
    <headers tab="/footList"></headers>
    <div class="choose">
      <ul>
        <li v-for="(i,index) in flavorList" :key="index" @click="flavor(i.tasteTypeCode)" :style="{color:i.tasteTypeCode === tabIndex ? 'red' :''}">{{i.tasteTypeName}}</li>
      </ul>
      <!-- <el-input placeholder="请输入内容" v-model="input" style="height:25px">
        <template slot="append">搜索</template>
      </el-input> -->
    </div>
    <div class="content">
      <el-card style="margin-bottom:50px;">
        <!-- 列表 -->
        <el-row>
          <el-col :span="6" v-for="(i, index) in foodList" :key="index" style="height: 350px;cursor: pointer;" @click.native="toBuy('/shopCart',i.id)"  >
            <aside
              class="common-flex-box flex-four animation"
              style="transform: translate(0px, 0px);display: flex;justify-content: center;"
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
                <div class="activity-tag">
                  <span data-v-4f8be944="" class="red">
                   {{i.tasteTypeName}}
                  </span>
                </div>
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
import { list,getTasteType } from "@/api/user";
export default {
  created() {
     this.getTasteType()

    this.flavorList.unshift({tasteTypeName: "全部", tasteTypeCode: ''})
    if (this.$route.query.name) {
      // this.$route.query.typeCode &&
      // this.typeCode = this.$route.query.typeCode,
       this.typeName = this.$route.query.name
       this.list( this.typeName)
    }
     
  },
  data() {
    return {
      tabIndex:'',
      typeCode :'',
      typeName:'',
      // 口味
      flavorList: [

      ],
      foodList: [],
      input: "",
    };
  },
  methods: {
    // 口味
    getTasteType(){
      getTasteType().then(data=>{
        console.log("kw",data)
        data.forEach(val => {
          let obj = {
            tasteTypeName:val.dicName,
           tasteTypeCode:val.dicCode
          }
        this.flavorList.push(obj)
        });

      })
    },
     // 去购买
    toBuy(url,id){
       this.$router.push({
        path: url,
        query:{
          id
        }
      });
    },
    // 口味列表
    flavor(code){
      this.tabIndex =code
       list({ tasteTypeCode:code , name: this.$route.query.name}).then((data) => {
        this.foodList = data.list;
      });
    },
    list(name) {
      //
      list({ name:name }).then((data) => {
        this.foodList = data.list;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.footList {
  background: rgb(237, 237, 237);
  .choose {
    background: white;
    width: 100%;
    height: 80px;
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;

    ul {
      display: flex;
      width: 600px;
      margin: 0 auto;
      justify-content: flex-start;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    ::v-deep .el-input-group {
      width: 360px;
      margin-right: 180px;
    }
    .el-input-group__prepend {
      height: 25px;
      border: 0;
    }
  }
  .content {
    width: 100%;
    margin: 50px auto;
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
  }
}
</style>
