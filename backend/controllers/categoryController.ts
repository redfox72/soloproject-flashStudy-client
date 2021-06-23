import { Request, Response } from 'express';
import Categories from '../models/categories';

export const getAllCategories = async (_: Request, res: Response): Promise<void>  => {
  try {
    const allCategories = await Categories.find();
    res.status(200).send(allCategories);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  if (title.trim() === '') {
    res.status(400).send({ message: 'Input field is missing or empty'});
    return;
  }
  try {
    const newCategory = await Categories.create(req.body);
    const {_id} = newCategory as {_id: string}; 
    res.status(201).send(_id);
  } catch (error) {
    res.status(500).send({ error });
  }
};