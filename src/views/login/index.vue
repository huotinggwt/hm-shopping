<template>
    <div class="login">
        <!-- $router.go -->
        <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
        <div class="container">
            <div class="title">
                <h3>手机号登录</h3>
                <p>未注册的手机号登录后将自动注册</p>
            </div>

            <div class="form">
                <div class="form-item">
                    <input
                        v-model="mobile"
                        class="inp"
                        maxlength="11"
                        placeholder="请输入手机号码"
                        type="text"
                    />
                </div>
                <div class="form-item">
                    <input
                        v-model="picCode"
                        class="inp"
                        maxlength="5"
                        placeholder="请输入图形验证码"
                        type="text"
                    />
                    <img
                        v-if="picUrl"
                        @click="getPicture"
                        :src="picUrl"
                        alt=""
                    />
                </div>
                <div class="form-item">
                    <input
                        v-model="smsCode"
                        class="inp"
                        placeholder="请输入短信验证码"
                        type="text"
                    />
                    <button @click="getSmsCode">
                        {{
                            second === totalSecond
                                ? '获取验证码'
                                : second + '秒后重新发送'
                        }}
                    </button>
                </div>
            </div>

            <div class="login-btn" @click="login()">登录</div>
        </div>
    </div>
</template>

<script>
// 导入封装好的请求方法，这样可以实现复用
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
    name: 'LoginPage',
    data() {
        return {
            picKey: '', // 请求得到的图形验证码的唯一标识
            picUrl: '', // 存储请求得到的图片base64
            totalSecond: 60, // 倒计时的总秒数
            second: 60, // 当前秒数，开启定时器对second--
            timer: '', //定时器ID
            picCode: '', // 用户输入的图形验证码
            mobile: '', // 手机号
            smsCode: '', // 用户输入的短信验证码
        }
    },
    async created() {
        this.getPicture()
    },
    methods: {
        // 获取后端图形验证码的key和base64
        async getPicture() {
            const {
                data: { base64, key },
            } = await getPicCode()
            this.picUrl = base64
            this.picKey = key
            // this.$toast('哈哈哈')
        },
        // 校验输入的手机号和图形验证码是否合法
        validFn() {
            if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
                this.$toast('请输入正确的手机号')
                return false
            }
            if (!/^\w{4}$/.test(this.picCode)) {
                this.$toast('请输入正确的图形验证码')
                return false
            }
            return true
        },
        // 获取短信验证码
        async getSmsCode() {
            if (!this.validFn()) {
                // 如果没通过校验直接return
                return
            }
            // 通过校验后发送post请求,
            // 预期：如果响应的状态不是200，能够抛出一个错误，await只会等待成功的promise
            // 不在页面中判断，通过响应拦截器统一判断
            const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
            this.$toast('短信发送成功,注意查收')

            // 当前没有任何定时器且totalSecond 和 second一致才可以倒计时
            if (!this.timer && this.second === this.totalSecond) {
                // 开启倒计时
                this.timer = setInterval(() => {
                    this.second--
                    if (this.second <= 0) {
                        clearInterval(this.timer)
                        this.timer = null // 重置定时器
                        this.second = this.totalSecond //时间复位
                    }
                }, 1000)
            }
        },
        // 登录
        async login() {
            // 验证图形验证码和手机号
            if (!this.validFn()) {
                return
            }
            // 验证短信验证码
            if (!/^\d{6}$/.test(this.smsCode)) {
                this.$toast('请输入正确的短信验证码')
                return
            }
            const res = await codeLogin(this.mobile, this.smsCode)
            // 登录成功将返回的token和userId存储到vuex中
            this.$store.commit('user/setUserInfo', res.data)
            // 登录成功跳转到首页同时给出提示
            this.$router.push('/')
            this.$toast('登录成功')
        },
    },
    // 离开页面清除定时器，防止资源浪费
    destroyed() {
        clearInterval(this.timer)
    },
}
</script>

<style lang="less" scoped>
.container {
    padding: 49px 29px;

    .title {
        margin-bottom: 20px;
        h3 {
            font-size: 26px;
            font-weight: normal;
        }
        p {
            line-height: 40px;
            font-size: 14px;
            color: #b8b8b8;
        }
    }

    .form-item {
        border-bottom: 1px solid #f3f1f2;
        padding: 8px;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        .inp {
            display: block;
            border: none;
            outline: none;
            height: 32px;
            font-size: 14px;
            flex: 1;
        }
        img {
            width: 94px;
            height: 31px;
        }
        button {
            height: 31px;
            border: none;
            font-size: 13px;
            color: #cea26a;
            background-color: transparent;
            padding-right: 9px;
        }
    }

    .login-btn {
        width: 100%;
        height: 42px;
        margin-top: 39px;
        background: linear-gradient(90deg, #ecb53c, #ff9211);
        color: #fff;
        border-radius: 39px;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
