const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist', // 服务器开启目录
    open: true, // 自动打开浏览器
    port: 8080, // 默认开启 8080 端口，可修改启动端口号
    proxy: {
      '/api':'http://localhost:3000'
    }
  },
  devtool: 'source-map', // 代码报错，映射到具体源码位置
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
        use: ['style-loader', 'css-loader']
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};