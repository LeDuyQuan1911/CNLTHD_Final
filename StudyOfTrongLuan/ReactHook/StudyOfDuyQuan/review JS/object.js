// Các cách khai báo object
// object literal
const objectLiteral = {}
// object constructor
const objectConstructor = new Object();
const student = {
    name : "Lê Duy Quân",
    "last-name" : "Quân",
    age : 22,
    male: true,
    hi: function () { // đây gọi là method
        console.log("hello Duy Quân")   
    }
}

student.hi() // function là phải có giấu ngoặc
console.log(student.name) // giá trị thì không cần


// Có 2 cách để truy xuất giá trị
// 2.1 Dot notation
console.log(student.name)
// 2.2 Bracket notation ["key"] -> Dùng cho các key có tên đặc biệt
console.log(student["last-name"])

const student2 = {
    name : "Lê Duy Quân 123"
}
student2.name = "Quân Đẹp Trai"
console.log(student2.name)

// Cách xóa key ra khỏi object
delete student["last-name"]

// Cách thêm key vào object
student.class = "CNTT"
student.hello = function() {
    console.log("hello")
}

// Cách lặp ra 1 object
// for in
console.log("-----For in -----");
for (let key in student){
    console.log(key)
    // cách truy xuất valie
    console.log(student[key]) // không cần dấu nháy đôi
}

console.log("-----Cách phương thức object-----")
// Object.keys(object) -> Trả về một mảng chứa tất cả các keys của object
const keys = Object.keys(student)
console.log(keys) // ['name', 'age', 'male', 'hi', 'class', 'hello']
console.log(keys.length) // 6


// Object.values(object) -> Trả về một mảng chứa tất cả các vales của object
const values = Object.values(student)
console.log(values) // ['Lê Duy Quân', 22, true, ƒ, 'CNTT', ƒ]
console.log(values.length) // 6

// Object.entries(object) -> Trả về một mảng chứa tất cả các keys và values của object -> trả về 1 mảng nested
const entries = Object.entries(student)
console.log(entries) // [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)] 
// ['name', 'Lê Duy Quân']
// ['age', 22]
// ...
console.log(entries.length) // 6

// Object.assign
const a = {
    firstName : "Quan"
}

const b = {
    lastName : "Le"
}
const  c = Object.assign(a,b) 
const  d = {...a,...b}
console.log(c) // {firstName: 'Quan', lastName: 'Le'}
console.log(d) // {firstName: 'Quan', lastName: 'Le'}

// Object.freeze(object) -> Đóng băng Object ( ngăn chặn chỉnh sửa, thêm bớt key và value của Object )
const car = {
    brand : "BMW"
}

const newCar = Object.freeze(car);
newCar.brand = "Audi"
newCar.newBrand = "Mazda"
console.log(newCar) // {brand: 'BMW'}

car.brand = "AuDi"
console.log(car) // {brand: 'BMW'}

// Object.seal(object) -> Ngăn chặn thêm, nhưng có thể chỉnh sửa
const user = {
    name : "Bill"
}
Object.seal(user)
user.hoTen = "Lê Duy Quân"
user.name = "Bill đẹp trai"
console.log(user) // {name: 'Bill đẹp trai'}

// Cách sao chép 1 object
const newUser = user;
newUser.xeMoi = "lamBo"
console.log(user) // Sẽ bị by referrence do lấy luôn cả bảng gốc
// Cách sao chép đúng
const newUser123 = {...user}
console.log(newUser123)

const newUser1234 = Object.assign({},user)
console.log(newUser1234)

// Cách sao chép cho các object có nested ( bới vì 2 cách kia dù sao chép nhưng object cấp 2, cấp 3 vẫn bị referrence )
const newUser12345 = JSON.parse(JSON.stringify(user))

// this keyword
// this dùng để truy xuất tới object gần nhất
const student3 = {
    name : "Lê Duy Quân",
    "last-name" : "Quân",
    age : 22,
    male: true,
    hi: function () { // đây gọi là method
        console.log(this)   
    },
    hi2: function () { // đây gọi là method
        console.log(`Tôi tên là ${this.name}`)   
    },
}
student3.hi() // {name: 'Lê Duy Quân', last-name: 'Quân', age: 22, male: true, hi: ƒ}
student3.hi2() // Tôi tên là Lê Duy Quân

// Optional changing
const student4 = {
    name : "Lê Duy Quân",
    "last-name" : "Quân",
    age : 22,
    male: true,
    hi: function () { // đây gọi là method
        console.log(this)   
    },
    hi2: function () { // đây gọi là method
        console.log(`Tôi tên là ${this.name}`)   
    },
    fullName : {
        name : "Lê Duy Quân siêu đẹp trai"
    }
}
console.log(student4.fullName) // undefinded
console.log(student4.fullName.name) // undefinded.name -> Cannot read properties of undefined
if(student4.fullName){ // Đây là cách check thông thường
    if(student4.name){
        console.log(student4.fullName.name)
    }
}
// student4.fullName?.name?
// Bước 1: Kiểm tra student4.fullName có tồn tại không
// Bước 2: Kiểm tra student4.fullName.name có tồn tại không
// Bước 3: Nếu có tồn tại thì lấy giá trị student4.fullName.nam
console.log(student4.fullName?.name)    


// Bài Tập
// 1. Viết 1 function kiểm tra value có phải là object hay không
const checkObject = function (object) { // chỉ có isArray chứ không có isObject
    for(let key in object){
        if(typeof object[key] === "object" && !Array.isArray(object)){
            return false
        }
    }
    return true
}
console.log(checkObject(student4))

// 2. {a:1,b:2} -> [["a",1],["b",2]]
function objectToArray(object) {
    const value = Object.keys(object).map((key) => [key,object[key]]);
}