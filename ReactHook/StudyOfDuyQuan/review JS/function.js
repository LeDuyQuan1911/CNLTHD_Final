let sum = function( a = 0, b = 0){
    console.log ( a + b )
}

sum(1,2)

function average(a,b,fn) {
    kq = sum(a,b)
    return kq/2
}

// declaration function
// anonymous function
// IIFE -> immediately invoked function execution
(function name(params) {
    
}()) // Function nay se thuc thi ngay ma khong can goi

// anonymous function
const spare1 = function(x){
    return x
}

const spare2 = (x) => {
    return x
}