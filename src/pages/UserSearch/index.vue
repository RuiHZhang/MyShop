<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">

        <!--bread 面包屑 就是带有叉号的选项按钮-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName" >{{searchParams.categoryName}}<i @click="removeCategory">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword" >{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark" >{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 售卖属性的面包屑 -->
            <li class="with-x" v-for="(attr,index) in searchParams.props" :key="index" >{{attr.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector selector子组件-->
        <!-- 需要给这个子组件绑定自定义事件实现子传父组件间通信，将品牌的数据获取再发送请求 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active : ifshow(1)}" @click="changeOrder(1)">
                  <a>综合<span v-show="ifshow(1)&&ifshow('asc')">升序</span><span v-show="ifshow(1)&&ifshow('desc')">降序</span></a>
                </li>
                <li :class="{ active : ifshow(2)}" @click="changeOrder(2)">
                  <a>价格<span v-show="ifshow(2)&&ifshow('asc')">升序</span><span v-show="ifshow(2)&&ifshow('desc')">降序</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <MyPagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getpageNo="getpageNo" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'

  import { mapGetters,mapState } from 'vuex';
import MyPagination from '@/components/MyPagination/index.vue';

  export default {
    name: 'UserSearch',
    data() {
      return {
        searchParams:{
          // 一级分类ID
          category1Id:"",
          // 二级分类ID
          category2Id:"",
          // 三级分类ID
          category3Id:"",
          // 分类名字
          categoryName:"",
          // 关键词
          keyword:"",
          // 排序
          order:"1:desc",
          // 分页的，第几页
          pageNo:1,
          // 每页展示数据个数
          pageSize:5,
          // 平台售卖属性带的参数
          props:[],
          // 品牌
          trademark:""
        }
      }
    },
    beforeMount(){
      // 在挂载之前合并参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      // 挂载时发送请求
      this.getData();
    },
    methods:{
      // 将发请求封装成一个方法
      getData(){
        this.$store.dispatch('getSearchInfo',this.searchParams);
      },
      // 移除分类面包屑方法
      removeCategory(){
        this.searchParams.categoryName = undefined;//将categoryName项置空,而且各项ID也都要置空 而且还要发送一次请求
        this.searchParams.category1Id = undefined; //将‘’谢伟undefined和‘’有一样的置空效果，而且不会给服务器发送这四项数据
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        // this.getData();//这里不用再派发的原因是watch里路由变化时已经调用了一次
        // 同时地址栏也需要改变，保留params参数
        // if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        // }
      },
      // 移除关键字面包屑方法
      removeKeyword(){
        this.searchParams.keyword = undefined;
        // this.getData();//治理也不用再派发，watch在监听
        // 通知兄弟组件header清楚输入框中的关键字keyword
        this.$bus.$emit('clear')
        // 还要清除路由地址中的params中的keyword,保留query参数
        this.$router.push({name:'search',query:this.$route.query})
      },
      // 移除品牌面包屑方法
      removeTrademark(){
        this.searchParams.trademark = undefined;
        this.getData();//这里需要派发，因为watch监听的是路由地址的变化，而trademark的变化不会引起路由地址变化需要手动调用
      },
      // 移除attr面包屑方法
      removeAttr(index){
        this.searchParams.props.splice(index,1);
        this.getData();
      },


      // 自定义事件的方法trademarkInfo
      trademarkInfo(trademark){
        //通过自定义事件获取子中的trademark
        // 整理品牌字段参数
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        this.getData();
      },
      // 通过自定义方法获取子组件中的attr
      attrInfo(attr,attrValue){
        // console.log(attr,attrValue);//测试
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
        if(this.searchParams.props.indexOf(props) == -1){//数组去重节约资源
          this.searchParams.props.push(props);
        }
        this.getData();
      },

      // 判断综合、价格封装的函数
      ifshow(index){
        return this.searchParams.order.indexOf(index)!= -1//判断order里的索引从而让这个选项有对应样式
      },

      // changeOrder改变排序方式并再发送请求
      changeOrder(flag){
        // let originOrder = this.searchParams.order;//默认的order数据

        let originFlag = this.searchParams.order.split(":")[0];//序号
        let originSort = this.searchParams.order.split(":")[1]//排序方式

        let newOrder = '';
        if(flag == originFlag){
          newOrder = `${originFlag}:${originSort=="desc"?"asc":"desc"}`
          // console.log(newOrder);
        }else{
          newOrder = `${flag}:${"desc"}`
        }

        this.searchParams.order = newOrder;

        this.getData
      },

      // 获取分页数据自定义事件的回调
      getpageNo(pageNo){
        // 先整理数据，再发请求
        this.searchParams.pageNo = pageNo;
        this.getData();
      }
    },
    components: {
    SearchSelector,
    MyPagination
    },
    watch:{
      // 监听路由的信息是否发生变化，若发生变化就再次发送请求
      $route(){
        // 再次发送请求前先合并参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 再次发送请求
        this.getData();
        // 发送请求后将一些数据清空
        this.category1Id = '';
        this.category2Id = '';
        this.category3Id = '';
      }
    },
    computed:{
      ...mapGetters({
        attrsList:'attrsList',
        goodsList:'goodsList',
        trademarkList:'trademarkList'
      }),
      ...mapState({
        total:state=>state.search.searchList.total
      })
      
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>