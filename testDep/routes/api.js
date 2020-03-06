const routes = require('express').Router();
const qcm = require('../models/qsm');
const user = require('../models/user')

routes.post('/addQCM', async (req, res) => {
    const qcmResult = await qcm.create(req.body).catch(err => err);
    res.send({ msg: 'OK', data: qcmResult })
})
routes.get('/allQCM', async (req, res) => {
    const qcmResult = await qcm.find().catch(err => err);
    res.send({ msg: 'OK', data: qcmResult })
})
routes.post('/rigthAnswer/:id', async (req, res) => {
    users = await user.findOne({ _id: req.params.id }).catch(err => err);
    resultat = await user.findByIdAndUpdate(req.params.id, { $set: { score: users.score + 3 } }).catch(err => err);
    resultat2 = await user.findByIdAndUpdate(req.params.id, {
        $push: {
            answers: {
                question: req.body.answers.question,
                answer: req.body.answers.answer,
                value: req.body.answers.value
            }
        }
    }).catch(err => err);
    res.send({ msg: 'OK', data: resultat, data2: resultat2 })

})
routes.post('/wrongAnswer/:id', async (req, res) => {
    console.log(req.body.answers);
    users = await user.findOne({ _id: req.params.id }).catch(err => err);

    resultat = await user.findByIdAndUpdate(req.params.id, { $set: { score: users.score - 1 } }).catch(err => err);

    resultat2 = await user.findByIdAndUpdate(req.params.id, {
        $push: {
            answers: {
                question: req.body.answers.question,
                answer: req.body.answers.answer,
                value: req.body.answers.value
            }
        }
    }).catch(err => err);
    res.send({ msg: 'OK', data: resultat, data2: resultat2 })

})
routes.get('/getUser/:id', async (req, res) => {
    const Result = await user.findOne({ _id: req.params.id }).catch(err => err);
    res.send({ msg: 'OK', data: Result })
})
module.exports = routes; 