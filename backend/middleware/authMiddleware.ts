import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/user';
const SECRET_KEY = process.env.SECRET_KEY || 'Am I secure to send data';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    res.sendStatus(403);
    return;
  }
  const accessToken = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(accessToken, SECRET_KEY) as { _id: string };
    const user = await Users.findOne({ _id });
    if (!user) {
      res.sendStatus(401);
      return;
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
