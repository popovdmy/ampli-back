import { Request, Response } from 'express';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { DI } from '../app';
import { UserEntity } from '../entities/UserEntity';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findAll();
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne(req.params.id as FilterQuery<UserEntity>, {});
    if(!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}

export const createUser = async (req: Request, res: Response) => {
  if(!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Missing essential parameters' });
  }
  try {
    const user = DI.em.create(UserEntity, req.body);
    await DI.userRepository.persist(user).flush();
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message });
  }
}


export const updateUser = async (req: Request, res: Response) => {
  if(!req.body.title || !req.body.text) {
    return res.status(400).json({ message: 'Missing essential parameters' });
  }
  try {
    const user = await DI.userRepository.findOne(req.params.id as FilterQuery<UserEntity>, {});
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    wrap(user).assign({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
    });
    await DI.userRepository.persist(user).flush();
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message});
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await DI.userRepository.findOne(req.params.id as FilterQuery<UserEntity>, {});
    if(!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await DI.userRepository.removeAndFlush(user);
    return res.status(200).json(user);
  } catch(e: any) {
    return res.status(400).json({ message: e.message});
  }
}
