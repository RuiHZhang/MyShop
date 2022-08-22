// 引入组件
import UserHome from '@/pages/UserHome'
import UserSearch from '@/pages/UserSearch'
import UserLogin from '@/pages/UserLogin'
import UserRegister from '@/pages/UserRegister'
import UserDetail from '@/pages/UserDetail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import UserTrade from '@/pages/UserTrade/index.vue'
import UserPay from '@/pages/UserPay'
import PaySuccess from '@/pages/PaySuccess'
import UserCenter from '@/pages/UserCenter'
import MyOrder from '@/pages/UserCenter/myOrder'
import GroupOrder from '@/pages/UserCenter/groupOrder'

export default [
    {
        path:'/center',
        component:UserCenter,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
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
        component:PaySuccess,
        meta:{show:true}
    },
    // 支付路由
    {
        path:'/pay',
        component:UserPay,
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
        component:UserTrade,
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
        component:UserHome,
        meta:{show:true}
    },
    {
        name:'search',
        // path中写占位符是和字符串形式配合的，用对象形式传params时可不写
        // path:'/search/:keyword',
        // path中写占位符是和字符串形式配合的，用对象形式传params时可不写
        path:'/search/:keyword?',
        component:UserSearch,
        meta:{show:true},
        props:true,
    },
    {
        path:'/login',
        component:UserLogin,
        meta:{show:false}
    },
    {
        path:'/register',
        component:UserRegister,
        meta:{show:false}
    },
    {
        path:'/detail/:skuid?',
        component:UserDetail,
        meta:{show:true}
    },
    {
        // 加入购物车成功路由
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },

    {
        path:'/cart',
        name:'shopcart',
        component:ShopCart,
        meta:{show:false}
    },
    // 重定向，在项目运行时显示首页
    {
        path:'*',
        redirect:'/home'
    }
]