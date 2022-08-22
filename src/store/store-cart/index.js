import { reqCartList,reqDeleteCart,reqUpdateCheckedByid } from "@/api"

import {getUUID} from '@/utils/uuid_token'

const actions = {
    // 获取购物车数据列表
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code ==200){
            commit('CARTLIST',result.data)
        }
    } ,

    // 删除购物车商品
    async deleteCartList({commit},skuid){
        
        let result = await reqDeleteCart(skuid);
        
        if(result.code ==200){
            commit('COMMIT',result.data)
            return 'OK';
        }else{
            return Promise.reject(new Error("faile"))
        }
    },

    // 改变商品选中状态
    async changeChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked);

        if(result.code == 200){
            commit('COMMIT',result.data)
            return 'OK';
        }else{
            return Promise.reject(new Error("faile"))
        }
    },

    // 修改全部商品选中状态
    updateAllCartChecked({dispatch,state},isChecked){
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(element => {
            let promise = dispatch('changeChecked',{skuId:element.skuId,isChecked})
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
}

const mutations = {
    CARTLIST(state,cartList){
        state.cartList = cartList
    },

    // 处理commit的，防止不使用
    COMMMIT(state,commit){
        state.commit = commit
    }

}

const state = {
    // 游客临时身份
    uuid_token:getUUID(),
    // 购物车数据列表
    cartList:[],
    commit:{}
}

const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    
}

export default {
    actions,
    mutations,
    state,
    getters
}