const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    content: String
}, {
    timestamps: true
});

const movieSchema = new Schema({
    title: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    year: Number,
    runtime: Number,
    mpaa: String,
    platform: String,
    dateWatched: Date, 
    rating: Number, 
    comments: {commentSchema}
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);