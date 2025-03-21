// String ( chuỗi )
// "Hello world"
// "My name is Le Duy Quan"
// 'I am Le Duy Quan'
// `i am a developer`
// double quotes, single quote, backticks ( template literal )
const name = "Evondev"
console.log(name);
console.log(typeof name)
console.log(`Tên tôi là ${name} và tôi học đhsg
và tôi là sinh viên nắm cuối
`)

// length
console.log(name.length)

// index, length, split, toLowerCase, toUpperCase, startsWith, endsWith, includes, indexOf, replace, repeat, slice
const myStr = "Fontend Developer";
console.log(myStr.split(" ")) // ["Fontend", "Developer"]
console.log(myStr.split("")) // ["F","O","N","t"]
console.log(myStr.split("/")) // ["Fontend Developer"]
console.log(myStr.toLowerCase())
console.log(myStr.toUpperCase())

// startsWith => Kiem tra chuoi co bat dau voi chu trong ("")
console.log(myStr.startsWith("fontend")) /* Co phan biet chu hoa, chu thuong */

// endsWith => Kiem ra chuoi co ket thuc voi chu trong (" ")
console.log(myStr.endsWith("developer")) 

// includes => Kiem tra co chua chu do trong chuoi khong
console.log(myStr.includes("Deve")) 

// indexOf => tim ra vi tri cua phan tu
console.log(myStr.indexOf("o", 2)) // indexOf("String", number)

// lastIndexOf => tim ra vi tri cuoi cung cua phan tu
console.log(myStr.lastIndexOf("o"))

// replace => dung de thay the chuoi
console.log(myStr.replace("Developer","Designer"))

// repeat => lap lai chuoi
console.log(myStr.repeat(5))

// slice => Tao ra chuoi moi (string) va cat theo y muon
console.log(myStr.slice(3, 5))
console.log(myStr.slice(0)) // in ra chuoi hien tai 

// trim => loai bo khoang trong cac ben 
console.log(myStr.trim())
console.log(myStr.trimStart())
console.log(myStr.trimEnd())
console.log(myStr.charAt(3)) // lay ra ki tu theo index


// substr and substring
// substr => lay ra 1 phan cua chuoi 
// substring => lay ra cac ki tu cua chuoi 
console.log(myStr.substr(1,5))

// Cach su dung nhieu method chung
const myStr3 = "  Frontend Developer D  "
// Loai bo khoang trong 2 ben va dua tat ca ve in hoa
console.log(myStr3.trim().toUpperCase().replace("DEVELOPER D","Developer and Designer"))