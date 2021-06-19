import { Request, Response } from 'express';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usertable, { UserData } from '../models/user';
const SECRET_KEY = process.env.SECRET_KEY || 'This is first trial authentication';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await Usertable.findOne({ email: email });
  if (user) {
    res.status(409).send({error:'409', message: 'User already exists'});
    return
  }
  try {
    if (password === '') throw new Error();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Usertable.create({...req.body, password: hashPassword});
    const { _id } = newUser as { _id: string};
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ _id,accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await Usertable.findOne({ email: email });
    const { _id } = user as { _id: string };
    if(!user) {
      res.status(404).send('User not found');
      return
    }
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ _id,accessToken })
  } catch (error) {
    res.status(401).send({ error, message: 'Username or password is incorrect' })
  }
};

export const profile = async (_: Request, res: Response): Promise<void> => {
  try {
    const { _id, firstName, lastName, email } = res.locals.user;
    const user = { _id, firstName, lastName, email };
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error, message: 'User not found' });
  }
};

export const logout = (req: Request, res: Response) => {

};
