import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: String,
    role: String,
    email: {
      type: String,
      required: 'e-mail is required',
      unique: 'this e-mail already exist'
    },
    passwordHash: String,
    salt: String,
  }, {
    timestamps: true
  });
  
userSchema.virtual('password')
  .set(function (password) {
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  });
  
  userSchema.methods.checkPassword = function (password) {
    if (!password || !this.passwordHash) {
      return false;
    }

    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') === this.passwordHash;
  };
  

  export const User = mongoose.model('User', userSchema);
