<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfo) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @change="changeChecked(cartInfo,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cartInfo)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cartInfo)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum*cartInfo.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteData(cartInfo)" style="cursor:pointer">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox"  :checked="isAllChecked&&cartInfoList.length>0" @change.stop="updataAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney" >{{totalPrice}}.00</i>
        </div>
        <div class="sumbtn">
          <router-link classac="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'ShopCart',
    
    mounted(){
      this.getData();
    },
    
    methods:{

      // 派发请求的方法
      getData(){
        this.$store.dispatch('getCartList')
      },

      // 删除购物车数据方法
      async deleteData(cartInfo){
        try{
          // 代表删除成功了，要再次发请求获取购物车数据
          await this.$store.dispatch('deleteCartList',cartInfo.skuId)
          this.getData()
        }catch(error){
          // 失败的情况
          alert(error.message)
        }
      },

      // 改变商品数量的方法
      async handler(type,disNum,cartInfo){
        switch(type){
          case 'minus': 
          // 减数量的情况
            disNum = cartInfo.skuNum>1? -1:0
            break;
          case 'change':
            // 手动输入的情况
            if(isNaN(disNum)||disNum<1){
              disNum = 0;
            }else{
              disNum = parseInt(disNum) - cartInfo.skuNum
            }
            break;
        }

        try{
          // 代表修改成功，获取一次新数据
          await this.$store.dispatch('addToCart',{skuid:cartInfo.skuId,skuNum:disNum})
          // 再获取一次数据展示
          this.getData()
        }catch(error){
          // 失败、返回
          alert(error.message)
        }
      },

      // 改变选中状态的方法
      async changeChecked(cartInfo,event){
        try{
            let isChecked = event.target.checked?"1":"0"
            await this.$store.dispatch('changeChecked',{skuId:cartInfo.skuId,isChecked:isChecked})
            // 成功了再获取一次数据
            this.getData()
        }catch(error){
          // 
          alert(error.message)
        }
      },

      // 删除全部选中的方法
      deleteAllCheckedCart(){
        this.cartInfoList.forEach(element => {
          if(element.isChecked == "1"){
            this.deleteData(element)
          }
        })
      },

      // 修改全部商品选中状态
      async updataAllCartChecked(event){
        try {
          let ischecked = event.target.checked?"1":"0";
          // 代表请求成功，需要重新获取数据
          await this.$store.dispatch("updateAllCartChecked",ischecked)
          this.getData();
        } catch (error) {
          // 代表请求失败
          alert(error.message)
        }
        
        
      }
    },

    computed:{
      ...mapGetters(['cartList']),
      // 购物车中的数据列表
      cartInfoList(){
        return this.cartList.cartInfoList ||[]
      },
      
      // 商品总价
      totalPrice(){

        let sum = 0;
        this.cartInfoList.forEach(element => {
          if(element.isChecked=="1"){
            sum += element.skuNum*element.skuPrice
          }
        });
        return sum ;
      },
      
      // 判断是否全部勾选了 用到了every方法
      isAllChecked(){
        return this.cartInfoList.every((element) => {return element.isChecked=="1"})
      }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>