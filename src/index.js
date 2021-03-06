// ES module 的引入方式
import cat from './img/cat.jpg'
// CommonJs 的引入方式
var niu = require('./img/niu.jpg')
import './index.scss'

var catImg = new Image()
var img = new Image()

img.classList.add('imgClassName')
catImg.classList.add('imgClassName')

// ES module 引入文件的使用方式
catImg.src = cat
// CommonJs 引入文件的使用方式
img.src = niu.default



var dom = document.getElementById('root')

dom.append(img)
dom.append(catImg)