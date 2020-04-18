import express from 'express';
import bodyParser from 'body-parser';

import LocalStrategy from 'passport-local'; //local Auth Strategy
import PassportJwt from 'passport-jwt'; // Auth via JWT
const {Strategy: JwtStrategy, ExtractJwt}  = PassportJwt; // Auth via JWT

import  passport from 'passport';


import {booksRouter} from './routes/books.route.js'; // Imports routes for the books
import {usersRouter} from './routes/users.route.js'; 

import config from './config/index.js';
import databaseConnect from './database.js';



// initialize our express app
const app = express();

databaseConnect();


// Set up mongoose connection

passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        function (email, password, done) {
            User.findOne({email}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user || !user.checkPassword(password)) {
                    return done(null, false, {message: 'User does not exist or wrong password.'});
                }
                return done(null, user);
            });
        }
    )
);

const jwtsecret = "mysecretkey"; // signing key for JWT

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: jwtsecret
  };

  
passport.use(
    new JwtStrategy(
        jwtOptions, 
        function (payload, done) {
            User.findById(payload.id, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    UserModel.findOne({where: {id}}).then((user) => {
        done(null, user);
        return null;
    });
});
  

app.use(passport.initialize()); 


app.use('/books', booksRouter);
app.use('/user', usersRouter);


const port = config.port;
app.listen(port, () =>
	console.log(`Server is running on http://locahost:${port}`));

