import express from 'express';
import cors from 'cors';
import router from './router';
import dbConnection from './db';
import morgan from 'morgan';
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.get('*', (_,res) => {
  res.status(404).send('Page not found');
});

app.post('*', (_,res) => {
  res.status(404).send('Page not found');
});

( async () => {
  await dbConnection();
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
})();