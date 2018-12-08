module.exports = {
    // 配置一些规则
    module: {
        rules: [{
            // 检测文件类型
            test: /\.js?$/,
            loader: 'babel-loader',
            // 如果是在node_modules里面 我们不需要编译
            exclude: '/node_modules/',
            // 额外的配置项 options  正确的编译react babel-preset-react es2015/2017 stage-0
            // 打包的时候兼容最新的两个浏览器版本
            options: {
                presets: ['react', 'stage-0', ['env', {
                    targets: {
                        browsers: ['last 2 versions']
                    }
                }]]
            }
        }]
    }
}

