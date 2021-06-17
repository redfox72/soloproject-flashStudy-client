const Questions = require('../models/questions');

exports.getAllQuestions = async (req,res) => {
    try {
        const allQuestions = await Questions.find();
        res.status(200).send(allQuestions);
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.getQuestionById = async (req,res) => {
    try {
        const questionById = await Questions.findById(req.params['id']);
        res.status(200).send(questionById);      
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.addQuestion = async (req,res) => {
    try {
        const newQuestion = await Questions.create(req.body); 
        res.status(201).send(newQuestion._id);
    } catch (error) {
        res.status(404).send({ error });
    }
};