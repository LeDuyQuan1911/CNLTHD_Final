// Thêm xóa sửa node trong javascript
// 1. tạo ra element trong javascript: document.createElement("tag")
const div = document.createElement("div")
// 2. selector.appendChild
// document.body -> thẻ body hoặc document.querySelector("body")
const body = document.body
body.appendChild(div)

div.className = "container wrapper"
div.setAttribute("data-name","evondev")
const img = document.createElement("img")
img.setAttribute("src","hehehehehehe.com")
img.classList.add("card-image")
div.appendChild(img)
body.appendChild(div)

// 3. document.createTextNode -> Mục đích chỉ là tạo ra text
const text = document.createTextNode("hello my name is bill")
const h1 = document.createElement("h1")
body.appendChild(h1)
h1.appendChild(text)

// 4. element.cloneNode()
const h1Clone = h1.cloneNode(true) // nếu bên trong cloneNode là true thì nó sẽ copy hết tất cả bên trong, còn false thì chỉ copy tag
body.appendChild(h1Clone)

// 5. element.hasChildNodes -> kiểm tra có phần tử con hay không, nếu có trả về True, nếu không trả về false

console.log(document.querySelector("h3").hasChildNodes()) // false
document.querySelector("h3").appendChild(document.createTextNode("123"))
console.log(document.querySelector("h3").hasChildNodes()) // true