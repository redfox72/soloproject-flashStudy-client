import { Router } from 'express';
import { create, login, profile, logout } from './controllers/userController';
import { getAllCategories, addCategory } from './controllers/categoryController';
import { getAllQuizzes, addQuiz, getQuizById } from './controllers/quizController';
import { getAllQuestions, addQuestion, getQuestionById, getBulkQuestions } from './controllers/questionController';
import { authMiddleware } from './middleware/authMiddleware';
import { roleMiddleware } from './middleware/roleMiddleware';
import { checkPlayer, updateCompletedQuiz } from './controllers/playerController';
import { addUserToAdmin } from './controllers/adminController';

const router = Router();

router.post('/register', create);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.post('/logout', authMiddleware, logout);

router.get('/categories',authMiddleware, getAllCategories);
router.post('/categories', authMiddleware, addCategory);

router.get('/quizzes', authMiddleware, getAllQuizzes);
router.post('/quizzes', authMiddleware, addQuiz);
router.get('/quizzes/:id', authMiddleware, getQuizById);

router.get('/questions', authMiddleware, getAllQuestions);
router.post('/questions', authMiddleware, addQuestion);
router.get('/questions/:id', authMiddleware, getQuestionById);
router.post('/questions/bulk', authMiddleware, getBulkQuestions);

router.get('/players/:id', authMiddleware, checkPlayer);
router.put('/player/completed', authMiddleware, updateCompletedQuiz);

router.put('/admin/:id', authMiddleware, roleMiddleware, addUserToAdmin);

export default router;
