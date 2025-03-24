// 1. DOM là gì?
// Document Object Model : các thẻ trong html( DOM Node ), các thuộc tính trong thẻ ( Dom Attribute )

// 2. Selecting nodes
// 2.1 document.querySelector("selector") -> trả về một node nếu phần tử đó tồn tại, ngược lại nó sẽ trả về null
// selector: .header, p, body, #heading
const singleNode = document.querySelector("h1")
const singleNode2 = document.querySelector(".container")
const singleNode3 = document.querySelector("#spinner")
console.log(singleNode) // <h1> Lê Duy Quân Đẹp Trai số một </h1>
console.log(singleNode2) // <div class="container">Lê Duy Quân Đẹp Trai số một container </div>
console.log(singleNode3) // <div id="spinner"> Lê Duy Quân Đẹp Trai số một id </div>

// 2.2 document.querySelector("selector") -> trả về một NodeList chứa danh sách các node, nếu không chứ thì trả về Empty(NodeList rỗng)
// NodeList có loop(forEach, không sử dụng được map và filter) nhưng không có các method như Array
const multiNodes1 = document.querySelector(".item")
console.log(multiNodes1) // Chỉ trả về một phần tử đầu tiên 
const multiNodes2 = document.querySelectorAll(".item")
console.log(multiNodes2) // Trả về tất cả các phần tử thỏa điều kiện(NodeList) / NodeList(5) [li.item, li.item, li.item, li.item, li.item]


// 2.3 document.getElementsByClassName -> trả về một HTMLCollection chứa danh sách các node, nếu không có giá trị thì trả về empty
// HTMLCollection không có loop trực tiếp, phải biến đổi
const elementsArray = Array.from(document.getElementsByClassName("example"));
elementsArray.forEach(element => {
  console.log(element);
});

// Sự khác biệt
// 1. NodeList có vòng lặp (forEach), còn HTMLCollection thì không có vòng lặp
// 2. NodeList khi cập nhật HTML thì NodeList không thay đổi và vẫn giữ giá trị cũ, còn HTMLCollection thì ngược lại: nếu như thay đổi bên HTML thì đổi lên cả bên js

// Ví dụ về getElementsByClassName
const classNode = document.getElementsByClassName("item")
console.log(classNode) // HTMLCollection(5) [li.item, li.item, li.item, li.item, li.item]

// 2.4. document.getElementsByTagName("tagname")
const tagNodes = document.getElementsByTagName("li")
console.log(tagNodes)

// 2.5. document.getElementsById("id")
const tagId = document.getElementById("spinner")
console.log(tagId)
