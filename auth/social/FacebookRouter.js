import express from 'express';
import FacebookRoutes from './facebookStrategy';
import passport from "passport/lib/index";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const FacebookRouter = express.Router();

FacebookRouter.use(passport.initialize());
FacebookRouter.use(passport.session());
FacebookRouter.use(cookieParser("secret"));
FacebookRouter.use(bodyParser.json());
FacebookRouter.use(bodyParser.urlencoded({ extended: true }));

FacebookRouter.get('/login', FacebookRoutes.authenticate());
FacebookRouter.get('/callback', FacebookRoutes.callback());

export default FacebookRouter;