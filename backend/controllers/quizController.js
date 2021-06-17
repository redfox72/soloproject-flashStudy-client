const Quizzes = require('../models/quizzes');

exports.getAllQuizzes = async (req,res) => {
    try {
        const allQuizzes = await Quizzes.find();
        res.status(200).send(allQuizzes);
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.getQuizById = async (req,res) => {
    try {
        const quizById = await Quizzes.findById(req.params['id']);
        res.status(200).send(quizById);      
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.addQuiz = async (req,res) => {
    try {
        const newQuiz = await Quizzes.create(req.body); 
        res.status(201).send(newQuiz._id);
    } catch (error) {
        res.status(404).send({ error });
    }
};