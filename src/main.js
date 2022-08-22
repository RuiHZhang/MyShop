import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'

import axios from 'axios'
Vue.prototype.$axios = axios

// 导入Vuex Store实例
import store from './store'

// 将TypeNav注册为全局组件，供所有组件使用
import TypeNav from '@/components/TypeNav'
// 将MyCarousel注册为全局组件
import MyCarousel from '@/components/MyCarousel'
// 将MyPagination注册为全局组件
import MyPagination from '@/components/MyPagination'

// 将API文件全部引入到main中，之后放到vue的prototype上
import * as API from '@/api'

// 引入需要的element-ui
import {MessageBox} from 'element-ui'

// Vue应用引入的element-ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// vue应用全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyCarousel.name,MyCarousel)
Vue.component(MyPagination.name,MyPagination)

// 引入mockServe.js mock数据
import './mock/mockServe'

// 引入swiper css样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    // 可以仿照配置全局事件总线的方法将api文件中的所有方法暴露并加到vue的prototype上
    Vue.prototype.$API = API;
  },

  // 注册路由信息
  router:router,
  
  // 注册仓库，组件实例身上会多一个$store属性
  store:store
}).$mount('#app')
