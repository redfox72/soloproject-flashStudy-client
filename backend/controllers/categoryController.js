const Categories = require('../models/categories');

exports.getAllCategories = async (req,res) => {
    try {
        const allCategories = await Categories.find();
        res.status(200).send(allCategories);
    } catch (error) {
        res.status(404).send({ error });
    }
};

exports.addCategory = async (req,res) => {
    try {
        const newCategory = await Categories.create(req.body); 
        res.status(201).send(newCategory._id);
    } catch (error) {
        res.status(404).send({ error });
    }
};