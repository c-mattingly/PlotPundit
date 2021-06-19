const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);