import express from 'express';
import FacebookRoutes from './facebookStrategy';
import passport from "passport/lib/index";

const FacebookRouter = express.Router();

FacebookRouter.use(passport.initialize());
FacebookRouter.use(passport.session());

FacebookRouter.get('/login/facebook', FacebookRoutes.authenticate(), () => {
    console.log('here');
    res.send('bosh');
});

FacebookRouter.get('/facebook/callback', FacebookRoutes.callback(), (req, res) => {
    res.send('complete');
});

export default FacebookRouter;