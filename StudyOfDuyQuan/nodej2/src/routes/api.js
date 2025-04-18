const express = require('express'); // import express
const routerAPI = express.Router();

const {getUsersAPI} = require('../controllers/apiController'); // import apiController

const apiRoutes = (app) => { // Tao type Express giup goi y cac method cho app
    routerAPI.get('/', (req,res)=> { // tao route cho api
        console.log("API is running"); // khi goi api thi in ra API is running
        res.send("API is running"); // tra ve API is running 
    })
    routerAPI.get('/abc', (req,res)=> { // tao route cho api
        res.status(200).json({
            data: "abc",
        })
        res.send("API is running"); // tra ve API is running 
    })

    routerAPI.get('/users', getUsersAPI)


    app.use("/v1/api/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;