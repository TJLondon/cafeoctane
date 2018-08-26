import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import config from '../../config';
import funct from '../users/functions';

passport.use(new GoogleStrategy.OAuth2Strategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: "http://localhost:8080/auth/google/callback", //change production
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        funct.registeruser(
            profile._json.name.givenName,
            profile._json.name.familyName,
            profile._json.emails[0].value,
            profile._json.id,
            profile._json.image.url,
            "Google",
            profile._json
        )
            .then(function (user) {
                if (user) {
                    console.log("LOGGING IN AS: " + user.email);
                    //req.session.success = 'You are successfully logged in ' + user.email + '!';
                    //next(null, user);
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
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

let GoogleRoutes = {
    authenticate: () => {
        return passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email']});
    },
    callback: () => {
        return passport.authenticate('google',
            {
                failureRedirect: '/register',
                successRedirect: '/user/validate'
            })
    }
};

export default GoogleRoutes;