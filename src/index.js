import niu from './img/niu.jpg'
var img1 = require('./img/niu.jpg')

var img = new Image()

img.src = img1.default

console.log(img1.default, niu)

var dom = document.getElementById('root')

dom.append(img)