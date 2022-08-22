// 引入mock
import Mock from 'mockjs'

// 引入json数据  JSON数据格式默认暴露
import banner from './banner.json'
import floor from './floor.json'

// Mock 参数一：请求地址  参数二：请求数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

// 写完后还需要在入口文件中调用引用一次

