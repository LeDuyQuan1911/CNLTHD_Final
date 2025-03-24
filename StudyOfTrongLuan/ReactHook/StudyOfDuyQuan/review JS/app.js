console.log("hello world");
// Biến -> Variable
// camelCase -> leduyquan -> leDuyQuan
// i love my school -> iLoveMySchool
// không tên đặt tên tiếng việt, hoặc có dấu, hoặc các kí tự đặc biệt, các từ hệ thống, tentoi, toila, canhgiua,...

// Delcare variable : Khai báo biến
// const and let
const number = 100;
console.log(number);
// number = 200 /* Gấy ra lỗi */
let otherNumber = 100
console.log(otherNumber);
otherNumber = 200;
console.log(otherNumber)

//Hoisting
console.log(anotherNumber) 
const anotherNumber = 100; 
// Gấy ra lỗi do khai báo biến trước 

// Sự khác biệt giữa const và let: const dùng để khai báo một lần, let dùng cho biến có thể thay đổi giá trị
    let a = 100;
    if (true) {
        let a = 200;
        console.log(a); // 200 (biến trong block che khuất biến toàn cục)
    }
    console.log(a); // 100, điều này xảy ra do trong hàm if khai báo lại biến ra => biến a trong if khác với biến a trong global





