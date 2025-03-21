// So nguyen: 1 2 3 999 33 444
// So thap phan: 3.4, 5.8 
console.log(5 + 7);
console.log(typeof 10);
const number1 = "5";
const number2 = "4.8";

// Chuyen tu string sang number
console.log(parseInt(number1))
console.log(parseFloat(number2)) 

const number3 = -10;

// Math.abs(value) => Gia tri tuyet doi
console.log(Math.abs(number3))

// Math.floor(value) => Lam tron xuong
console.log(Math.floor(6.7))

// Math.ceil(value) => Lam tron len
console.log(Math.ceil(2.2))

// Math.round(value) => Lam tron den so gan han / Duoi .5 thi lam trong xuong, Tu .5 tro len thi lam tron len
console.log(Math.round(4.3))

// toFixed(number) => Hien thi so luong so sau dau phay cua so thap phan, nhung bien thanh string
console.log(1/3)
console.log(parseFloat((1/3).toFixed(2)))

// Math.random() => Chay tu 0 -> 1
console.log(Math.ceil(Math.random()*10))

// Math.max(number1, number2, number3,...) => tim ra so lon nhat
console.log(Math.max(1,3,6,2))

// Math.min(number1, number2, number3,...) => tim ra so nho nhat
console.log(Math.min(1,3,6,2))
console.log(`Max: ${Math.max(1,3,6,2,4,8)}`)

// Math.pow(so goc, so mu)
console.log(Math.pow(3,2)) // kq:9

// isNaN(value) va Number.isNaN(value)
// Nan : not a number
console.log(isNaN("this is a string")); //kq: true
console.log(isNaN("12345")) //kq: false
// const isNaN = function (value) {
//     const n = Number(value)
//     return n !== n
// }

// Number(value)
console.log(Number("4.5"))
console.log(Number("4"))
console.log(Number("abc")) // NaN
console.log(Number(NaN)) // NaN
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0
console.log(Number(true)) // 1
console.log(Number(false)) // 0

// String: khong giong number, String se chuyen moi thu sang String
console.log(String(4.5)) // "4.5"
console.log(String(undefined)) // undefined
console.log(String(null)) // null
console.log(String(false)) // false