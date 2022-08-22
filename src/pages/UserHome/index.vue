<template>
  <div>
    <!-- TypeNav应被注册为全局组件，不用再引用 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommed/>
    <HomeRank/>
    <HomeLike/>
    <HomeFloor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
    <HomeBrand/>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import TodayRecommed from './TodayRecommend/index.vue'
import HomeRank from './HomeRank/index.vue'
import HomeFloor from './HomeFloor/index.vue'
import HomeLike from './HomeLike/index.vue'
import HomeBrand from './HomeBrand/index.vue'
import { mapState } from "vuex";
export default {
    name: "UserHome",
    components: { ListContainer, TodayRecommed, HomeRank, HomeFloor, HomeLike, HomeBrand },
    // 要在home组件中派发，否则就不能够v-for循环遍历两个floor组件
    mounted(){
      // 派发请求获取商品floor列表
      this.$store.dispatch("getFloorList")

      // 派发请求获取用户信息（token） 这里整体移到router中了
      // if(localStorage.getItem('TOKEN')){
        // 先判断，本地有了TOKEN后再发送请求，否则会因为没有token而没有userInfo，从而不能使用computed中的userName
        // this.$store.dispatch('getUserInfo')
      // }
    },
    computed:{
    // 使用mapState获取store中从服务器请求的floorList  这种写法需要开启命名空间
    // ...mapState('home',{bannerList:'bannerList'})
    ...mapState({ //这种方法不用开启命名空间
      floorList:(state)=>{
        return state.home.floorList
      }
    })
    }
}
</script>

<style>

</style>