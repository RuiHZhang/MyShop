<template>
  <div class="type-nav">
    <div class="container"  @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <!--事件委托-->
            <!-- 第一级 -->
            <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
              <h3>
                <!-- 给a标签定义两个自定义属性用于区分是否点击了a标签，以及传递参数 -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> //用这种声明式路由导航会造成router-link过多，建议用事件委托-->
              </h3>
              <div class="item-list clearfix">
                <!-- 第二级 -->
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                    </dt>
                    <!-- 第三级 -->
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
    </div>
  </div>
</template>

<script>
//
import { mapState } from "vuex";

export default {
  name: "TypeNav",

  data() {
    return {
      show:true
    }
  },

  mounted() {
  // 组件挂载完后向服务器发送请求,但是当页面跳转重新加载出TypeNav时会再次请求，造成没必要的浪费，所以将其移到APP组件的mounted中只执行一次
    // this.$store.dispatch("categoryList");

    // 当跳转到非home组件时将show修改为false，从而隐藏TypeNav下面的部分
    if(this.$route.path != '/home'){
      this.show = false;
    }
  },

  computed: {
    // ...mapState('home',{categoryList:'categoryList'})
    // 使用mapState获取store中从服务器请求的categoryList
    ...mapState({
      //对象写法，拿到的实际是总store中的categoryList 这种方法不用开启命名空间
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  methods: {
    // 点击跳转到search的方法
    goSearch(event) {
      // this.$router.push('/search')
      // console.log(event.target);
      // 节点上有dataset属性，可以用来获取节点身上的自定义属性与值
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" }; //这是请求的地址
        let query = { categoryName: categoryname }; //请求要传递的query初始化
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        
        // 参数合并，让搜索更完善
        if(this.$route.params){
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location)
        }
      }
    },

    //鼠标进入“全部商品分类”让下面的列表显示
    enterShow(){
      this.show = true;
    },

    //鼠标离开“全部商品分类”让下面的列表再次隐藏 
    leaveShow(){
      // 要判断，非home组件才可以隐藏
      if(this.$route.path != '/home'){
        this.show = false;
      }
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          h3 {
            background-color: rgb(225, 37, 27);
            color: #eee;
          }
        }
      }
    }

    // 过渡动画样式
    .sort-enter{
      height: 0px;
    }

    .sort-enter-to{
      height: 461px;
    }

    .sort-enter-active{
      transition: all 0.5s linear;
    }
  }
}
</style>