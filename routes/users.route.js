import express from 'express';
import {UsersController} from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.route('/login')
    .post(UsersController.login);
usersRouter.route('/register')
    .post(UsersController.register);


