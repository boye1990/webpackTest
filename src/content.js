function Content() {
  var dom = document.getElementById("root");
  var content = document.createElement("div"); // 创建一个div
  content.innerText = "content"; // 将这个div内容设置为 content
  dom.append(content); // 将这个div添加到dom里面
}

export default Content