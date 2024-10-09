import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/utils/vant-ui'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: Login },
    {
        path: '/',
        // 重定向到home

        redirect: '/home',
        component: Layout,
        children: [
            { path: '/home', component: Home },
            { path: '/category', component: Category },
            { path: '/cart', component: Cart },
            { path: '/user', component: User },
        ],
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，用id确认是哪个商品
    { path: '/ prodetail/:id', component: Prodetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: Myorder },
]

const router = new VueRouter({
    routes,
})

// 定义一个数组，专门存放用户需要权限访问的页面
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
    // 判断to.path中有没有authUrl,也就是看访问页面是不是需要权限访问的
    if (!authUrl.includes(to.path)) {
        // 非权限页面直接放行
        next()
        return
    }
    // 是权限页面需要判断token
    // 这里获取token的代码很长,我们可以在index.js中封装好token
    // const token = store.state.user.userInfo.token
    const token = store.getters.token
    console.log(token)
    // 有token直接放行,没有token跳转到登录页面
    if (token) {
        next()
    } else {
        next('/login')
    }
})

export default router
