const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist', // 服务器开启目录
    open: true,

    proxy: {
      '/api':'http://localhost:3000'
    }
  },
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
              modules: true, // css 模块化开启
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};