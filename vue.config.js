
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
//引入cesium资源包
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'


module.exports = {


    publicPath: '/',

    outputDir: 'dist',

    assetsDir: '',

    indexPath: 'index.html',
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },

    lintOnSave: process.env.NODE_ENV !== 'production',

    productionSourceMap: false,//去掉生产环境的map

    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            }),
            new webpack.ProvidePlugin({
                //全局
                //   'THREE': require.resolve('three')
            })
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false

        }
    },
    devServer:{
          open: process.platform === 'darwin',

        host: '0.0.0.0',

        port: 8081,

        https: false,

        hotOnly: false,
        // proxy:'http://localhost:8081'
        
    }
}