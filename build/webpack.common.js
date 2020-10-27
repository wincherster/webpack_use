const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // 源文件名称
    // filename: 'bundle.js',
  },
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
    })
  ],
};