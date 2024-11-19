import { getCartList, changeCartCount, delSelect } from '@/api/cart'
import { Toast } from 'vant'

export default {
    namespaced: true,
    state() {
        return {
            cartList: [],
        }
    },
    mutations: {
        // 更新购物车列表
        setCartList(state, newList) {
            state.cartList = newList
        },
        // 购物车中修改是否选中商品
        toggleCheck(state, goodsId) {
            // 让对应的id项的状态取反
            const goods = state.cartList.find(
                (item) => item.goods_id === goodsId
            )
            goods.isChecked = !goods.isChecked
        },
        // 点击全选修改所有小选框的数据
        toggleAllCheck(state, flag) {
            // 让所有的小选框，同步设置
            state.cartList.forEach((item) => {
                item.isChecked = flag
            })
        },
        // 本地修改vuex中保存的商品数量
        changeLocalCount(state, { goodsId, goodsNum }) {
            const goods = state.cartList.find(
                (item) => item.goods_id === goodsId
            )
            goods.goods_num = goodsNum
        },
    },
    actions: {
        // 通过接口获取购物车列表然后调用mutations里面的方法更新购物车列表
        async getCartAction(context) {
            const { data } = await getCartList()
            // 后台返回的购物车列表数据中，不包含复选框的选中状态，为了实现将来的功能
            // 需要手动维护数据，给每一项添加一个isChecked状态，标记当前商品是否被选中
            data.list.forEach((item) => {
                item.isChecked = true
            })
            context.commit('setCartList', data.list)
        },
        // 购物车商品数量更新，先本地后请求后台
        async changeCountAction(context, obj) {
            const { goodsNum, goodsId, goodsSkuId } = obj
            // 先本地修改，将修改后的数据同步到后台，这样可以避免后台数据更新前台没变
            // 本地修改
            context.commit('changeLocalCount', { goodsId, goodsNum })
            // 同步到后台
            await changeCartCount(goodsId, goodsNum, goodsSkuId)
        },
        // 删除购物车数据
        async delAction(context) {
            const selCartList = context.getters.selCartList
            // 获取所有选中的购物车商品的ID
            const cartIds = selCartList.map((item) => item.id)
            await delSelect(cartIds)
            Toast('删除成功')

            // 重新拉取最新的购物车数据 (重新渲染)
            context.dispatch('getCartAction')
        },
    },
    getters: {
        // 求所有的商品累加总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        // 购物车中选中的商品列表
        selCartList(state) {
            return state.cartList.filter((item) => item.isChecked)
        },
        // 选中的总数
        // 在一个getters中使用另外一个getters中的数据，只需要在形参中加上getters
        selCount(state, getters) {
            return getters.selCartList.reduce(
                (sum, item) => sum + item.goods_num,
                0
            )
        },
        // 选中的总价格，保留两位小数
        selPrice(state, getters) {
            return getters.selCartList
                .reduce(
                    (sum, item) =>
                        sum + item.goods_num * item.goods.goods_price_min,
                    0
                )
                .toFixed(2)
        },
        // 是否全选
        isAllChecked(state) {
            // 判断每一个元素的isChecked是否都是true,如果是结果为true,否则为false
            return state.cartList.every((item) => item.isChecked)
        },
    },
}
