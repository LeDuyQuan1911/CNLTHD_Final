// By value and By refference
// by value -> giá trị thực sự được lưu trong vùng nhớ ( Number, String, Boolean, null, undefined, Symbol, BigInt )
const num1 = 1;
const num2 = 2;
console.log(num1===num2) // true

let a = 10;
let b = a;  // Giá trị của `a` được sao chép vào `b`

b = 20;  
console.log(a); // 10 (Không bị ảnh hưởng)
console.log(b); // 20



// by refference -> Object, Array, function bị ảnh hưởng
const arr1 = [1, 2]
const arr2 = [1, 2]
// console.log(arr1 = arr2) // false

let obj1 = { name: "Alice" };
let obj2 = obj1;  // `obj2` tham chiếu đến cùng một vùng nhớ với `obj1`

obj2.name = "Bob";
console.log(obj1.name); // "Bob" (Bị ảnh hưởng)
console.log(obj2.name); // "Bob"

// Cách so sánh mảng:
// JSON: Javascript Object Notation
// JSON.stringify(value) -> convert giá trị sang dưới dạng JSON string
// JSON.parse

// toString()
// [1,2,3].toString() -> "1,2,3"
// JSON.stringify([1,2,3]) -> "[1,2,3]"
// JSON.parse("[1.2,3]") -> [1,2,3]
// Cách so sánh 2 mảng với nhau
let arr3 = [1, 2, 3];
let arr4 = [1, 2, 3];

console.log(arr3 === arr4); // false (Vì chúng là 2 đối tượng khác nhau)
console.log(arr3 == arr4);  // false
let arr5 = [1, 2, 3];
let arr6 = arr1;

console.log(arr5 === arr6); // true (Cùng tham chiếu vùng nhớ)

// Cách 1 Đơn giản, nhưng không hoạt động với mảng chứa object
let arr7 = [1, 2, 3];
let arr8 = [1, 2, 3];

console.log(JSON.stringify(arr7) === JSON.stringify(arr8)); // true

// Cách 2 Chính xác hơn

function arraysEqual(arr1,arr2){
    return arr1.every((e,index)=>{
        e = arr2[index]
    })
}

console.log(arraysEqual([1, 2, 3], [1, 2, 3])); // true
console.log(arraysEqual([1, 2, 3], [3, 2, 1])); // false

// Cách 3: So sánh mảng bất kể thứ tự
function arraysEqualUnordered(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.slice().sort().toString() === arr2.slice().sort().toString();
}

console.log(arraysEqualUnordered([1, 2, 3], [3, 2, 1])); // true
console.log(arraysEqualUnordered([1, 2, 3], [1, 2, 4])); // false

// 2 Cách để clone mảng
// 1: Sử dụng .slice()
const mang1 = [1,2,3]
const mang2 = mang1.slice()
console.log(mang2) //[1,2,3]
// 2: Spread operator
const arrayy1 = [1,2,3]
const arrayy2 = [...arrayy1]
console.log(arrayy1) //[1,2,3]


// 2 Cách gộp mảng
// [1,2] [3,4] [5,6] -> [1,2,3,4,5,6]
// 1. Concat
const arra1 = [1,2]
const arra2 = [3,4]
const arra3 = [5,6]
const mergeArray = arra1.concat(arra2,arra3)
console.log(mergeArray) // [1, 2, 3, 4, 5, 6]
console.log(arra2) // [3, 4]

const mergeArray2 = [...arra1,...arra2,...arra3]
console.log(mergeArray2) // [1, 2, 3, 4, 5, 6]

// Destructuring Array
console.log("-----Destructuring Array-----")
const toys = ["ball","sword","arrow","magic","water","fire"]
const x = toys[1];
const y = toys[2];
const z = toys[3];
console.log(x,z,z) // -> Tốn thời gian, thiếu chuyên nghiệp

const [dochoi1,dochoi2,dochoi3] = toys
console.log(dochoi1,dochoi2,dochoi3)

//bỏ qua phần tử không cần thiết
const [first, , third , , fifth] = toys
console.log(first, third, fifth)

