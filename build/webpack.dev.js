const VConsolePlugin = require('vconsole-webpack-plugin');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development', // 'production' 生产环境
  devServer: {
    hot: true, // 热模块更新
    // hotOnly: true, // 热模块更新  不用手动刷新
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
  plugins: [
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

module.exports = merge(commonConfig, devConfig)