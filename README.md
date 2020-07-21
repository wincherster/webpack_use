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


重装系统后提交