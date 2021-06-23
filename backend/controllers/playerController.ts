import { Request, Response } from 'express';
import Players from '../models/players';

export const checkPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await Players.findOne({userId: res.locals.user._id});
    if (userId) {
      res.status(200).send(userId);
    } else {
      const newPlayer = await Players.create({userId: res.locals.user._id});
      res.status(201).send(newPlayer);
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateCompletedQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatePlayerCompletedQuiz = await Players.findOneAndUpdate( {_id: req.body._id}, {completed: req.body.completed} );
    res.status(200).send(updatePlayerCompletedQuiz);
  } catch (error) {
    res.status(500).send({ error })
  }
};