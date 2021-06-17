const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usertable = require('../models/user');
const SECRET_KEY = process.env.SECRET_KEY || 'This is first trial authentication';

const create = async (req,res) => {
    const { email, password } = req.body;
    const user = await Usertable.findOne({ email: email });
    if (user) {
        return res.status(409).send({error:'409', message: 'User already exists'});
    }
    try {
        if (password === '') throw new Error();
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await Usertable.create({...req.body, password: hashPassword});
        const { _id } = newUser;
        const accessToken = jwt.sign({ _id }, SECRET_KEY);
        res.status(201).send({ accessToken });
    } catch (error) {
        res.status(400).send({ error, message: 'Could not create user' });
    }
}

const login = async (req,res) => {
    const { email,password } = req.body;
    try {
        const user = await Usertable.findOne({ email: email });
        const validatedPassword = await bcrypt.compare(password, user.password);
        if (!validatedPassword) throw new Error();
        const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
        res.status(200).send({ accessToken })
    } catch (error) {
        res.status(401).send({ error, message: 'Username or password is incorrect' })
    }
};

const profile = async (req, res) => {
    try {
      const { _id, firstName, lastName, email } = req.user;
      const user = { _id, firstName, lastName, email };
      res.status(200).send(user);
    } catch {
      res.status(404).send({ error, message: 'User not found' });
    }
};

const logout = (req,res) => {

};

module.exports = { create, login, profile, logout };