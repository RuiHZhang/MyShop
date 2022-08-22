// trade仓库
import {reqAddressInfo,reqOrderInfo} from '@/api/index'
const actions = {
    // 获取用户地址信息
    async getAddressInfo({commit}){
        let result = await reqAddressInfo();
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 获取商品信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code == 200){
            commit('GETORDER',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,addressList){
        state.addressList = addressList
    },

    // 
    GETORDER(state,orderList){
        state.orderList = orderList
    }
}
const state = {

    addressList:[],

    orderList:{}
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}