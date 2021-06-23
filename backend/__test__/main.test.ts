import { Mongoose } from 'mongoose';
import bcrypt from 'bcrypt';
import request, { Test } from 'supertest';
import { Server } from "http";
import quizAppServer from "../server";
import dbConnection from "../db";
import users from '../__mocks__/users.json';
import categories from '../__mocks__/categories.json';
import players from '../__mocks__/players.json';
import questions from '../__mocks__/questions.json';
import quizzes from '../__mocks__/quizzes.json';
import Users from "../models/user";
import Categories from '../models/categories';
import Questions from '../models/questions';
import Quizzes from '../models/quizzes';

const TEST_PORT: number = Number(process.env.TEST_PORT);
const TEST_URL: string = String(process.env.TEST_DB_BASE_URL);
const TEST_DB_NAME: string = String(process.env.TEST_DB_NAME);

let server: Server;
let test_db: Mongoose | undefined;

beforeAll( async () => {
  test_db = await dbConnection(TEST_URL, TEST_DB_NAME);
  if (test_db) {
    await test_db.connection.db.dropDatabase();
    await test_db.connection.models.Users.insertMany(users);
    await test_db.connection.models.Categories.insertMany(categories);
    await test_db.connection.models.Players.insertMany(players);
    await test_db.connection.models.Questions.insertMany(questions);
    await test_db.connection.models.Quizzes.insertMany(quizzes);
  }
  server = quizAppServer(TEST_PORT);
});

describe('Test_db', () => {
  test('should be instance of Mongoose', () => {
    expect(test_db).toBeInstanceOf(Mongoose);
  });
});


