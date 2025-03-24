// 1.  Đảo ngược một chuỗi. Ví dụ: "My name is evondev" -> "evondev is name My"
const changeName = function (initString=" ") {
    // const mang = initString.split(" ");
    // mang.reverse()
    // return mang.join(" ")
    return initString.split(" ").reverse().join(" ")
}

console.log(changeName("My name is evondev"))

// 2.  Đảo ngược một chuỗi bao gồm các kí tự. Ví dụ: "i love " -> "evol i"
const changeName2 = function(initString = " "){
    const mang = initString.split(" ") // ["i","love"]
    const mang2 = mang.map((e)=>{
        return e.split("").reverse().join("") // ["i","evol"]
    })
    return mang2.join(" ")
}

console.log(changeName2("My name is evondev"))

// 3. In hoa chữ cái đầu trong chữ ví dụ: "my name is evondev" -> "My Name Is Evondev";
const Capitalize = (str=" ") =>{
    const mang = str.split(" ")
    const mang2 = mang.map((e)=>{
        return e.charAt(0).toUpperCase() + e.slice(1)
    })
    return mang2.join(" ")
}

console.log(Capitalize("le duy quan"))

