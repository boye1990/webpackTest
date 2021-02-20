## 安装webpack
1. 创建项目文件夹
2. 终端进入项目文件夹
3. 输入 npm init 命令，npm初始化，生成一个 package.json 文件
4. 输入 npm install webpack@4.41.4 webpack-cli@3.3.10 -D 安装 webpack 和 webpack-cli。
5. 修改 package.json 文件

- npm install xxx --save === npm install xxx -S 生产环境的所需依赖也就是咱们的线上环境----dependencies
- npm install xxx --save-dev === npm install xxx -D 开发所需的依赖也就是咱们本地环境----devDependencies

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "private": true, // 表示项目是私有的
  "scripts": {},
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.4",
    "webpack-cli": "^3.3.10"
  }
}
```

## webpack配置
- 打包不同的文件
- 打包到什么位置，从哪里开始打包
- webpack 有自己的默认配置
  1. 在我们没有自行配置 webpack 的时候，我们运行 npx webpack xxx.js 命令，需要告诉 webpack 从什么地方开始打包。
  2. 当我们 新建 webpack.config.js 文件，并配置好了打包入口文件以后。只需要 执行 npx webpack 命令。就会从你配置好的文件开始打包
  3. webpack 默认的配置文件名是 webpack.config.js。 你也可以通过这行命令修改 npx webpack --config xxxxxx。 来修改配置文件名称
- 配置 npm script 命令 来代替 npx webpack.
  1. 在package.json 文件中的 script 对象里面添加 "bundle": "webpack"
  2. 此时你在命令行输入 npm run bundle 就相当在执行 npx webpack
- 查看官方文档 GUIDES 目录下 Getting Started 部分内容
- 关于获取绝对路径，node path Api,可以参考下面的博客
> https://blog.csdn.net/zsensei/article/details/79094714

### webpack.config.js 文件内容
```javascript
// 引入 node 的一个核心模块，path 可以获取绝对路径
const path = require('path')
module.exports = {
  // 打包入口文件
  entry: './index.js',
  // 打包出来的文件信息
  output: {
    // 打包出来的入口文件名
    filename: 'bundle.js',
    // 打包出来的文件放置位置，必须是绝对路径 https://blog.csdn.net/zsensei/article/details/79094714
    path: path.resolve(__dirname, 'bundle') // 我们当前路径是 ./test/webpack.config.js, 那么这行代码的指的就是，./test/目录下的budle文件夹，即./text/bundle
  }
}
```

### package.json 文件内容
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.41.4",
    "webpack-cli": "^3.3.10"
  }
}
```

## 浅析 webpack 打包输出内容

```javascript
// 引入 node 的一个核心模块，path 可以获取绝对路径
const path = require('path')
module.exports = {
  // 打包模式，development 代码不会压缩， production 会压缩代码
  mode: 'development',
  // 打包入口文件
  entry: {
    main: './src/index.js'
  },
  // 打包出来的文件信息
  output: {
    // 打包出来的入口文件名
    filename: 'bundle.js',
    // 打包出来的文件放置位置，必须是绝对路径
    path: path.resolve(__dirname, 'dist') // 我们当前路径是 ./test/webpack.config.js, 那么这行代码的指的就是，./test/目录下的budle文件夹，即./text/bundle
  }
}
```
## webpack配置---loader

- 什么是 loader
  1. loader 是一种打包方案，webpack 默认只会打包js文件，其它文件需要借助 loader来完成
  2. loader 是一种加载器

- 如何配置 loader
  1. 在 webpack.config.js 文件中 添加 module 对象
  2. 在 module 对象中添加一个 rules 数组
  3. 在 rules 数组中 每个对象都可以是一个 loader 配置。
  4. 在 rules 数组元素中，添加 test 和 use 属性，test 定义使用 loader 的规则， use 定义使用什么样的 loader

- 安装 loader
  1. npm install file-loader -D

