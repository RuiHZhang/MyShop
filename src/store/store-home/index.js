import { reqCategoryList, reqBannerList ,reqFloorList} from "@/api"

// home模块的store
const actions = {
    // 获取三级列表中的后台数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        // console.log(result.data);//result.data才是老师视频中的结果
        if(result.code == 200){
            commit('CATEGORYLIST',result.data);
        }
    },

    // 获取mock中模拟储存的banner轮播图数据
    async getBannerList({commit}){
        let result = await reqBannerList();
        if(result.code == 200){
            commit('BANNERLIST',result.data);
        }
    },

    // 获取mock中模拟储存的floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        // console.log(result);
        if(result.code == 200){
            commit('FLOORLIST',result.data);
        }
    }
}

const mutations = {
    // 改变store 中state身上的categoryList数据
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,16);//slice用于截取数据和食品保持一致
    },
    // 修改store中state身上的bannerList数据
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    // 修改floorList数据
    FLOORLIST(state,floorList){
        state.floorList = floorList;
    }
}

const state = {
    // 需要给一个初识变量用于接收从服务器相应来的categoryList
    categoryList:[],
    // bannerList用于接收从mock模拟请求的bannerList数据,初识为空
    bannerList:[],
    // floorList用于接收从mock模拟请求的floorList数据,初识为空
    floorList:[]
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}