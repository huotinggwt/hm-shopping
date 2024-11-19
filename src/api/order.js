import request from '@/utils/request'

// 订单结算确认
// mode: cart  => obj cartIds
// mode: buyNow => obj goodsId goodsNum goodsSkuId
export const checkOrder = (mode, obj) => {
    return request.get('/checkout/order', {
        params: {
            mode, // cart/buyNow
            delivery: 10, // 10 快递配送 20门店自提
            couponId: 0, // 优惠券ID，0表示不使用优惠券
            isUsePoints: 0, // 积分 0表示不使用积分
            ...obj, // 将传递过来的参数对象动态展开
        },
    })
}

// 提交订单
// mode:cart  => obj { cartIds, remark }
// mode:buyNow => obj { goodsId, goodsNum, goodsSkuid, remark }
export const submitOrder = (mode, obj) => {
    return request.post('/checkout/submit', {
        mode, // cart/buyNow
        delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
        couponId: 0, // 优惠券 id
        payType: 10, // 余额支付
        isUsePoints: 0, // 是否使用积分
        ...obj, // 将传递过来的参数对象动态展开
    })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
    return request.get('/order/list', {
        params: {
            dataType, // 订单类型
            page, // 分页
        },
    })
}
