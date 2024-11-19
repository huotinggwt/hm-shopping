// 约定通用的键名
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'

// 获取个人信息
export const getInfo = () => {
    const result = localStorage.getItem(INFO_KEY)
    // 如果有值就设置,没有就设置默认值
    return result
        ? JSON.parse(result)
        : {
              token: '',
              userId: '',
          }
}

// 设置个人信息
export const setInfo = (info) => {
    //json.srtingify()将对象转换成json格式的字符串
    localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
    localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
    const result = localStorage.getItem(HISTORY_KEY)
    return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
