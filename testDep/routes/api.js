const routes = require('express').Router();
const qcm = require('../models/qsm');

routes.post('/addQCM', async (req, res) => {
    const qcmResult = await qcm.create(req.body).catch(err => err);
    res.send({ msg: 'OK', data: qcmResult })
})
routes.get('/allQCM', async (req, res) => {
    const qcmResult = await qcm.find().catch(err => err);
    res.send({ msg: 'OK', data: qcmResult })
})
module.exports = routes; 