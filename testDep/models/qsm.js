const mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs')

const qcm = new mongoose.Schema({
    title: String,
    choice1: { text1: String, value1: String },
    choice2: { text2: String, value2: String },
    choice3: { text3: String, value3: String },
    choice4: { text4: String, value4: String },

})


module.exports = mongoose.model('qcm', qcm);