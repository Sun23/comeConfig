// webpack.production.config.js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 将css文件从js分离出来 
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

const BASE_PATH = path.resolve(__dirname); // D:\project\react-liar
const DEV_PATH = path.resolve(BASE_PATH,'src'); // __dirname/src 也就是 D:\project\react-liar\src
const MAIN_FILE = path.resolve(DEV_PATH,'main.jsx');
const BUILD_PATH = path.resolve(BASE_PATH, 'build')

module.exports = {
    entry: MAIN_FILE, //已多次提及的唯一入口文件
    output: {
        path: BUILD_PATH,
        filename: "js/bundle-[hash].js"   // 缓存优化
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "postcss-loader"
                }],
            })
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new ExtractTextPlugin("css/style.css"), // 分离CSS和JS文件
        new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码；
        new CleanWebpackPlugin('build/*.*', { // 清理以前的文件
            root: __dirname,
            verbose: true,
            dry: false
        })
    ],
};
