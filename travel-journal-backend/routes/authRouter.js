import { Router } from "express";
import validateJOI from '../middlewares/validateJOI.js';
import { userSchema } from "../joi/schemas.js";
import { signUp, signIn, me } from "../controllers/auth.js";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware.js";

const authRouter = Router();

authRouter.route('/signup').post(validateJOI(userSchema), signUp);
authRouter.route('/signin').post(validateJOI(userSchema), signIn);
authRouter.route('/me').get(verifyTokenMiddleware, me);

export default authRouter;