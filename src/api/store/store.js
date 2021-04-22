import request from '@/api/request'

/** 校验用户的店铺信息 有店铺信息返回false 没有店铺信息返回true */
export function verifyMyStore(){
    return request({
        url:'/storeInfo/verify',
        method:'get'
    })
}