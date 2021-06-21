const Movie = require('../models/movie');

module.exports = {
    new: newMovie, 
    create, 
    index,
    // show
};

function index(req, res) {
    Movie.find({}, function(err, movies) {
        res.render('movies/index')
    });
}

function newMovie(req, res) {
    res.render('movies/new');
}

function create(req, res) {
    req.body.user = req.user._id
    const movie = new Movie(req.body);
    movie.save(function(err) {
        if (err) return res.redirect('/movies/new');
        res.redirect(`/movies/${user._id}`);
    })
}

// function show(req, res) {
//     Movie.findById(req.params.id)
//     .populate('comments').exec(function(err, movieDoc) {
//     Comment.find(
//         {_id: {$nin: movieDoc.comments}},
//         function(err, commentsDocs){
//             res.render('movies/show', {
//                 movie: movieDoc,
//                 comments: commentsDocs
//             });
//         }
//     )
//     })
// }