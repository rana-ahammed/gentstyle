import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

// Google Strategy
passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                email: profile.emails[0].value,
                name: profile.displayName,
                id: profile.id
            };
            done(null, user);
        }
    )
);

// Facebook Strategy
passport.use(
    new FacebookStrategy.Strategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback/`
        },
        function (accessToken, refreshToken, profile, done) {
            const user = {
                name: profile.displayName,
                id: profile.id
            };

            done(null, user);
        }
    )
);

// Github Strategy
passport.use(
    new GitHubStrategy.Strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/github/callback`
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            const user = {
                name: profile.displayName,
                id: profile.id
            };
            done(null, user);
        }
    )
);

// Serialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize User
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
