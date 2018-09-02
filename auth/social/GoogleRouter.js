import express from 'express';
import passport from "passport/lib/index";
import GoogleRoutes from './GoogleStrategy';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const GoogleRouter = express.Router();

GoogleRouter.use(passport.initialize());
GoogleRouter.use(passport.session());
GoogleRouter.use(cookieParser("secret"));
GoogleRouter.use(bodyParser.json());
GoogleRouter.use(bodyParser.urlencoded({ extended: true }));

GoogleRouter.get('/login', GoogleRoutes.authenticate());
GoogleRouter.get('/callback', GoogleRoutes.callback());

export default GoogleRouter;