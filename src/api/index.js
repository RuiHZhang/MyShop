// 用于统一管理api接口

// 引入封装好的axios
import requests from './requests'
// 引入mockRequest 用于向mock发送假的网络请求，模拟真实请求
import mockRequest from './mockRequest'

// 三级联动接口 /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = ()=>{
    // 发请求：axios发送请求返回结果Promise对象
    return requests({url:'/api/product/getBaseCategoryList',method:'get'});
}

// home首页轮播图接口
export const reqBannerList = ()=>{
    return mockRequest({url:'/banner',method:'get'})
}

// floor接口是mock模拟接口
export const reqFloorList = ()=>{
    return mockRequest({url:'/floor',method:'get'})
}

// search接口 /api/list post 带参数
// search接口发送请求 
export const reqGetSearchInfo = (params)=>{ //注意这个函数在调用时至少传递一个参数，至少为空对象
    return requests({url:'api/list',method:'post',data:params})
}

// 获取产品详情信息接口
// detail接口 /api/item/{skuId} 请求方式：get
export const reqDetailInfo = (skuid)=>{
    return requests({
        url:`/api/item/${skuid}`,
        method:'get'
    })
}

// 将产品添加到购物车中接口 /api/cart/addToCart/{skuId}/{skuNum} POST请求 携带参数
export const reqAddOrUpdateShopCart = (skuid,skuNum)=>{
    return requests({
        url:`/api/cart/addToCart/${skuid}/${skuNum}`,
        method:'post'
    })
}

// 获取购物车列表数据的接口 /api/cart/cartList method:get 无参
export const reqCartList = ()=>{
    return requests({
        url:'/api/cart/cartList',
        method:'get'
    })
}

// 删除购物车产品接口 /api/cart/deleteCart/{skuid} delete 有参skuid
export const reqDeleteCart = (skuid)=>{
    return requests({
        url:`/api/cart/deleteCart/${skuid}`,
        method:'delete'
    })
}

// 修改商品选中状态借口 /api/cart/checkCart/{skuId}/{isChecked} get 有参
export const reqUpdateCheckedByid = (skuId,isChecked)=>{
    return requests({
        url:`/api/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 获取验证码 /api/user/passport/sendCode/{phone} get 有参
export const reqGetCode = (phone)=>{
    return requests({
        url:`/api/user/passport/sendCode/${phone}`,
        method:'get' 
    })
}

// 注册接口 /api/user/passport/register  post 带参
export const reqUserRegister = (data)=>{
    return requests({
        url:'/api/user/passport/register',
        data:data,
        method:'post'
    })
}

// 登录接口 /api/user/passport/login post phone,password  带参
export const reqUserLogin = (data)=>{
    return requests({
        url:'/api/user/passport/login',
        data:data,
        method:'post'
    })
}

// 获取用户信息接口 /api/user/passport/auth/getUserInfo get 无参
export const reqUserInfo = ()=>{ 
    return requests({
        url:'/api/user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录的接口 /api/user/passport/logout get 无参
export const reqUserLogout = ()=>{
    return requests({
        url:'/api/user/passport/logout',
        method:'get'
    })
}

// 获取用户地址纤细接口 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>{
    return requests({
        url:'/api/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

// 获取商品清单 /api/order/auth/trade get 无参
export const reqOrderInfo = ()=>{
    return requests({
        url:'/api/order/auth/trade',
        method:'get'
    })
}

// 提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo} post 带参
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({
        url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:data
    })
}

// 获取支付信息的接口 /api/payment/weixin/createNative/{orderId} get 带参
export const reqPayInfo = (orderId)=>{
    return requests({
        url:`/api/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}

// 获取支付订单状态借口 /api/payment/weixin/queryPayStatus/{orderId} get 带参
export const reqPayStatus = (orderId)=>{
    return requests({
        url:`/api/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 获取个人中心数据的接口 /api/order/auth/{page}/{limit}
export const reqMyOrder = (page,limit)=>{
    return requests({
        url:`/api/order/auth/${page}/${limit}`,
        method:'get'
    })
}
