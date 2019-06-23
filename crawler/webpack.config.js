const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const cssExtract = new ExtractTextPlugin('css/[name].css');
const fileCopy = new CopyPlugin([
    { from: './src/cache', to: './cache' },
    { from: './src/dataAnalysis/echarts.min.js', to: './js/echarts.min.js' }
]);

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: {
        // echart: ['./src/dataAnalysis/echarts.min.js'],
        main: ['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: cssExtract.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    devtool: '#eval-source-map',    //  通过这个配置可以查看源映射文件，生产环境需去掉
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: false,
        port: 8088,
        disableHostCheck: true, //  兼容IE不做客户端是否为白名单的安全性检查，开发环境不需要，生产环境需要去掉
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '前端开发多维度评测',
            template: './index.html'
        }),
        cssExtract,
        fileCopy
    ],
    performance: {
        hints: 'error',
	    maxAssetSize: 8000000,  //  设置的资源最大接受数为8M
        maxEntrypointSize: 8000000
    }
};