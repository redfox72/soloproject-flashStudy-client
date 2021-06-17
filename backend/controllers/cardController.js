const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let { Card } = require('../models/card');

// => localhost:3000/cards/
router.get('/', (req, res) => {
    Card.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Cards :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Card.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Card :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    let car = new Card({
        name: req.body.name,
        prompt: req.body.prompt,
        answer: req.body.answer,
        myNum: req.body.myNum,
    });
    car.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Card Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    let car = {
        name: req.body.name,
        prompt: req.body.prompt,
        answer: req.body.answer,
        myNum: req.body.myNum,
    };
    Card.findByIdAndUpdate(req.params.id, { $set: car }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Card Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Card.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Card Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;