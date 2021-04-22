import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/index",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  // 列表list
  {
    path: "/footList",
    name: "footList",
    component: () => import("@/views/footList.vue"),
  },
  // 我的店铺
  {
    path: "/perStores",
    name: "perStores",
    component: () => import("@/views/perStores.vue"),
  },
  // 我的订单
  {
    path: "/myOrder",
    name: "myOrder",
    component: () => import("@/views/myOrder.vue"),
  },
  // 我的购物车
  {
    path: "/shopCart",
    name: "shopCart",
    component: () => import("@/views/shopCart.vue"),
  },
  // 购物车列表
  {
    path: "/shopCatList",
    name: "shopCatList",
    component: () => import("@/views/shopCatList.vue"),
  },
  // login
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },

  // 注册
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register.vue"),
  },
  // 朋友圈
  {
    path: "/wechatMoments",
    name: "wechatMoments",
    component: () => import("@/views/wechatMoments.vue"),
  },
  // 个人中心
  {
    path: "/myCenter",
    name: "myCenter",
    component: () => import("@/views/user/profile/index.vue"),
  },
  // 管理分类
  {
    path: "/adminType",
    name: "adminType",
    component: () => import("@/views/adminType.vue"),
  }, 
  // 食品搜索
  {
    path: "/footListSerch",
    name: "footListSerch",
    component: () => import("@/views/footListSerch.vue"),
  },
];

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
