import Vue from "vue";
import VueRouter from "vue-router";

// 引入routes.js
import routes from './routes';

import store from '@/store/index'

Vue.use(VueRouter);

// 重写push||replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
    routes:routes,
    // 滚动行为,保持滚动条在最上边
    // scrollBehavior(to,from,savedPosition){
    scrollBehavior(){
        return{x:0,y:0}
    },  
})

// 全局路由守卫
router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if(token){//登录状态
        // 判断本地是否存在token,判断用户的登录状态
        if(to.path=='/login'){
            // 用户已经登录状态就再去登录界面(login)就不放行
            next('/home')
        }else{
            // 用户处于登录状态去出了login外的其他路由需要判断是否存在要用的name，如果没有就要派发请求，解决出了home模块外刷新就不显示name的bug
            if(name){
                next()
            }else{
                // 不存在name就需要重新发请求
                try {
                    // 代表获取信息成功，放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // 代表请求失败，有可能是token失效等问题，要清除token，派发getUserLogout请求，并跳转到login提示用户重新登陆
                    await store.dispatch('getUserLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 用户处于非登录状态，随便点
        // 用户未登录就不能去交易场所
        let toPath = to.path;
        if(toPath=='/trade' || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 这里需要将未登录时想去没去成的信息存在地址栏中，在登录成功后直接跳转
            alert('请登录')
            next('/login?redirect='+toPath)
        }
        next()
    }
})


export default router

