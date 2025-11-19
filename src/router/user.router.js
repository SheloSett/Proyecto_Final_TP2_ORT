import { Router } from "express";
import { apiUserController } from "../controller/user.controller.js";

const apiUserRouter = Router();

apiUserRouter
    .post('/login', apiUserController.login)
    .post('/register', apiUserController.signUp)

export default apiUserRouter;