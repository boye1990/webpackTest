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
          loader: 'file-loader',
          options: {
            // placeholder 占位符 name---打包文件原文件名，hash---打包该文件时生成的哈希值，ext---打包文件原来的后缀
            name: '[name]_[hash].[ext]',
            // 打包文件放置的地址。
            outputPath: 'images/'
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