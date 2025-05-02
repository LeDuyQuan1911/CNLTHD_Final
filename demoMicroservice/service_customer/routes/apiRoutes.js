const express = require('express'); 
const routerAPI = express.Router();
const {    postCustomer,getCustomer,updateCustomer, deleteCustomer} = require('../controller/customerController'); // import controller
const apiRoutes = (app) => { 

    routerAPI.post('/customer',postCustomer); // tao moi sach
    // routerAPI.post('/activation',activation); // tao moi sach
    routerAPI.get('/customer',getCustomer); // tao moi sach
    routerAPI.put('/customer',updateCustomer); // tao moi sach
    routerAPI.delete('/customer',deleteCustomer); // tao moi sach

    app.use("/v1/api/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;