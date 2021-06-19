import { Request, Response } from 'express';
import Questions from '../models/questions';

export const getAllQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const allQuestions = await Questions.find();
    res.status(200).send(allQuestions);
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const questionById = await Questions.findById(req.params['id']);
    res.status(200).send(questionById);      
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const addQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuestion = await Questions.create(req.body); 
    res.status(201).send(newQuestion._id);
  } catch (error) {
    res.status(404).send({ error });
  }
};