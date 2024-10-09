// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            // 375是iphonex的标准尺寸
            viewportWidth: 375,
        },
    },
}
