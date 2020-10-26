const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 'production' 生产环境
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // 源文件名称
    // filename: 'bundle.js',
  },
  devServer: {
    hot: true, // 热模块更新
    hotOnly: true, // 热模块更新
    contentBase: './dist', // 服务器开启目录
    open: true, // 自动打开浏览器
    port: 8080, // 默认开启 8080 端口，可修改启动端口号
    proxy: {
      '/api':'http://localhost:3000'
    }
  },
  devtool: 'cheap-module-eval-source-map',
  // 'source-map', // 代码报错，映射到具体源码位置
  // 'inline-source-map' 配置项，会将映射文件代码打包到 代码中去
  // 'eval-source-map' 配置项，会将映射文件代码打包到 代码中去
  // 'cheap-source-map' 只定位到 报错代码行，不会定位到行和列

  // 最佳实践
  // 'cheap-module-eval-source-map'  在 development 模式下是比较快，并且报错信息比较全面
  // 'cheap-module-source-map'  在 production 模式提示效果会更好些
  module: {
    rules: [
      // { test: /\.txt$/, use: 'raw-loader' },]
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // 浏览器私有前缀 postcss-loader  autoprefixer 
      // 没有生效
      { 
        test: /\.scss$/, 
        use: [
          'style-loader', 
          // 'css-loader', 
          {
            loader: 'css-loader', 
            options: {
              importLoaders: 2, // css 文件中 import 其他样式文件，强制走 下面 2个 loader
              // modules: true, // css 模块化开启
            }
          }, 
          'sass-loader', 
          'postcss-loader'
        ]
      },
      {
        // test: /\.jpg$/,
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader',

          // url-loader 最佳实践：< 1024 | 2048 的图片 可以直接注入到 打包的 js 文件，base64
          loader: 'url-loader',
          options: {
            // loader 的 Placeholder 占位符 https://webpack.js.org/loaders/file-loader/
            // name: '[name].[ext]' // name 的值是 string
            name: '[name]_[hash].[ext]', // name 的值是 string
            outputPath: 'images/',
            
            // url-loader 需要配合 limit 属性
            limit: 100,
          }
        }
      },{
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // 抽离options 配置项到 .babelrc
        // options: {
          // presets: [
            // ["@babel/preset-env", {
            //   targets: {
            //     chrome: "67"
            //   },
            //   useBuiltIns: 'usage', // 根据代码中的 语法变量名 处理，不用全处理打包，main.js文件会小80%
            // }]

            // ]
          // 采用插件的形式进行配置
        //   "plugins": [
        //     ["@babel/plugin-transform-runtime", {
        //       "corejs": 2, // false
        //       "helpers": true,
        //       "regenerator": true,
        //       "useESModules": false,
        //     }]]
        // }
      }
    ]
  },
  plugins: [
    // 2020-09-22 打包前清理dist目录，需要在 HtmlWebpackPlugin 之前
    new CleanWebpackPlugin(),
    // 2020-09-22 会在打包结束后，自动生成一个html文件，
    // 并把打包生成的js文件自动引入到html文件中
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VConsolePlugin({
      enable: true, // 根据线上 or 预发环境配置
    }),
    // 2020-09-22 开启 HMR 热模块更新
    new webpack.HotModuleReplacementPlugin()
  ],
  // Tree shaking 配置项
  // mode为 production 时，该配置项不需要
  optimization: {
    usedExports: true
  }
};