describe('POST /register', () => {
  let endpoint: Test;
  beforeEach(() => {
    endpoint = request(server).post('/register');
  });

  test('should register new user properly', async () => {
    const res = await endpoint.send({
      firstName: 'Dhr',
      lastName: 'Mer',
      email: 'dhr@mer.com',
      password: '123456',
    }); 
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken' && '_id');
  });
  
  test('should return 400 error if any data is missing', async () => {
    const res = await endpoint.send({
      firstName: 'Dhr',
      lastName: '    ',
      email: 'dhr@mer1.com',
      password: '123456',
    }); 
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
  
  test('should return 409 with error if user is already exists', async () => {
    const res = await endpoint.send(users[Math.floor(Math.random()*users.length)]);
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
  
  test('should hash the password', async () => {
    const res = await endpoint.send({
      firstName: 'Alex',
      lastName: 'Ted',
      email: 'alex@ted.com',
      password: 'alex1234',
    }); 
    const hashPassword = (await Users.findById(res.body._id))?.password;
    const newPassword = await bcrypt.hash('123456',10);
    expect(hashPassword?.length).toEqual(newPassword.length);
  });
});

describe('POST /login', () => {
  let endpoint: Test;
  beforeEach( () => {
    endpoint = request(server).post('/login');
  });
  
  test('slould login if username and password is correct', async () => {
    const res = await endpoint.send({
      email: 'dhr@mer.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken' && '_id');
  });
  
  test('should return 401 if username or password is incorrect', async () => {
    const res = await endpoint.send({
      email: 'albert@einstein.com',
      password: 'albert@123',
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('should compare password properly', async () => {
    let userPassword: string = '123456';
    let savedPassword: string | undefined;
    let validatedPassword: boolean;
    const res = await endpoint.send({
      email: 'dhr@mer.com',
      password: userPassword,
    });
    savedPassword = (await Users.findById(res.body._id))?.password;
    if (savedPassword) {
      validatedPassword = await bcrypt.compare(userPassword, savedPassword); 
      expect(validatedPassword).toBe(true);
      validatedPassword = await bcrypt.compare('123456789', savedPassword); 
      expect(validatedPassword).toBe(false);
    }
  });
});

describe('Tests for the Quiz App', () => {
  let token: string;
  let userId: string;
  beforeAll( async () => {
    const res = await request(server).post('/login').send({
      email: 'tester@testing.com',
      password: '123456',
    });
    token = res.body.accessToken;
    userId = res.body._id;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken' && '_id');
  });

  describe('GET /profile', () => {
    let endpoint: Test;

    beforeEach( () => {
      endpoint = request(server).get('/profile');
    });

    test('should require token in request header', async () => {
      const res = await endpoint.send();
      expect(res.status).toBe(403);
    });
    
    test('should return user profile', async () => {
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id' && 'firstName' && 'lastName' && 'email')
      expect(res.body).toHaveProperty('firstName','Dhruv');
    });
    
    test('should return error if token is expired or wrong', async () => {
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}sdv`);
      expect(res.status).toBe(401);
    })
    
  });

  describe('GET /categories', () => {
    let endpoint: Test;
    let firstCategory: object = {
      "_id": "60ce5cd8725013185ea672f5",
      "title": "TV Shows",
      "__v": 0
    };
    
    beforeEach( () => {
      endpoint = request(server).get('/categories');
    });

    test('should return all quiz categories', async () => {
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('title', res.body[0].title);
      expect(res.body[0]).toMatchObject(firstCategory);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /categories', () => {
    let endpoint: Test;

    beforeEach( () => {
      endpoint = request(server).post('/categories');
    });

    test('should able to add new category', async () => {
      const res = await endpoint.send({
        title: 'Sports',
      })
      .set('Authorization',`bearer ${token}`);
      const newCategory = await Categories.findById(res.body);
      expect(res.status).toBe(201);
      expect(res.body.length).toBe(24);
      expect(newCategory?.title).toBe('Sports');
    });

    test('should return error if any field is missing', async () => {
      const res = await endpoint.send({
        title: '    ',
      })
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Input field is missing or empty')
    });
  });

  describe('GET /quizzes', () => {
    let endpoint: Test;
    let firstQuiz: object = {
      "_id": "60ce6a0ac82d7c1b372944c8",
      "completed": false,
      "questions": ["60ce61d3bc34f618ec9b95f4",
                  "60ce622abc34f618ec9b95f7",
                  "60ce624dbc34f618ec9b95fa",
                  "60ce6263bc34f618ec9b95fd",
                  "60ce6279bc34f618ec9b9600"],
      "categoryId": "60ce5cd8725013185ea672f5",
      "name": "The Office",
      "points": 0,
      "__v": 0
    };
    
    beforeEach( () => {
      endpoint = request(server).get('/quizzes');
    });

    test('should return all quizzes', async () => {
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('name', res.body[0].name);
      expect(res.body[0]).toMatchObject(firstQuiz);
      expect(res.body.length).toBe(6);
    });
  });

  describe('POST /quizzes', () => {
    let endpoint: Test;

    beforeEach( () => {
      endpoint = request(server).post('/quizzes');
    });

    test('should able to add new quizz', async () => {
      let {_id} = (await Categories.find({title: 'Sports'}))[0];
      const res = await endpoint.send({
        categoryId: _id,
        name: 'Cricket',
        points: 0,
        questions: [questions[0]._id,questions[1]._id,questions[2]._id,questions[3]._id,questions[4]._id]
      })
      .set('Authorization',`bearer ${token}`);
      let newQuiz = await Quizzes.findById(res.body);
      expect(res.status).toBe(201);
      expect(res.body.length).toBe(24);
      expect(newQuiz?.completed).toEqual(false);
      expect(newQuiz).toHaveProperty('name', 'Cricket');
    });
  });

  describe('GET /quizzes/:id', () => {
    let endpoint: Test;
    let quizId: string = (questions[Math.floor(Math.random()*questions.length)])._id;
    beforeEach( () => {
      endpoint = request(server).get(`/quizzes/${quizId}`);
    });
    
    test('should able to fetch quiz from id', async () => {
      let origionalQuiz = await Quizzes.findById(quizId)
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name',origionalQuiz?.name);
    });
  });

  describe('GET /questions', () => {
    let endpoint: Test;
    let firstQuestion: object = {
      "_id": "60ce61d3bc34f618ec9b95f4",
      "categoryId": "60ce5cd8725013185ea672f5",
      "question": "Example question 1?",
      "position": 1,
      "option1": "Option-1",
      "option2": "Option-2",
      "option3": "Option-3",
      "option4": "Option-4",
      "__v": 0
    }; 
    
    beforeEach( () => {
      endpoint = request(server).get('/questions');
    });

    test('should return all questions', async () => {
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('question', res.body[0].question);
      expect(res.body[0]).toMatchObject(firstQuestion);
      expect(res.body.length).toBe(questions.length);
    });
  });

  describe('POST /questions', () => {
    let endpoint: Test;
    
    beforeEach( () => {
      endpoint = request(server).post('/questions');
    });

    test('should able to add new question', async () => {
      let {_id} = (await Categories.find({title: 'Sports'}))[0];
      const res = await endpoint.send({
        categoryId: _id,
        question: 'Quiz 7 question 1?',
        position: 1,
        option1: 'Option-1',
        option2: 'Option-2',
        option3: 'Option-3',
        option4: 'Option-4',
      })
      .set('Authorization',`bearer ${token}`);
      let newQuestion = await Questions.findById(res.body);
      expect(res.status).toBe(201);
      expect(res.body.length).toBe(24);
      expect(newQuestion?.question).toEqual('Quiz 7 question 1?');
    });

  });

  describe('GET /questions/:id', () => {
    let endpoint: Test;
    let questionId: string = (questions[Math.floor(Math.random()*questions.length)])._id;
    beforeEach( () => {
      endpoint = request(server).get(`/questions/${questionId}`);
    });
    
    test('should able to fetch questions from id', async () => {
      let origionalQuestion = await Questions.findById(questionId)
      const res = await endpoint.send()
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('question',origionalQuestion?.question);
    });
  });

  describe('GET /questions/bulk', () => {
    let endpoint: Test;

    beforeEach( () => {
      endpoint = request(server).post(`/questions/bulk`);
    });
    
    test('should able to fetch questions from id', async () => {
      const res = await endpoint.send({
        questions: [questions[0]._id, questions[1]._id,questions[2]._id,questions[3]._id,questions[4]._id]
      })
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(res.body[0]).toHaveProperty('question', questions[0].question);
    });
  });

  describe('GET /players/:id', () => {
    let endpoint: Test;
    beforeEach( async () => {
      endpoint = request(server).get(`/players/${userId}`);
    });
    
    test('should create new player if not exist', async () => {
      const res = await endpoint
      .set('Authorization',`bearer ${token}`);
      expect(res.status).toBe(201);
      const res1 = await endpoint
      .set('Authorization',`bearer ${token}`);
      expect(res1.body).toEqual(res.body);
    });
  });
});

afterAll( async () => {
  await test_db?.connection.close();
  server.close();
});