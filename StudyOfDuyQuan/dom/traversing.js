// 1. parentNode, parentElement, removeChild
// parentNode, parentElement -> Mỗi lần dùng nó sẽ nhảy ra phần tử cha của nó
const span = document.querySelector("span");
console.log(span.parentNode.parentNode)
console.log(span.parentElement.parentElement)
