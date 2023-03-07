import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/UserController';

export const UserRouter = express.Router();

UserRouter.get('/:id', getUser);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', deleteUser);
UserRouter.get('/', getUsers);
UserRouter.post('/', createUser);