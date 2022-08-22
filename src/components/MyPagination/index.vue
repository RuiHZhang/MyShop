<!-- 分页需要的数据
pageNo pageSize total continues -->
<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getpageNo',pageNo-1)">上一页</button>
    <button v-if="startPagelastPage.start > 1" @click="$emit('getpageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startPagelastPage.start >= 2">···</button>
 
    <template  v-for="(page,index) in startPagelastPage.end" >
      <button v-if="page>=startPagelastPage.start" :key="index" @click="$emit('getpageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
    </template>
    
    <button v-if="startPagelastPage.end < this.totalPage">···</button>
    <button v-if="startPagelastPage.end < this.totalPage" @click="$emit('getpageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==this.totalPage" @click="$emit('getpageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "MyPagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{

      // 计算属性，计算出一共有多少页数据
      totalPage(){ //Math.ceil方法为向上取整
        return Math.ceil(this.total/this.pageSize)
      },

      // 计算属性，计算起始和结束的页数分别是多少
      startPagelastPage(){
        
        // 先定义两个变量用于储存开始数字与结束的页数
        let start = 0;
        let end = 0;
        // 注意连续页码数为5，但是可能会出现不正常现象
        // 总页数没有连续页码多
        if(this.totalPage < this.continues){
          start = 1;
          end = this.totalPage
        }else{
          //totalPage>=this.continues 写成动态的
          start = this.pageNo - Math.floor(this.continues/2);
          end = this.pageNo + Math.floor(this.continues/2);

          if(start < 1){
          // 如果因为pageNo过小，造成start小于1了，就判断重新赋值即可
            start = 1;
            end = this.continues;
          }
          if(end > this.totalPage){
            start = this.totalPage - this.continues + 1;
            end = this.totalPage;
          }
        }
        return {start,end};
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background: rgb(255, 37, 27);
        color: #fff;
      }
    }
  }
</style>