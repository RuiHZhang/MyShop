import Vuex from 'vuex'
import Vue from 'vue'

// 使用Vuex
Vue.use(Vuex)

// 引入小仓库
import home from './store-home'
import search from './store-search'
import detail from './store-detail'
import cart from './store-cart'
import user from './store-user'
import trade from './store-trade'

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cart,
        user,
        trade
    },
})

// export default store