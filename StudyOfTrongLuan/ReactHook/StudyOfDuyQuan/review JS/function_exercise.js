// So sanh 2 so
function sosanh(a,b) {
    if(typeof a !== "number" || typeof b !== "number")
        return `vui long nhap gia tri so`
    if(a>b)
        return `so ${a} co gia tri lon hon`
    else
        return `so ${b} co gia tri lon hon`
}

// function compare(a,b) {
//     return Math.max(a,b)
// }


// let a = prompt("Nhap vao so a")
// let b = prompt("Nhap vao so b")
// console.log(sosanh(a,b))
// alert(sosanh(a,b))


// //  In hoa chu cai dau tien
// let name = prompt("Nhap vao ten cua ban");
// let mangTen = name.split(" ");
// for(let i = 0; i < mangTen.length; i++){
//     mangTen[i] = mangTen[i].toLowerCase();  // Chuyển toàn bộ thành chữ thường
//     mangTen[i] = mangTen[i].charAt(0).toUpperCase() + mangTen[i].slice(1);  // Viết hoa chữ cái đầu
// }
// console.log(mangTen.join(" "));  // Ghép lại thành chuỗi

// viet callback
function hehe(a,b,fn) {
    let max = sosanh(a,b)
    console.log(typeof a)
    fn(max)
}

function inSoMax(max) {
    console.log(max)
}

hehe(3,5,inSoMax)

// closure la function cha return ve function con, con callback chi don gian la goi function khac thoi

// arrow function