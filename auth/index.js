import express from 'express';
import FacebookRoutes from '../auth/social/FacebookStrategy';
import passport from 'passport';

const FacebookRouter = express.Router();

FacebookRouter.get('/facebook/callback', passport.authenticate('facebook'),
    function(req, res) {
    console.log(req);
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
    });

FacebookRouter.get("/login/facebook", passport.authenticate('facebook'));
export default FacebookRouter;