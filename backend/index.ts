import quizAppServer from './server';
import dbConnection from './db';

const PORT = Number(process.env.PORT) || 3001;
const url = String(process.env.DB_BASE_URL);
const DB_NAME = String(process.env.DB_NAME);

dbConnection(url,DB_NAME);
quizAppServer(PORT);