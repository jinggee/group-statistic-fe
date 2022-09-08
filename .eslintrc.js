module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: [2, 'never'],
        'no-shadow': 'off',
        // 方法必须定义返回类型
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // 允许使用any类型
        '@typescript-eslint/no-explicit-any': 'off',
        //
        'no-use-before-define': 'off',
        'no-unused-expressions': 'off',
        'prefer-regex-literals': 'off',
        // 缩进设置4个空格
        indent: ['error', 4],
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                /**
         * @description 修复 .vue 文件无法读取 global 的问题
         * @link https://github.com/typescript-eslint/typescript-eslint/releases/tag/v3.0.0
         * 最新的 @vue/eslint-config-typescript 中
         * 写法依旧是 'plugin:@typescript-eslint/eslint-recommended'
         */
                'no-undef': 'off',
            },
        },
    ],
}
