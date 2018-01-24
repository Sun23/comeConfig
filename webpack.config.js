const webpack = require('webpack');
const path = require('path');

// 使用path配置路径
// path.resolve([from ...], to)  将一系列路径或路径段解析为绝对路径
const BASE_PATH = path.resolve(__dirname); // D:\project\react-liar
const DEV_PATH = path.resolve(BASE_PATH,'src'); // __dirname/src 也就是 D:\project\react-liar\src
const MAIN_FILE = path.resolve(BASE_PATH,'index.jsx');

module.exports = {
    devtool: 'eval-source-map', // 生成map文件 方便调试
    entry:  MAIN_FILE, //已多次提及的唯一入口文件
    output: {
        path: BASE_PATH + "/Public", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    devServer: {
        contentBase: BASE_PATH + "/Public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true
    },
    // 通常配置一些loader
    module: {
        rules: [
            // 可以使用es6 语法 和 jsx语法
            {
                test: /(\.jsx|\.js)$/, // 一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                use: {                  // loader的名称（必须）
                    loader: "babel-loader"
                    // option 信息在.babelrc 文件中 webpack会自动调用
                },
                exclude: /node_modules/, //手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）(别名include)
                // query 为loaders提供额外的设置选项（可选）
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // 将所有的计算后的样式加入页面中
                    }, {
                        loader: "css-loader", // 能够使用类似@import 和 url(...)的方法实现 require()的功能 比如在文件中import ‘..css’文件
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader" // 一个CSS的处理平台-PostCSS，它可以帮助你的CSS实现更多的功能
                    }
                ]
            }
        ]
    },
    // 配置一些插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热重载组件
    ]
}