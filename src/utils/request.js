import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建axios实例，对创建出的实例进行自定义配置
// 不会污染原始的axios实例
const instance = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
    timeout: 5000,
})

// 自定义配置 - 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // 开启loading,禁止背景点击,节流处理,阻止多次请求
        Toast.loading({
            message: '请求中...',
            forbidClick: true, // 禁止背景点击
            loadingType: 'spinner', //配置loading图标
            duration: 0, // 不会自动消失
        })

        // 只要有token,就在请求时携带，便于请求需要授权的接口
        const token = store.getters.token
        if (token) {
            // 带连字符的属性需要用[]语法进行书写
            config.headers['Access-Token'] = token
            config.headers.platform = 'H5'
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        const res = response.data
        if (res.status !== 200) {
            // 给提示 注意这里不能用this.$toast，因为这不是组件，需要用导入使用的方法
            // toast默认是单例模式,后面的toast调用了,会将前一个toast效果覆盖
            Toast(res.message)
            // 抛出一个错误的promise
            return Promise.reject(res.message)
        } else {
            // 正确情况,直接走业务核心逻辑,清除loading效果
            Toast.clear()
        }
        return res
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export default instance
