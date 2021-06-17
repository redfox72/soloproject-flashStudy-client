const router = require('express').Router();
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoryController');
const quizController = require('./controllers/quizController');
const questionController = require('./controllers/questionController');
const authMiddleware = require('./middleware/authMiddleware');
const playerController = require('./controllers/playerController');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.profile);
router.post('/logout', authMiddleware, userController.logout);

router.get('/categories',authMiddleware, categoriesController.getAllCategories);
router.post('/categories', authMiddleware, categoriesController.addCategory);

router.get('/quizzes', authMiddleware, quizController.getAllQuizzes);
router.post('/quizzes', authMiddleware, quizController.addQuiz);
router.get('/quizzes/:id', authMiddleware, quizController.getQuizById);

router.get('/questions', authMiddleware, questionController.getAllQuestions);
router.post('/questions', authMiddleware, questionController.addQuestion);
router.get('/questions/:id', authMiddleware, questionController.getQuestionById);

router.get('/players/:email', authMiddleware, playerController.checkPlayer);

module.exports = router;