```javascript
// 引入 node 的一个核心模块，path 可以获取绝对路径
const path = require('path')
module.exports = {
  // 打包模式，development 代码不会压缩， production 会压缩代码
  mode: 'development',
  // 打包入口文件
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/, // 符合这个正则的文件使用下面的 loader 打包
        use: {
          // loader: 'file-loader',
          // options: {
          //   // placeholder 占位符 name---打包文件原文件名，hash---打包该文件时生成的哈希值，ext---打包文件原来的后缀
          //   name: '[name]_[hash].[ext]',
          //   // 打包文件放置的地址。
          //   outputPath: 'images/'
          // }
          loader: 'url-loader',
          options: {
            // placeholder 占位符 name---打包文件原文件名，hash---打包该文件时生成的哈希值，ext---打包文件原来的后缀
            name: '[name]_[hash].[ext]',
            // 打包文件放置的地址。
            outputPath: 'images/',
            // 设置将图片转化为base64文件的文件大小阀值，超过 100k 按配置打包成图片，低于 100k 会转化成base64写在bundle.js中，可以减少http请求次数
            limit: 102400
          }
        } 
      }
    ]
  },
  // 打包出来的文件信息
  output: {
    // 打包出来的入口文件名
    filename: 'bundle.js',
    // 打包出来的文件放置位置，必须是绝对路径 https://blog.csdn.net/zsensei/article/details/79094714
    path: path.resolve(__dirname, 'dist') // 我们当前路径是 ./test/webpack.config.js, 那么这行代码的指的就是，./test/目录下的budle文件夹，即./text/bundle
  }
}    
```

## 打包静态文件 样式文件（如css， sass）
- 安装对应的加载器
  1. style-loader // 4.将 JS 字符串生成为 style 节点
  2. css-loader // 3.将 css 转化成 CommonJs 模块
  3. sass-loader // 2.将 sass 编译成 css
  4. postcss-loader // 1.为 css3 的属性添加 浏览器厂商前缀

- loader执行顺序，是从右往左，从数组下标最大值开始。所以配置的时候要注意顺序

- 配置postcss插件autoprefixer 失效。具体处理方法如下
> https://www.cnblogs.com/guangzan/p/11264390.html


### webpack.config.js 文件
``` javascript
// 引入 node 的一个核心模块，path 可以获取绝对路径
const path = require('path')
module.exports = {
  // 打包模式，development 代码不会压缩， production 会压缩代码
  mode: 'development',
  // 打包入口文件
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/, // 符合这个正则的文件使用下面的 loader 打包
        use: {
          // loader: 'file-loader',
          // options: {
          //   // placeholder 占位符 name---打包文件原文件名，hash---打包该文件时生成的哈希值，ext---打包文件原来的后缀
          //   name: '[name]_[hash].[ext]',
          //   // 打包文件放置的地址。
          //   outputPath: 'images/'
          // }
          loader: 'url-loader',
          options: {
            // placeholder 占位符 name---打包文件原文件名，hash---打包该文件时生成的哈希值，ext---打包文件原来的后缀
            name: '[name]_[hash].[ext]',
            // 打包文件放置的地址。
            outputPath: 'images/',
            // 设置将图片转化为base64文件的文件大小阀值，超过 100k 按配置打包成图片，低于 100k 会转化成base64写在bundle.js中，可以减少http请求次数
            limit: 102400
          }
        } 
      },
      {
        test: /\.scss$/,
        // loader有执行顺序，从右到左边
        loader: [
          'style-loader', // 4.将 JS 字符串生成为 style 节点
          'css-loader', // 3.将 css 转化成 CommonJs 模块
          'sass-loader', // 2.将 sass 编译成 css
          'postcss-loader' // 1.为 css3 的属性添加 浏览器厂商前缀
        ]
      }
    ]
  },
  // 打包出来的文件信息
  output: {
    // 打包出来的入口文件名
    filename: 'bundle.js',
    // 打包出来的文件放置位置，必须是绝对路径 https://blog.csdn.net/zsensei/article/details/79094714
    path: path.resolve(__dirname, 'dist') // 我们当前路径是 ./test/webpack.config.js, 那么这行代码的指的就是，./test/目录下的budle文件夹，即./text/bundle
  }
}  
```
### package.json 文件
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^9.3.1",
    "css-loader": "^5.0.2",
    "file-loader": "^6.2.0",
    "node-sass": "^5.0.0",
    "postcss-loader": "^3.0.0",
    "sass": "^1.32.8",
    "sass-loader": "^5.0.0",
    "style-loader": "^2.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^4.41.4",
    "webpack-cli": "^3.3.10"
  },
  "browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
}
```

### postcss.config.js 文件
```javascript
module.exports = {
  plugins: [
    require('autoprefixer')()
  ],
};
```