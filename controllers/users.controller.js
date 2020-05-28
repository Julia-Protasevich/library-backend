import {User} from '../models/user.model.js';

export const UsersController = {
  async login(ctx, next){
    await passport.authenticate('local', function (err, user) {
      if (user == false) {
        ctx.body = "Login failed";
      } else {
        const payload = {
          id: user.id,
          displayName: user.displayName,
          email: user.email
        };
        const token = jwt.sign(payload, jwtsecret); 
        
        ctx.body = {user: user.displayName, token: 'JWT ' + token};
      }
    })(ctx, next);  
  },

  async register(ctx, next) {
    try{
        const user = new User({ displayName: req.body.name, email: req.body.email, password: req.body.password});

        ctx.body = await User.create(user);
        
    }catch(err){
      ctx.status = 400;
      ctx.body = err;
    }
    
  }
};

  
