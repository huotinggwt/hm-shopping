import request from '@/utils/request'

// 1. 获取图形验证码
export const getPicCode = () => {
    return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobile,
        },
    })
}

// 3. 登录
export const codeLogin = (mobile, smsCode) => {
    return request.post(
        'https://apifoxmock.com/m1/4928016-4585237-default/data',
        {
            form: {
                isParty: false,
                mobile,
                partyData: {},
                smsCode,
            },
        }
    )
}
