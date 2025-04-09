// buoc 0: cai dat express: npm i --save-exact express@5.0.1                        
// buoc 1: pm i --save-exact --save-dev typescript@5.7.3 @types/express@5.0.0 @types/node@18.17.0
// typescript -> cai dat thu vien de dich typescript sang javascript
// @types/express -> cai dat thu vien de goi y code type cho express
// @types/node -> cai dat thu vien de goi y code type cho nodejs

// buoc 2: npx tsc --init: tao file tsconfig.json -> de tao config cho typescript

// buoc 3: tao file co tuoi ts

// buoc 4: chay npx tsc: chay file ts sang js
// buoc 5: chay node dist/ungdung.js chay file js

// buoc 6: vao tsconfig.json -> chinh sua cac thuoc tinh -> chinh rootDir: src -> muc dich chay file ts trong src

// buoc 7: vao package.json -> chinh sua cac thuoc tinh -> chinh scripts: 
    // "start": "tsc && node dist/app.js",
    // "dev": "tsc && node dist/app.js"

// buoc 8: cai dat thu vien npm i --save-exact --save-dev nodemon@3.1.9 ts-node@10.9.2
// nodemon: tu dong chay lai ung dung khi co thay doi trong file ts
// ts-node: chay file ts khong can phai bien dich sang js
// -> Co nghia ra bay gio khong can phai chay folder dist nua, chi can chay file ts la duoc
// -> Bay gio khong can chay lai server nua, chi can luu file ts la duoc thi server tu dong chay lai

// buoc 9: vao package.json -> them dependencies -> nodemonConfig
// "nodeonConfig": {
//     "watch": [
//       "src" // dung de nodemon theo doi cac file thay doi trong thu muc src
//     ],
//     "ext": "ts", // theo doi cac file co duoi ts
//     "ignore": [
//       "node_modules" // khong theo doi cac file trong thu muc node_modules
//     ],
//     "exec": "ts-node ./src/app.ts" -> thuc thi file code ts luon 
//   },

// buoc 10: thay doi package.json -> chinh sua cac thuoc tinh -> chinh scripts:
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     // "start": "tsc && node dist/app.js",
//     // "dev": "tsc && node dist/app.js"
//     "start": "nodemon",
//     "dev": "nodemon"
//   },

// buoc 11: cai thu vien env: npm install --save-exact dotenv@16.4.7

// buoc 12: cau hinh template engine: npm i --save-exact ejs@3.1.9

// buoc 13: cai dat ejs npm install --save-exact ejs@3.1.10
// npm i --save-exact --save-dev @types/ejs@3.1.5

// buoc 14: cai dat Routes
// tao folder routes -> tao file web.ts -> tao cac route cho ung dung
// VD:
// import express, {Express} from 'express';
// const router = express.Router();

// const webRoutes = (app:  Express) => {
//     router.get('/', (req, res) => {
//         res.render('home.ejs');
//       });
      
//     router.get('/api', (req, res) => {
//         res.send('Hello from API!');
//     });
      
//     app.use("/", router);
// }

// export default webRoutes;

// sang app.ts config lai de su dung route
// import webRoutes from "./routes/web";
// webRoutes(app);

//buoc 15: config static folder
// tao folder public -> chua cac file css, js, image
// trong app.ts them phan config static folder
// VD: app.use(express.static("public"))


// buoc 16: them vao package.json
// "start:debug": "nodemon --inspect=9229 -e ts,tsx --exec node -r ts-node/register ./src/app.ts"

// buoc 17: cai dat thu vien mysql2