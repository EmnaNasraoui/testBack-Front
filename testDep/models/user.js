const mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs')

const user = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    score: { type: Number },
    answers: [{ question: String, answer: String }]

})


user.methods.comparePassword = function (candidatePassword, cb) {
    return bcrypt.compareSync(candidatePassword, this.password);
}

user.pre('save', function () {
    this.password = bcrypt.hashSync(this.password);
});




module.exports = mongoose.model('user', user);