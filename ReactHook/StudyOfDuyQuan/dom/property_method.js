// 1. selector.getAttribute("Attribute")
// selector: 1 cái chứ không phải là Nodelist hay HTMLCollection
// attribute -> thuộc tính: href, id, class, src, style,...
const link = document.querySelector(".link")
console.log(link.getAttribute("href")) // leduyquan.com
const li = document.querySelectorAll("li")
li.forEach(element => {
    console.log(element.getAttribute("class"))
});

// 2. selector.setAttribute("attribute","value") -> set giá trị cho attribute nào đó của selector
const a = document.querySelector(".link")
a.setAttribute("target","_blank")
console.log(a)
// dùng cho nhiều phần tử
const aList = document.querySelectorAll(".link")
aList.forEach((e)=>{
    e.setAttribute("target","_blank")
})
console.log(aList)

// 3.selector.removeAttribute("attribute")
const p = document.querySelector("#spinner")
p.removeAttribute("style")
// <div id="spinner" style="color: red;">Lê Duy Quân Đẹp Trai số một id</div>
// ->> <div id="spinner">Lê Duy Quân Đẹp Trai số một id</div>

// 4. selector.hasAttribute("attribute") -> kiểm tra selector có attribute nào đó hay không, nếu có -> true, ngược lại false
p.setAttribute("class","spinner")
console.log(p.hasAttribute("class")) // true

// 5. textContent -> lấy ra nội dung của thẻ ( bao gồm khoảng trắng ), có thể chỉnh sửa nội dung
// p.textContent = "Hello World" // có thể thay đổi được nội dung
// console.log(p.textContent)
console.log(p.textContent) // không thể in ra các thẻ nằm trong nội dung // kq:         lê duy quân
console.log(p.innerHTML) // Có thể in ra các thẻ nằm trong content và có thể chứa khoảng trắng  // kq:         lê <strong>duy</strong> quân
console.log(p.innerText) // lấy ra nội dung của thẻ nhưng không thể in ra khoảng trắng và có thẻ trong phần content // kq: lê duy quân

// classList
console.log("-----classList-----")
// 1. selector.classList.add("tên-class")
const classList = document.querySelector("#classList")
classList.classList.add("is_blue")

// 2. selector.classList.remove("ten-class")
const classList2 = document.querySelector("#classList2")
classList2.classList.remove("is_blue")

// 3. selector.classList.contains("ten-class") -> Đúng trả về true, sai trả về false
console.log(classList.classList.contains("is_blue"))

// 4. selector.classList.toggle("ten-class") -> nếu class đó tồn tại thì xóa, nếu chưa có thì add vào
classList2.classList.toggle("is_blue")
// classList.toggle() tương tự code sau
// if(classList.classList.contains("is_blue")){
//     classList.classList.remove("is_blue")
// }
// else{
//     classList.classList.add("is_blue")
// }

// 5. selector.className -> trả về 1 chuỗi các class của selector
console.log(classList2.className) // kq: is_blue
// nếu có nhiều các class quá và muốn thay thế hoặc xóa nhanh
classList2.className = "is-red"