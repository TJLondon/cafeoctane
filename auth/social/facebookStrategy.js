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
        funct.registeruser(
            profile._json.first_name,
            profile._json.last_name,
            profile._json.email,
            profile._json.id,
            profile._json.picture.data.url,
            "facebook",
            profile._json
        )
            .then(function (user) {
                if (user) {
                    console.log("LOGGING IN AS: " + user.email);
                    //req.session.success = 'You are successfully logged in ' + user.email + '!';
                    done(null, user);
                }
                if (!user) {
                    console.log("USER/TOKEN did not match");
                    req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
                    done(null, user);
                }
            })
            .fail(function (err){
                console.log(err.body);
            })
            .catch(function(err) {
                console.log(err);
            });
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
            failureRedirect: '/register',
            successRedirect: '/user/validate'
    });
    }
};

export default FacebookRoutes;
