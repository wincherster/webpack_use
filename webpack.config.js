'use strict';
// const fs = require('fs');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件

module.exports = {
  mode: 'development',
  // entry: { 'main': './main.js' },
  entry: './main.js',
  // entry: ['./main.js'],
  output: {
    // filename: './build.js',
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // loaders 关键字 改成了 rules
    rules: [
      { 
        test: /\.css$/,
        // 方式一 
        // use: ['style-loader', 'css-loader'], // css-loader?minimize
        // 方式二
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            // minimize: true,
          }
        }], // css-loader?minimize
        // 方式三
        // loaders: ExtractTextPlugin.extract({
        //   // 转换.css文件需要使用的loader
        //   use: ['css-loader'],
        // })
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        options: {
          // presets: ["es2015"]
        },
      },
      {
        test: /\.vue?$/,
        loader: "vue-loader",
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    alias: {
      "@": './src/components/'
    }
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true
  },
  plugins: [
    // new ExtractTextPlugin({
    //   // 从.js文件中提取出来的.css文件的名称
    //   filename: `[name]_[contenthash:8].css`,
    // }),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './public/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}