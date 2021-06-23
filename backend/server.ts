import http from 'http';
import express from 'express';
import { Response } from 'express';
import cors from 'cors';
import router from './router';

const quizAppServer = (PORT: number): http.Server => {
  
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  app.get('*', (_,res: Response) => {
    res.status(404).send('Page not found');
  });

  app.post('*', (_,res: Response) => {
    res.status(404).send('Page not found');
  });

  const server = http.createServer(app);
   
  server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });

  return server;
};

export default quizAppServer;