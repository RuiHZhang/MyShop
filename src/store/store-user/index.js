// ussr路由模块

import {reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqUserLogout,} from '@/api/index'
import {getToken,setToken,removeToken} from '@/utils/token'

const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data);
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 注册
    async getUserRegister({commit},data){
        let result = await reqUserRegister(data);
        if(result.code == 200){
            // 成功
            commit('COMMIT',result.data)
            return "ok"
        }else{
            // 失败
            return Promise.reject(new Error('faile'))
        }
        
    },

    // 登录
    async getUserLogin({commit},data){
        let result = await reqUserLogin(data)
        // 此时服务器会下发token作为用户唯一标识
        if(result.code == 200){
            commit('USERLOGIN',result.data.token)
            // 持久化储存token
            setToken(result.data.token)

            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 获取用户信息用于登录
    async getUserInfo({commit}){ 
        let result = await reqUserInfo()
        if(result.code == 200){
            // 提交用户信息
            commit('USERINFO',result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户退出登录
    async getUserLogout({commit}){
        let result = await reqUserLogout();
        if(result.code == 200){
            // 请求成功后清楚token等数据
            commit('CLEAR')
            return 'OK'
        }else{
            return new Promise.reject(new Error('faile'))
        }
    },



}

const mutations = {
    // 修改仓库验证码
    GETCODE(state,code){
        state.code = code;
    },
    // 处理commit
    COMMIT(state,commit){
        state.commit = commit;
    },
    // 用户登录
    USERLOGIN(state,token){
        state.token = token;
    },
    // 用户登录信息
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    // 清楚token等用户登录信息
    CLEAR(state){
        state.token = '' ;
        state.userInfo = {};
        // 清楚local本地数据
        removeToken();
    }
}

const state = {
    code:'',
    commit:'',
    token:getToken(),
    userInfo:{}

}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}