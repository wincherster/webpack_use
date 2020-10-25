## webpack 教程练习

首先要安装`webpack`和`webpack-cli`完成基本的环境

```bash
npm i webpack -D

npm i webpack-cli -D

```

`loader`的处理顺序是，从下到上，从右到左。

#### 1. 图片的处理

1. `file-loader` 单纯的处理图片

```javascript
{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'file-loader',
    options: {
      // loader 的 Placeholder 占位符 https://webpack.js.org/loaders/file-loader/
      // name: '[name].[ext]' // name 的值是 string
      name: '[name]_[hash].[ext]', // name 的值是 string
      outputPath: 'images/',
    }
  }
}

```

2. `url-loader` 可以将图片转换成 `base64`格式嵌入到代码里

```javascript
{
  test: /\.(jpg|png|gif)$/,
  use: {
    // url-loader 最佳实践：< 1024 | 2048 的图片 可以直接注入到 打包的 js 文件，base64
    loader: 'url-loader',
    options: {
      name: '[name]_[hash].[ext]', // name 的值是 string
      outputPath: 'images/',
      // url-loader 需要配合 limit 属性
      limit: 100,
    }
  }
}
```
### 项目配置步骤

1. `css-loader`

#### 相关问题汇总
1. 重装系统后提交，`git push`报错，重新配置git账户后完成
2. `post-css`目前配置后不会自动添加浏览器私有前缀（待解决）


#### Babel 配置loader注意项

1. 编写业务代码的时候可以采用，依赖注入的形式

```javascript
{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", {
              targets: {
                chrome: "67"
              },
              useBuiltIns: 'usage', // 根据代码中的 语法变量名 处理，不用全处理打包，main.js文件会小80%
            }]

            ]
        }

```
2. 编写库的时候，可以采用runtime的形式

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    // 采用插件的形式进行配置
    "plugins": [
      ["@babel/plugin-transform-runtime", {
        "corejs": 2, // false
        "helpers": true,
        "regenerator": true,
        "useESModules": false,
      }]
    ]
}
```


所有的配置优化，都是在减少代码侵入和耦合