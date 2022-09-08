const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: '',
    //             ws: true,
    //             changeOrigin: true,
    //         },
    //     },
    // },
    chainWebpack: (config) => {
        /**
         * 解决以下问题：组件不用每次都引用index.less,可直接使用声明的less变量
         */
        const oneOfsMap = config.module.rule('less').oneOfs.store
        oneOfsMap.forEach((item) => {
            item.use('style-resources-loader')
                .loader('style-resources-loader')
                .options({
                // or an array : ["./path/to/vars.less", "./path/to/mixins.less"] 这里的路径不能使用@，否则会报错
                    patterns: './src/styles/index.less',
                })
                .end()
        })
    },
})
