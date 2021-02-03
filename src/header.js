function Header() {
  var dom = document.getElementById("root");
  var header = document.createElement("div"); // 创建一个div
  header.innerText = "header"; // 将这个div内容设置为 sidebar
  dom.append(header); // 将这个div添加到dom里面
}

export default Header