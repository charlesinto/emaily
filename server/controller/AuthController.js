import User from '../model/Users';
import Database from '../services/Database';
class AuthController {
    constructor() {
        this.signupWithOauth = this.signupWithOauth.bind(this);
        this.findById = this.findById.bind(this);
    }

    /**
     * 
     * @param {*} data
     */

    async signupWithOauth(data) {
        try{
            const db = new Database();
            db.connectToMongoose();
            const { profile, accessToken, refreshToken, done } = data;
            const { id } = profile;
            User.findOne({ googleId: id })
                .then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({
                            googleId: id,
                        }).save()
                            .then((user) => {
                                done(null, user);
                            });
                    }
                });
        } catch(error){
            
        }
        
    }

    async findById(id) {
        try {
            const user = await User.findById(id)
            return user;
        } catch (e) {
            console.log(e);
        }
        return null;
    }
}

export default AuthController;
