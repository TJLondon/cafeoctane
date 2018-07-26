import express from 'express';
import FacebookRoutes from '../auth/social/FacebookStrategy';

const FacebookRouter = express.Router();

function redirectSocialUser() {
    console.log('redirected');
}

FacebookRouter.get("/login/facebook", FacebookRoutes.authenticate() );
FacebookRouter.get( "/callback/facebook", FacebookRoutes.callback(), redirectSocialUser );

export default FacebookRouter;