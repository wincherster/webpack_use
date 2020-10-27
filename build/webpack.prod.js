const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production', // 'production' 生产环境
  devtool: 'cheap-module-source-map', //  在 production 模式提示效果会更好些
};

module.exports = merge(commonConfig, prodConfig)