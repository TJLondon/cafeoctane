import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import config from '../../config';

passport.use(new FacebookStrategy({
        clientID: config.facebook.appid,
        clientSecret: config.facebook.secret,
        callbackURL: config.facebook.callback
    },
    function(accessToken, refreshToken, profile, done) {
       console.log(profile);
       console.log(accessToken);
    }
));