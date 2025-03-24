// Function con co the truy xuat scope cua function cha
function sayHello(){
    let message = "hi"
    function sayHi(){
        console.log(message);
    }
    return sayHi
}

let hello = sayHello();
hello()

function sayHello3(message){
    return function hiYourName(name){
        console.log(`${message} ${name} `)
    }
}

let returnName = sayHello3("Gửi lời chào đến")
returnName(" Duy Quân")
let leduyquan = sayHello3("Gửi lời chào đến")(" Duy Quân")

function sum(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a+b+c+d;
            }
        }
    }
}

console.log(sum(1)(2)(3)(4)); // 20


