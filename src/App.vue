<template>
  <div>
    <MyHeader/>
    <router-view></router-view>
    <MyFooter v-show="this.$route.meta.show"/>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader/index.vue'
import MyFooter from './components/MyFooter/index.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
  },
  mounted(){
    // 只用执行一次请求，获取三级列表的后台数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
</style>
