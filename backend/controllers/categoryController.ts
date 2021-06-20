import { Request, Response } from 'express';
import Categories from '../models/categories';

export const getAllCategories = async (req: Request, res: Response): Promise<void>  => {
  try {
    const allCategories = await Categories.find();
    res.status(200).send(allCategories);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCategory = await Categories.create(req.body); 
    res.status(201).send(newCategory._id);
  } catch (error) {
    res.status(500).send({ error });
  }
};