import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usertable from '../models/user';

const SECRET_KEY = process.env.SECRET_KEY || 'This is first trial authentication';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName } = req.body;
  const user = await Usertable.findOne({ email: email } as {email: string});
  if (user) {
    res.status(409).send({error: '409', message: 'User already exists'});
    return;
  }
  try {
    if (password.trim() === '' || email.trim() === '' || firstName.trim() === '' || lastName.trim() === '') throw new Error();
    const hashPassword: string = await bcrypt.hash(password, 10);
    const newUser: object = await Usertable.create({...req.body, password: hashPassword});
    const { _id } = newUser as { _id: string};
    const accessToken: string = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '10m'});
    res.status(201).send({ _id, accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string, password: string };
  try {
    const user = await Usertable.findOne({ email: email} as {email: string});
    const { _id } = user as { _id: string };
    if (!user) {
      res.status(401).send('Unauthorised user');
      return;
    }
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) throw new Error();
    const accessToken: string = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '10m' });
    res.status(200).send({ _id, accessToken });
  } catch (error) {
    res.status(401).send({ error, message: 'Username or password is incorrect' })
  }
};

export const profile = async (_: Request, res: Response): Promise<void> => {
  try {
    const { _id, firstName, lastName, email } = 
        res.locals.user as { _id: string, firstName: string, lastName: string, email: string };
    const user = { _id, firstName, lastName, email };
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error, message: 'User not found' });
  }
};

export const logout = (req: Request, res: Response) => {

};
