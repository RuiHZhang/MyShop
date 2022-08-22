// store-detail的仓库

import { reqAddOrUpdateShopCart, reqDetailInfo } from "@/api"


const actions = {
    // 获取产品信息
    async getDetailInfo({commit},skuid){
        let result = await reqDetailInfo(skuid);
        if(result.code == 200){
            commit('DETAILINFO',result.data)
        }
    },

    // 将产品添加到购物车中
    async addToCart({commit},{skuid,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuid,skuNum);
        // 注意这里的接口并不会返回什么数据，所以不用mutation修改数据，不用三连环
        // 判断服务器返回的数据
        commit('COMMIT')
        if(result.code == 200){
            // 成功
            return "ok"
        }else{
            // 失败
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    // 获取产品信息，修改detailInfo
    DETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo;
    },

    // 处理commit问题的
    COMMIT(state){
        state.commit = ''
    }

}

const state = {
    detailInfo:{},
    commit:'',
}

const getters = {
    categoryView(){
        // 加上||{}是为了防治最开始返回的为空对象没有categoryView.category1Name这个属性报错
        return state.detailInfo.categoryView || {}
    },

    skuInfo(){
        return state.detailInfo.skuInfo || {}
    },

    spuSaleAttrList(){
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}