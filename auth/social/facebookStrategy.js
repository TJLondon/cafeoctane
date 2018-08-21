import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import config from '../../config';
import funct from '../users/functions';

passport.use(new FacebookStrategy({
        clientID: config.facebook.appid,
        clientSecret: config.facebook.secret,
        callbackURL: config.facebook.callback,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)']
    },

    (req, accessToken, refreshToken, profile, done) => {
    console.log(profile._json);
        funct.facebookReg(profile._json)
            .then(function (user) {
                if (user) {
                    console.log("LOGGING IN AS: " + user.email);
                    req.session.success = 'You are successfully logged in ' + user.email + '!';
                    next(null, user);
                }
                if (!user) {
                    console.log("USER/TOKEN did not match");
                    req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            });
        done(null, profile.id);
    }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

let FacebookRoutes = {
    authenticate: () => {
        return passport.authenticate('facebook');
    },
    callback: () => {
        return passport.authenticate('facebook', {
            successRedirect: '/auth/verified',
            failureRedirect: '/register',
            failureFlash: true
    });
    }
};

export default FacebookRoutes;
