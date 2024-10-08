import { Router } from "express";
import validateJOI from '../middlewares/validateJOI.js';
import { userSchema, signinSchema } from "../joi/schemas.js";
import { signUp, signIn, me, logout } from "../controllers/auth.js";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware.js";

const authRouter = Router();

authRouter.route('/signup').post(validateJOI(userSchema), signUp);
authRouter.route('/signin').post(validateJOI(signinSchema), signIn);
authRouter.route('/me').get(verifyTokenMiddleware, me);
authRouter.route('/logout').get(verifyTokenMiddleware, logout);

export default authRouter;