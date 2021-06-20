import { Request, Response } from 'express';
import Users from '../models/user';

export const addUserToAdmin = async (req: Request, res:Response): Promise<void> => {
  try {
    const addToAdmin = await Users.findByIdAndUpdate(req.params['id'], {admin: true}, (result, error) => {
      if (error) {
        res.status(401).send(error);
      } else {
        res.status(200).send(addToAdmin);
      }
    })
  } catch (error) {
    res.status(500).send({ error });
  }
};