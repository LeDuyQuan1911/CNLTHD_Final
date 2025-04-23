const express = require('express'); 
const routerAPI = express.Router();
const {    postOrder,
    getOrder,
    updateOrder,
    deleteOrder} = require('../controller/orderController'); // import controller
const apiRoutes = (app) => { 

    routerAPI.post('/order',postOrder); // tao moi sach
    routerAPI.get('/order/:id',getOrder); // tao moi sach
    routerAPI.put('/order',updateOrder); // tao moi sach
    routerAPI.delete('/order',deleteOrder); // tao moi sach

    app.use("/v1/api/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;