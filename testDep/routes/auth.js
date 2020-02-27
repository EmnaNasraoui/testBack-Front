const routes = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');

routes.post('/register', async (req, res) => {

    const userResult = await user.create(req.body).catch(err => err);
    // if (userResult.code === 11000) { return res.send({ msg: 'email exist', data: '' }) }
    res.send({ msg: 'Ok', data: userResult })


});
routes.post('/login', async (req, res) => {
    const userResult = await user.findOne({ email: req.body.email }).exec();
    if (!userResult) { return res.send({ msg: 'User not found', data: '' }); }
    if (!userResult.comparePassword(req.body.password, userResult.password)) { return res.send({ msg: 'Bad password', data: '' }); }
    userResult.password = '';
    userResult.extra = {};
    res.send({ msg: 'OK', data: { token: jwt.sign({ data: userResult }, 'SuperSecret') } });
})

module.exports = routes; 