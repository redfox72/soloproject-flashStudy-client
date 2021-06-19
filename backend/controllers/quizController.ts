import { Request, Response } from 'express';
import Quizzes from '../models/quizzes';

export const getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
  try {
    const allQuizzes = await Quizzes.find();
    res.status(200).send(allQuizzes);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const getQuizById = async (req: Request,res: Response): Promise<void> => {
  try {
    const quizById = await Quizzes.findById(req.params['id']);
    res.status(200).send(quizById);      
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const addQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuiz = await Quizzes.create(req.body); 
    res.status(201).send(newQuiz._id);
  } catch (error) {
    res.status(404).send({ error });
  }
};