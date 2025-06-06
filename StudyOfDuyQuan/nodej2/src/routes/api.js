const express = require('express'); // import express
const routerAPI = express.Router();

const { expressjwt: jwt } = require("express-jwt");
const authRoutes = require("../routes/auth");


const {getUsersAPI, postUsersAPI, putUsersAPI, deleteUsersAPI, postUploadSingleFile, postUploadMultipleFiles, } = require('../controllers/apiController'); // import apiController
const { postCreateCustomer, postCreateManyCustomer, getAllCustomer, updateCustomer, deleteCustomer, deleteCustomers } = require('../controllers/customerController');
const { data } = require('autoprefixer');
const { postCreateProject, postCreateTask, getProject, updateProject, deleteProject, deleteProjectUsers } = require('../controllers/apiProjectController');
const SECRET_KEY = "q3r#7sG!8fL09p*7h";
const apiRoutes = (app) => { // Tao type Express giup goi y cac method cho app

    routerAPI.use("/auth", authRoutes); // Đây là nơi bạn kết nối auth.js với API
    // Middleware kiểm tra JWT – các route phía dưới đều yêu cầu token
    routerAPI.use(
        jwt({ secret: SECRET_KEY, algorithms: ["HS256"] }).unless({
            path: ["/v1/api/auth/login"]
        })
    );

    routerAPI.get('/users', getUsersAPI)
    routerAPI.post('/users', postUsersAPI)
    routerAPI.put('/users', putUsersAPI)
    routerAPI.delete('/users', deleteUsersAPI)
    routerAPI.post('/file', postUploadSingleFile)
    routerAPI.post('/files', postUploadMultipleFiles)

    // Customer
    routerAPI.post('/customers', postCreateCustomer)
    routerAPI.post('/customers-many', postCreateManyCustomer)
    routerAPI.get('/customers', getAllCustomer)
    routerAPI.put('/customers', updateCustomer)
    routerAPI.delete('/customers', deleteCustomer)
    routerAPI.delete('/customers-many', deleteCustomers)

    routerAPI.get('/info', (req, res) => {
        let result = req.query
        res.status(200).json({
            message: 'Hello world',
            errorCode: 0,
            data: result
        })
    })

    routerAPI.get('/info/:name/:city', (req, res) => {
        let {name, city} = req.params
        let result = {
            name: name,
            city: city
        }
        res.status(200).json({
            message: 'Hello world',
            errorCode: 0,
            data: result
        })
    })

    // Project
    routerAPI.post('/create-project', postCreateProject )
    // routerAPI.post('/create-task', postCreateTask )
    routerAPI.get('/projects', getProject )
    routerAPI.put('/projects', updateProject )
    routerAPI.delete('/projects', deleteProject )
    routerAPI.delete('/project-users', deleteProjectUsers )


    app.use("/v1/api/", routerAPI); // tat cac url se bat dau bang / o day
}

module.exports = apiRoutes;