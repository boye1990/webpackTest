import niu from './niu.jpg'
// var img = require('./niu.jpg')

var img = new Image()

img.src = niu


var dom = document.getElementById('root')

dom.append(img)