// sử dụng ...rest để lấy các phần tử còn lại
const [so1,so2,...conlai] = toys
console.log(so1,so2,conlai) // ball - sword - ['arrow', 'magic', 'water', 'fire']

// gán giá trị mặc định
const number2 = [10]
const [bien1,bien2 = 20] = number2
console.log(bien1,bien2) // 10 - 20

// Hoán đổi bị trí giữa 2 biến
let bien11 = 11;
let bien22 = 22;
[bien11,bien22] = [bien22,bien11]
console.log(bien11,bien22) // 22 - 11

// Lấy giá trị từ hàm trả về
function getCoordinates() {
    return [10, 20];
}

let [xx, yy] = getCoordinates();

console.log(xx); // 10
console.log(yy); // 20

// Btap 1 : sao chép mảng bằng vòng lặp for

const mangg1 = [1,2,3,4,5]
const mangg2 = []
for(let i = 0 ; i < mangg1.length; i++){
    mangg2[i] = mangg1[i]
}
console.log(mangg2)


// Btap 2 : Đảo ngược từ "i love" -> " evol i"

const chuoi = "i love"
const tachchuoi = function (chuoi) {
    const mangChuoi = chuoi.split(" ") // ["i","love"]
    for(let i = 0 ; i < mangChuoi.length ; i++){
        mangChuoi[i] = mangChuoi[i].split("").reverse().join("")
        console.log(mangChuoi[i])
    }
    return mangChuoi.join(" ")
}

console.log(tachchuoi("i love"))

// while(condition){}
// for of
for( let value of mangg1){
    console.log(value)
}

// Btap:
// 1. cho 1 mảng gồm nhiều giá trị [1,1000,false, null,"evondev","",undefined,"javascript",[1,2,3],NaN]. Viết chương trình loại bỏ các giá trị falsy ra khỏi chương trình và giữ lại các giá trị truthy
const mangBtap1 = [1,1000,false, null,"evondev","",undefined,"javascript",[1,2,3],NaN]
const mangResultBtap1 = []
for(let i = 0 ; i < mangBtap1.length ; i++){
    if(Boolean(mangBtap1[i])){
        mangResultBtap1.push(mangBtap1[i])
    }
}
console.log(mangResultBtap1)

const filterFalsy = mangBtap1.filter((item)=>Boolean(item))
console.log(filterFalsy)

// 2. Cách chuyển nhiều mảng thành 1 mảng [[1,2,3,[false,null]],1,5,6]
const complexArray = [[1,2,3,[false,null]],1,5,6]
const result = complexArray.flat(2)
console.log(result) //  [1, 2, 3, false, null, 1, 5, 6]
console.log(complexArray) // Không thay đổi giá trị ban đầu

// 3. Đảo ngược số nguyên. Ví dụ 1234 -> 4321, -567 ->-765
// Math.sign(number) -> Nếu số nguyên dương return 1, số nguyên âm return -1
// Math.sign(123) -> 1
// Math.sign(-123) -> -1

function reverseNumber(number) {
    const value = parseInt(String(number).split("").reverse().join("")) * Math.sign(number)
    return value
}
console.log(reverseNumber(-4321))

// 4. Kiểm tra số vowels có trong chuỗi
function countVowels(string) {
    let count = 0
    const characters = "ueoai"
    for( let value of string.toLowerCase()){
        if(characters.includes(value)){
            count++;
        }
    }
    return count;
}
console.log(countVowels("evondev")) // 3

// 5. Viết một function trả về một mảng chỉ chứa giá trị unique
function unique(arr) {
    const result = []
    for(let i = 0 ; i < arr.length; i++){
        if(!result.includes(arr[i])){
            result.push(arr[i])
        }
    }
    return result;
}

console.log(unique([1,2,3,1,1,1,4,2,2,6,4,2,8]))

//7. Viết một function xử lí từ 1 mảng lớn thành nhiều mảng con dựa vào một số nguyên đầu vào. Vi dụ
// ([1,2,3,4,5],2) -> [[1,2],[3,4],[5]]