function SideBar() {
  var dom = document.getElementById("root");
  var sidebar = document.createElement("div"); // 创建一个div
  sidebar.innerText = "sidebar"; // 将这个div内容设置为 sidebar
  dom.append(sidebar); // 将这个div添加到dom里面
}

export default SideBar