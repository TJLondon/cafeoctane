import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import config from '../../config';


passport.use(new FacebookStrategy(
    {
        clientID: config.facebook.appid,
        clientSecret: config.facebook.secret,
        callbackURL: config.facebook.callback,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback : true,
    },
    ( req, accessToken, refreshToken, profile, done ) => {
        let data = profile._json;
        Service.user.registerSocial(
            {
                provider: 'facebook',
                name: data.name,
                email: data.email,
                profile_picture: data.picture.data.url,
                meta: {
                    provider: 'facebook',
                    id: profile.id,
                    token: accessToken,
                }
            },
            done
        );
    }
));
let FacebookRoutes = {
    authenticate: () => {
        return passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] });
    },
    callback: () => {
        return passport.authenticate('facebook', {
            failureRedirect: '/auth/failed'
        });
    }
};

export default FacebookRoutes