const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const process = require('process');
const mongoAddress = 'localhost'
mongoose.connect('mongodb://' + mongoAddress + ':27017/Test-DB', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const app = express();


app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const auth = require('./routes/auth');
app.use('/auth', auth);

const api = require('./routes/api');
app.use('/api', api);


app.listen(3000, () => {
    console.log('server is running on port 3000');
})
