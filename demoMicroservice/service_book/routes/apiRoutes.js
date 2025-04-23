const express = require('express'); 
const routerAPI = express.Router();
const {postBook, getBook, updateBook, deleteBook} = require('../controller/bookController'); // import controller
const apiRoutes = (app) => { 

    routerAPI.post('/book',postBook); // tao moi sach
    routerAPI.get('/book',getBook); // tao moi sach
    routerAPI.put('/book',updateBook); // tao moi sach
    routerAPI.delete('/book',deleteBook); // tao moi sach

    app.use("/v1/api/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;