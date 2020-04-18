import {User} from '../models/user.model.js';

export const UsersController = {
  async test(req, res) {
    res.send('Greetings from the Test controller!');
  },

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

        await user.save(function(err) {
          return err ? 
            next(err)
            : req.logIn(user, function(err) {
              return err ? 
                next(err)
                : res.redirect('/private');
            });
        });
    }catch(e){
        next(e);
    }
    
  }
};

  
