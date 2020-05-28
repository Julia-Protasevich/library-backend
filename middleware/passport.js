import LocalStrategy from 'passport-local'; //local Auth Strategy
import PassportJwt from 'passport-jwt'; // Auth via JWT
const {Strategy: JwtStrategy, ExtractJwt}  = PassportJwt; // Auth via JWT

import  passport from 'passport';
import {User} from '../models/user.model.js';
import config from '../config/index.js';


passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async function (email, password, done) {
            try{
                let user = await User.findOne({email});
                if (!user || !user.checkPassword(password)) {
                    return done(null, false, {message: 'User does not exist or wrong password.'});
                }
                return done(null, user);
            } catch(error) {
                return done(error);
            }
        }
    )
);


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secrets.JWT_SECRET
  };

  
passport.use(
    new JwtStrategy(
        jwtOptions, 
        async function (payload, done) {
            try{
                let user = await User.findById(payload.id);
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error){
                done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findOne({where: {id}});
      if (!user) {
        return done(new Error('user not found'));
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

export default passport;