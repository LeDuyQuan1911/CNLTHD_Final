// 1. insertAdjacentText -> Thêm text vào
const h3 = document.querySelector("h3");
// h3.insertAdjacentText("position","text")
// position: beforeBegin, afterBegin, beforeEnd, afterEnd
h3.insertAdjacentText("beforebegin","beforebegin")
h3.insertAdjacentText("afterBegin","afterBegin")
h3.insertAdjacentText("beforeEnd","beforeEnd")
h3.insertAdjacentText("afterEnd","afterEnd")


// 2. element.insertAdjacentElement -> Thêm element vào
const p = document.createElement("p");
p.innerText = "Lê Duy Quân";
const h4 = document.querySelector("h4")
h4.insertAdjacentElement("beforebegin", p);

// 3. element.insertAdjacentHTML -> Thêm 1 đoạn HTML vào
const template = `
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
`

document.body.insertAdjacentHTML("beforebegin",template)
