import express, {Express} from 'express';
import { getCreateUserPage, getHomePage, postCreateUserPage } from '../controllers/user.controller';
const router = express.Router();

const webRoutes = (app: Express) => { // Tao type Express giup goi y cac method cho app
    router.get('/', getHomePage)
    router.get('/create-user', getCreateUserPage)
    router.post('/handle-create-user', postCreateUserPage)
      
    app.use("/", router); // tat cac url se bat dau bang / o day
}

export default webRoutes;