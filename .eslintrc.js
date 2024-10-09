module.exports = {
    // 声明此配置文件为根配置文件，不再向上查找其他 ESLint 配置
    root: true,

    env: {
        // 指定代码运行在 Node.js 环境中
        node: true,
    },

    extends: [
        // 使用 Vue 官方提供的基础规则集，检查 Vue 组件的关键错误
        'plugin:vue/essential',
        // 使用 ESLint 推荐的规则集，主要检查 JavaScript 语法和代码质量
        'eslint:recommended',
        // 使用 Prettier 推荐的配置，禁用 ESLint 中与代码格式冲突的规则，统一代码格式
        'plugin:prettier/recommended',
    ],

    parserOptions: {
        // 使用 Babel 解析器来支持更高级的 ECMAScript 语法（如 ES6+）
        parser: '@babel/eslint-parser',
    },

    rules: {
        // 关闭未使用变量的警告/错误提示
        'no-unused-vars': 'off',
        // 关闭 Vue 组件名称必须是多单词的要求
        'vue/multi-word-component-names': 'off',
        // 关闭对变量必须使用驼峰命名法的检查
        camelcase: 'off',
        // 将 Prettier 的规则作为错误来对待，如果不符合 Prettier 的格式要求会抛出错误
        'prettier/prettier': 'error',
    },

    overrides: [
        {
            // 对特定文件类型（.vue 和 .ts）进行 ESLint 检查
            files: ['*.vue', '*.ts'], // 扩展文件类型，包含 .vue, .ts 文件
            rules: {
                // 可以在此添加针对这些文件的额外规则
            },
        },
    ],
}
