import { Request, Response } from 'express';
import { getAllUsers, handleCreateUser } from '../services/user.service';
const getHomePage = async (req :Request,res:Response) => {
    const users = await getAllUsers(); // get all users from database

    return res.render('home.ejs',{
        users:users
    });
}

const getCreateUserPage = async (req :Request,res:Response) => {
    return res.render('create-user.ejs');
}

const postCreateUserPage = async (req :Request,res:Response) => {
    console.log("checkdata", req.body); // check data in console
    const {name, email, address} = req.body; // destructuring
    await handleCreateUser(name, email, address)
    return res.redirect('/');
}

export {getHomePage, getCreateUserPage, postCreateUserPage}; 

