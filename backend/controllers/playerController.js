const Players = require('../models/players');

exports.checkPlayer = async (req,res) => {
    try {
        const userId = await Players.find({email: req.params['id']});
        if (userId) {
            res.status(200).send(userId);
        } else {
            const newPlayer = await Players.create({email: req.params['id']});
            res.status(201).send(newPlayer);
        }
    } catch (error) {
        res.status(404).send({ error });
    }
};