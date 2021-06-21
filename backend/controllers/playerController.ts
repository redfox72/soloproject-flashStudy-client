import { Request, Response } from 'express'
import Players from '../models/players';

export const checkPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await Players.findOne({userId: req.params['id']});
    if (userId) {
      res.status(200).send(userId);
    } else {
      const newPlayer = await Players.create({userId: req.params['id']});
      res.status(201).send(newPlayer);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};