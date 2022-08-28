// // 引入组件
// import UserHome from '@/pages/UserHome'
// import UserSearch from '@/pages/UserSearch'
// import UserLogin from '@/pages/UserLogin'
// import UserRegister from '@/pages/UserRegister'
// import UserDetail from '@/pages/UserDetail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import UserTrade from '@/pages/UserTrade/index.vue'
// import UserPay from '@/pages/UserPay'
// import PaySuccess from '@/pages/PaySuccess'
// import UserCenter from '@/pages/UserCenter'
// import MyOrder from '@/pages/UserCenter/myOrder'
// import GroupOrder from '@/pages/UserCenter/groupOrder'

// 使用路由懒加载

export default [
    {
        path:'/center',
        component:()=>import('@/pages/UserCenter'),
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/UserCenter/myOrder')
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/UserCenter/groupOrder')
            },
            {
                // 重定向
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}
    },
    // 支付路由
    {
        path:'/pay',
        component:()=>import('@/pages/UserPay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'||from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/trade',
        component:()=>import('@/pages/UserTrade/index.vue'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/cart'||from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/home',
        component:()=>import('@/pages/UserHome'),
        meta:{show:true}
    },
    {
        name:'search',
        // path中写占位符是和字符串形式配合的，用对象形式传params时可不写
        // path:'/search/:keyword',
        // path中写占位符是和字符串形式配合的，用对象形式传params时可不写
        path:'/search/:keyword?',
        component:()=>import('@/pages/UserSearch'),
        meta:{show:true},
        props:true,
    },
    {
        path:'/login',
        component:()=>import('@/pages/UserLogin'),
        meta:{show:false}
    },
    {
        path:'/register',
        component:()=>import('@/pages/UserRegister'),
        meta:{show:false}
    },
    {
        path:'/detail/:skuid?',
        component:()=>import('@/pages/UserDetail'),
        meta:{show:true}
    },
    {
        // 加入购物车成功路由
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },

    {
        path:'/cart',
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:false}
    },
    // 重定向，在项目运行时显示首页
    {
        path:'*',
        redirect:'/home'
    }
]