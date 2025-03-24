// 2 cach tao mang
// array literal
const newArray = [1,true,null,["le duy quan",3,false]]
// array constructor
const newArray2 = new Array()

// length: do dai cua mang, bat dau tu so 0, neu khong ton tai index thi kq: undefined
// cach lay phan tu cuoi cung trong mang
const student1 = ["evondev","tuan","nam","thanh","trung","tuan"]
console.log(student1.length - 1)

// reverse -> dao nguoc gia tri trong mang
// console.log(student1.reverse())

// join -> noi cac phan tu trong mang thanh chuoi
console.log(student1.join("-"))
console.log(student1)

// includes -> Kiem tra thu phan tu co nam trong mang hay khong
console.log(student1.includes("evondev")) // true


// indexOf -> Kiem tra vi tri cua phan tu
console.log(student1.indexOf("tuan"))


// lastIndexOf -> Kiem tra vi tri cuối cùng cua phan tu
console.log(student1.lastIndexOf("tuan"))

// push -> Thêm phần tử vào cuối của mảng
console.log(student1.push("java"))

// unshift -> Thêm phần tử vào đầu của mảng
console.log(student1.unshift("frontend"))

// pop -> Xóa phần tử cuối cùng trong mảng
console.log(student1.pop())

// shift -> Xóa phần tử đầu của mảng
console.log(student1.shift())

