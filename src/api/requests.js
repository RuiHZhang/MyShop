import axios from "axios";
// 引入进度条第三方组件nprogress,它有start done方法,别忘记引入进度条样式
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

// 引入仓库用于请求头传递游客uuid
import  store  from '@/store';

// 创建axios实例requests
let requests = axios.create({
    // 基础路径
    // baseURL:'/api',
    // 请求超时时间
    timeout:5000,
})

// 请求拦截器，发请求前能够检测到,做一些事情
requests.interceptors.request.use((config) =>{
    
    if(store.state.cart.uuid_token){
        //  给请求头添加字段用于传递游客uuid
        config.headers.userTempId = store.state.cart.uuid_token;
    }

    // 判断是否存在token，存在就放在请求头中带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    
    // 进度条开始
    nprogress.start();

    // config配置对象里有一个很重要的headers请求头
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    // 成功的回调
    return res.data;
},(error)=>{
    // 响应失败的回调
    console.log(error);//有问题
    return Promise.reject(new Error('faile'))
})



export default requests;