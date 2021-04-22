import request from "@/api/request";

// 登录
export function login(data) {
  return request({
    url: "/loginModule/login",
    method: "post",
    data,
  });
}
// 注册
export function register(data) {
  return request({
    url: "/loginModule/register",
    method: "post",
    data,
  });
}
// 获取token
export function sendVc(data) {
  return request({
    url: "/loginModule/sendVc",
    method: "post",
    data,
  });
}
// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: "/loginModule/getUserInfo",
    method: "get",
    data,
  });
}
// 首页
export function list(data) {
  return request({
    url: "/food/list",
    method: "post",
    data,
  });
}
// 获取食品种类
export function getFoodType(data) {
  return request({
    url: "/dictionary/getFoodType",
    method: "get",
    data,
  });
}
// 获取口味种类
export function getTasteType(data) {
  return request({
    url: "/dictionary/getTasteType",
    method: "get",
    data,
  });
}
// 保存食品种类
export function saveFoodType(data) {
  return request({
    url: "/dictionary/saveFoodType",
    method: "post",
    data,
  });
}
// 保存口味种类
export function saveTasteType(data) {
  return request({
    url: "/dictionary/saveTasteType",
    method: "post",
    data,
  });
}
// 购买
export function purchase(data) {
  return request({
    url: "/transactionRecords/purchase",
    method: "post",
    data,
  });
}
// 食品删除
export function deleteS(data) {
  return request({
    url: "/food/delete",
    method: "post",
    data,
  });
}

// 订单详情
export function info(data) {
  return request({
    url: "/food/info",
    method: "get",
    data,
  });
}


//删除订单
 export function delete1(data) {
   return request({
     url: "/transactionRecords/delete",
     method: "post",
     data,
   });
 }


// 我的订单列表
export function orderList(data) {
  return request({
    url: "/transactionRecords/list",
    method: "post",
    data,
  });
}
// 商家列表
export function perList(data) {
  return request({
    url: "/food/myList",
    method: "get",
    data,
  });
}
// 上下架
export function putOnOrOff(data) {
  return request({
    url: "/food/putOnOrOff",
    method: "post",
    data,
  });
}
// 商家上传
export function uploadFile(data) {
  return request({
    url: "/file/uploadFile",
    method: "post",
    data,
  });
}
// 新增保存

export function save(data) {
  return request({
    url: "/food/save",
    method: "post",
    data,
  });
}
// 猜你喜欢列表

export function likeList(data) {
  return request({
    url: "/food/likeList",
    method: "get",
    data,
  });
}
// 个人中心信息
export function useInfo(data) {
  return request({
    url: "/user/info",
    method: "get",
    data,
  });
}

// 修改个人信息
export function updateUser(data) {
  return request({
    url: "/user/updateUser",
    method: "post",
    data,
  });
}
// 修改密码

export function updatePassword(data) {
  return request({
    url: "/user/updatePassword",
    method: "post",
    data,
  });
}

//新增收货地址
export function addAddress(data){
  return request({
    url:'/address/add',
    method:'post',
    data
  })
}

//获取我的收货地址
export function fetchAddressList(){
  return request({
    url:'/address/list',
    method:'get',
  })
}
//修改我的收货地址
export function updateAddress(data){
  return request({
    url:'/address/update',
    method:'put',
    data
  })
}

