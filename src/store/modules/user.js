import { getInfo, setInfo } from '@/utils/storage'
export default {
    namespaced: true,
    state() {
        return {
            userInfo: getInfo(),
        }
    },
    mutations: {
        setUserInfo(state, obj) {
            state.userInfo = obj
            setInfo(obj)
        },
    },
    actions: {
        logout(context) {
            // 重置个人信息
            context.commit('setUserInfo', {})
            // 重置购物车信息（跨模块调用mutation）cart/setCartList
            context.commit('cart/setCartList', [], { root: true })
        },
    },
}
