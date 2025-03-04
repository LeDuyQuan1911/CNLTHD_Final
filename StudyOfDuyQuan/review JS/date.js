const now = new Date()
// built in Object ( da ton tai object san trong js )
console.log(now)
// Mon Feb 17 2025 17:44:26 GMT+0700 (Giờ Đông Dương)
// Timezone : GMT+0700
// Second: 26
// Minute: 44
// Hour: 17
// Year: 2025
// Month Fen
// Day: = 17
// Day of the week: Mon

// Timestamp and Epoch time ( 1/1/1970 )
// Unix time
console.log(now.getTime()) // timestamp tinh ra ket qua miliseconds, getTime ra timestamp cua ngay hien tai
console.log(new Date(0)) // ra timestamp cua ngay bat dau

// 4 cach su dung new Date()
// Cach 1: new Date() -> In ra ngay hien tai
console.log(new Date())
// Cach 2: new Date(timestamp) -> Dua vao timstamp de in ra ngay gio hien tai
console.log(new Date(1739790143331))
// Cach 3: new Date(date string) ->
console.log(new Date("Mon Feb 17 2025 18:02:23 GMT+0700 (Giờ Đông Dương)"))
// Cach 4: new Date( year, month, day , hours, minutes, seconds, miliseconds) // Months tinh tu so 0
console.log(new Date(1,2,12,2025,6,23,42))


// Cach ham get trong Date
const birthday = new Date(2025,1,17)

// getFullYear(): in ra nam
console.log(birthday.getFullYear()) // 1994

// getMonth(): in ra thang
console.log(birthday.getMonth())

// getDay(): in ra ngay trong tuan
console.log(birthday.getDay())

// In ra ngay thang nam
console.log(birthday.toDateString()) // Mon Feb 17 2025

// In ra gio phut giay
console.log(birthday.toTimeString()) // 00:00:00 GMT+0700 (Giờ Đông Dương)

// In ra m/d/yyyy
console.log(birthday.toLocaleDateString()) // 17/2/2025
console.log(birthday.toLocaleDateString("vi-VI")) // 17/2/2025


// Bai tap: cach in ra: 17/02/2025
// input: Mon Feb 17 2025 18:02:23 GMT+0700 (Giờ Đông Dương)
const myTime = new Date("Mon Feb 17 2025 18:02:23 GMT+0700 (Indochina Time)") // 17/2/2025
console.log(myTime)
const myYear = myTime.getFullYear()
const myMonth = myTime.getMonth();
const myDate = myTime.getDate();
console.log(myYear, myMonth, myDate)


