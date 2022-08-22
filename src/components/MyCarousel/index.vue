<!-- 将轮播图拆分为一个全局组件 需要在入口文件中注册一次-->
<template>
    <div class="swiper-container" id="floor1Swiper" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
            <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper';
// 引入nextTick
import { nextTick } from 'vue';


export default {
    name:'MyCarousel',
    props:['list'],
    watch:{
        list:{
            immediate:true,
            handler(){
                nextTick(()=>{
                    new Swiper(this.$refs.cur,{
                        loop:true,
                        // 如果需要分页器
                        pagination:{
                            el:".swiper-pagination",
                            clickable:true
                        },
                        // 如果需要前进后退按钮
                        navigation:{
                            nextEl:".swiper-button-next",
                            prevEl:".swiper-button-prev",
                        },
                    });
                })
            }
        }
    }
}
</script>

<style>

</style>