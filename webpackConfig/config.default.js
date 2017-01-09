var webpack = require('webpack');
var mockAddress = 'http://127.0.0.1:3000/';

module.exports = {
    devConfig: {
        devServer: {
            // contentBase: "./static",//本地服务器所加载的页面所在的目录
            colors: true,
            progress: true,
            host: 'localhost',
            port: "8809",
            historyApiFallback: true,//不跳转
            proxy: {
                //转发至mock服务器
                '**/*': {
                    target: mockAddress,
                    secure: false
                }
            },
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ]
    }

};


