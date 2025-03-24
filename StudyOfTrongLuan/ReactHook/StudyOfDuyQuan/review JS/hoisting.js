{
    // Temporal Dead Zone: TDZ
const teacher = "evondev"
const teacherLearning = function(){
    console.log(teacher)
    const teacher = "evondev123"
}
teacherLearning();

// Proccess
/* 
    const teacher
    const teacherLearning
    teacher = "evondev"
    teacherLearning - function
    envoke teacherLearning 
    const teacher
    console.log(teacher)
    teacher = "evondev"
*/
// đặt biệt ở đây thì teacher ở global với trong scopt là 2 biến khác nhau
}

// khác với const và let thì var kết thúc TDZ ngay khi khởi tạo và khởi tạo giá trị mặc định là undefined
console.log(b)
var b = "Le Duy Quan"
// Process
/* 
    var b => b = undefined
    console.log(b)
    b = "Le Duy Quan"
    =>> Ket qua : undefined
*/