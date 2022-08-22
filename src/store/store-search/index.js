// search模块的store

// 导入api中的reqGetSearchInfo方法
import { reqGetSearchInfo } from "@/api"

const actions = {
    // 获取search的后台数据 需要派发才能发送请求获取数据
    async getSearchInfo({commit},params){
        // params 是用户派发时传递的并且至少要为空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit('SEARCHINFO',result.data)
        }
    }
}

const mutations = {
    SEARCHINFO(state,searchList){
        state.searchList = searchList;
    }
}

const state = {
    searchList:{}
}

// 简化数据的操作
const getters = {
    attrsList(state){
        return state.searchList.attrsList || {};
    },
    goodsList(state){
        return state.searchList.goodsList || {};
    },
    trademarkList(state){
        return state.searchList.trademarkList || {};
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}