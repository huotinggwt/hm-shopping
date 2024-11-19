import request from '@/utils/request'
// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
    return request.post('/cart/add', {
        goodsId, // 商品ID
        goodsNum, // 商品数量
        goodsSkuId, // 商品规格ID
    })
}

// 获取购物车列表
export const getCartList = () => {
    return request.get('/cart/list')
}

// 购物车商品更新
export const changeCartCount = (goodsId, goodsNum, goodsSkuId) => {
    return request.post('/cart/update', {
        goodsId,
        goodsNum,
        goodsSkuId,
    })
}

// 删除购物车
export const delSelect = (cartIds) => {
    return request.post('/cart/clear', {
        cartIds,
    })
}
