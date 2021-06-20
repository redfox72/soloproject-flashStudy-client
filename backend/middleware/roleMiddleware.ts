import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (res.locals.user.admin) {
      next();
    } else {
      res.sendStatus(403);    
    }
  } catch (error) {
    res.sendStatus(500);    
  }
};