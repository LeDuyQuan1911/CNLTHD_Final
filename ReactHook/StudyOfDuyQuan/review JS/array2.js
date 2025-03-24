// Slice() -> Tạo ra một  mảng copy của mảng ban đầu
const animals = ["tiger","lion","horse","elephant"]
//slice() -> Tạo ra mảng mới y hệt mảng ban đầu
const animals2 = animals.slice()
console.log(animals2)

//slice(start,end) -> Tạo ra mảng mới lấy phần tử có index từ start->end-1
const animals3 = animals.slice(1,3)
console.log(animals3) // ['lion', 'horse']


// Splice
console.log("-----Splice-----")
// Splice -> Nó sẽ xóa phần tử trong mảng hoặc thay thế phần tử trong mảng
const pets = ["dog","cat","bird","dragon"]
// Splice(start)
const pets2 = pets.splice(0) // Buộc phải có số 0, nếu có số không thì không khác gì slice(), nếu splice(number) thì sẽ lấy giá trị từ number trở về sau
console.log(pets2)
// Splice(start, deleteCount) : x   deleteCount là số lượng phần tử muốn xóa hoặc thay thế
const pets3 = pets.splice(0,1) // bắt đầu tử phần tử số 0 và xóa đi 1 phần tử
console.log(pets3)

const pet4 = ["dog","cat","bird","dragon"]
pet4.splice(2,0,"x","y")
console.log(pet4)


// sort
console.log("-----sort-----") 
// Solice: Sắp xếp các phần tử trong mảng theo chuẩn unicode-16
const random = [1,9999,10,5,9]
console.log(random.sort()) // [1, 10, 5, 9, 9999]
// sort(function(a,b))
const random2 = random.sort(function(a,b){
    if(a>b) return 1 // 1: là sắp xếp tăng dần
    else return -1 // -1: là sắp xếp giảm dần
})

const random3 = random.sort((a,b)=>{
    a > b ? 1 : -1;
})

console.log(random2)
console.log(random)

console.log("-----find-----") 

// find: nó sẽ trả về phần tử đầu tiên thỏa điều kiện nào đó
const numbers = [1,9999,1000000,5,9];
// VD: tìm phần tử đầu tiên lớn hơn 10
const findYourNumber = numbers.find((element, index) => {
    return element > 10
})
const findYourNumber2 = numbers.find((element, index) => {
    return element > 100000000000
})
console.log(findYourNumber) // kq : 9999 
console.log(findYourNumber2) // kq : undefined 
console.log(numbers) // [1,9999,1000000,5,9];


console.log("-----findIndex-----") 
// findIndex: trả về chỉ số của phần tử đầu tiên thỏa mãn điều kiện
const findIndex= numbers.findIndex((element,index) => {
    return element > 10
})
console.log(findIndex) // 1
// index ở đây của giống như index của find(), nó được dùng để sử dụng trong condition chứ không phải để return, findIndex chỉ return ra index và find thì chỉ return ra element

console.log("-----map-----") 
// map() được sử dụng để duyệt qua các phần tử trong mảng và trả về một mảng mới, mảng ban đầu không thay đổi
const listNumber = [1,2,3,4,5];
const listNumberDouble = listNumber.map((element,index,array)=>{ // array ở đây là mảng ban đầu
    return element * 2
})
console.log(listNumberDouble) // [2, 4, 6, 8, 10]
console.log(listNumber) // [1, 2, 3, 4, 5]

console.log("-----forEach-----") 
// forEach được sử dụng để duyệt qua các phần tử trong mảng, nhưng không có return, không có thể dừng cho forEach và tạo ra mảng mới -> thường được dùng trong DOM
const listNumber2 = [1,2,3,4,5];
const listNumberDouble2 = listNumber.map((element,index,array)=>{ // array ở đây là mảng ban đầu
    return element * 2
})
console.log(listNumberDouble) // undefined

console.log("-----Filter-----") 
// Filter: duyệt qua các phần tử trong mảng thỏa điều kiện ra trả về một mảng mới và không thay đổi mảng cũ
const listNumber3 = [1,2,3,4,5];
const greaterThanThree = listNumber3.filter((e,index)=>{
    return e > 3
})
console.log(greaterThanThree) // [4, 5]
console.log(listNumber3) // [1, 2, 3, 4, 5]


console.log("-----some-----") // trả về true/false
// Trả về True khi thỏa 1 điều kiện và trả về false khi không thoải điều kiện nào
const listNumber4 = [1,2,3,4,5];
const checkSome = listNumber4.some((value)=>{
    return value > 3
})
console.log(checkSome) // true

const checkSome2 = listNumber4.some((value)=>{
    return value > 6
}) 
console.log(checkSome2) // false
console.log(listNumber4) // không thay đổi mảng

console.log("-----every-----") // trả về true/false
// trả về True khi thỏa hết tất cả điều kiện và trả về False khi không thỏa 1 điều kiện
const checkEvery1 = listNumber4.every((value)=>{
    return value > 0
})
console.log(checkEvery1) // true

const checkEvery2 = listNumber4.every((value)=>{
    return value > 2
}) 
console.log(checkEvery2) // false
console.log(listNumber4) // không thay đổi mảng

console.log("-----reduce-----") // trả về true/false
// reduce: gom các phần tử trong mảng thành 1
// .reduce((accumulator, currentValue, index, array)=>{}, initialize value)
// accumulator: giá trị tích lũy sau mỗi lần lặp qua mảng
// currentValue: Phần tử hiện tại trong mảng mà callback xử lí
// index: vị trí của phần tử trong mảng
// array: mảng ban đầu
// initialize value: giá trị khởi tạo cho accumulator 
const listNumber5 = [1,2,3,4,5];
const totalNumber = listNumber5.reduce((a,b,i,array)=>{
    if(b%2==0){
        console.log(b);
        return a + b
    }
    return a;

},10)
console.log(totalNumber) // 2 - 4 - 16
console.log(listNumber5) //[1, 2, 3, 4, 5]

