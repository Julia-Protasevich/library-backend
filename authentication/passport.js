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
                const user = await User.findOne({email});
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
                const user = await User.findById(payload.id);
                if (user) {
                   return done(null, user);
                } else {
                   return done(null, false);
                }
            } catch (error){
                return done(error);
            }
        }
    )
);

passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findOne({where: {id}});
      if (!user) {
        done(new Error('user not found'));
      }
       done(null, user);
    } catch (e) {
       done(e);
    }
  });

export default passport;