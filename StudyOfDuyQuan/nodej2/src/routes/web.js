const express = require('express'); // import express
const { getHomePage, getUpdatePage,postUpdatePage, postDeleteUser } = require('../controllers/homeController');
const {getCreateUser, postCreateUser} = require('../controllers/createUserController');
// import { getCreateUserPage, getHomePage, postCreateUserPage } from '../controllers/user.controller';
const router = express.Router();

const webRoutes = (app) => { // Tao type Express giup goi y cac method cho app
    router.get('/', getHomePage);
    router.get('/create', getCreateUser)
    router.post('/create-user', postCreateUser)
    router.get('/update/:id', getUpdatePage)
    router.post('/update/:id', postUpdatePage)
    router.get('/delete/:id', postDeleteUser) // Xoa user
    // router.post('/handle-create-user', postCreateUserPage)
      
    app.use("/", router); // tat cac url se bat dau bang / o day
}

module.exports = webRoutes;