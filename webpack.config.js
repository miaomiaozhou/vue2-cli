/**
 * Created by zhoudan on 16/12/22.
 */
var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'static');
var TPL_PATH = path.resolve(ROOT_PATH, 'tpl');
var NODE_ENV = process.env.NODE_ENV || 'dev';
console.log("NODE_DEV:"+NODE_ENV);
var TARGET = process.env.npm_lifecycle_event;
console.log("TARGET:"+ TARGET);
var webpackConfig = require('./webpackConfig/config.default.js');
var utils = require('./webpackConfig/utils');

var appJsonObj = utils.getHtmlPluginArr();

/* webpack配置 */
var configObj = {};

/* webpack 通用配置 */
var commonConfig = {
    devtool: 'eval-source-map',
    entry: appJsonObj.entryObj,
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `image/[name].[hash:7].[ext]`
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `font/[name].[hash:7].[ext]`
                }
            }
        ]
    },
    //配置短路径引用
    resolve: {
        alias: {
            page: path.resolve(APP_PATH, 'page'),
            assets: path.resolve(APP_PATH, 'assets'),
            services: path.resolve(APP_PATH, 'services'),
            node_modules: path.resolve(ROOT_PATH, 'node_modules'),
        },
        extensions: ['', '.js', '.vue'],
        modules: [
            APP_PATH,
            "node_modules",
            path.join(ROOT_PATH, '/src')
        ]

    },

    plugins: appJsonObj.pluginArr.concat(
        [
            new webpack.EnvironmentPlugin(["NODE_ENV"]),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor"],
                filename: 'js/[name].[hash].js',
                minChunks: 2
            })
        ]
    )
};

if (TARGET === 'start') {
    var devConfig = webpackConfig.devConfig;
    configObj = merge(commonConfig, devConfig);
    console.log(configObj);
}


module.exports = configObj;