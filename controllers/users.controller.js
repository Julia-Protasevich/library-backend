import {User} from '../models/user.model.js';
import passport from '../authentication/passport.js';

import logger from '../config/logger/logger-service.js';

export const UsersController = {
  async login(req, res, next){
    await passport.authenticate('local', function (err, user) {
      if (err) {
        return next(err);
      }
  
      if (user == false) {
        res.body = "Login failed";
        logger.warn('Login failed');
      } else {
        const payload = {
          id: user.id,
          displayName: user.displayName,
          email: user.email
        };
        const token = jwt.sign(payload, jwtsecret); 
        
        res.body = {user: user.displayName, token: 'JWT ' + token};
      }
    });
  },

  async register(req, res, next) {
    try{
        const user = new User({
          displayName: req.body.name,
          email: req.body.email,
          password: req.body.password});

        res.body = await User.create(user);
        
    }catch(err){
      next(err);
    }
    
  }
};

  
