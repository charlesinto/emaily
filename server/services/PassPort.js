import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import AuthController from '../controller/AuthController';

class PassPort {
    constructor() {
        
        this.configure = this.configure.bind(this);
        this.googleCallBackStrategy = this.googleCallBackStrategy.bind(this);
        this.authController = new AuthController();
    }

    configure() {
        let googleClientID = null, googleClientSecret = null;
        switch(process.env.NODE_ENV){
            case 'DEVELOPMENT':
                googleClientID = process.env.devGoogleClientID;
                googleClientSecret = process.env.devGoogleClientSecret;
            break;
            case 'PRODUCTION':
            break;
        }

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            const user = this.authController.findById(id);
            done(null, user);
        });
        passport.use(new GoogleStrategy({
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/api/v1/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => this.googleCallBackStrategy(accessToken, refreshToken, profile, done)));
    }

    async googleCallBackStrategy(accessToken, refreshToken, profile, done) {
        this.authController.signupWithOauth({ profile, accessToken, refreshToken, done });
    }   
}

export default PassPort;
