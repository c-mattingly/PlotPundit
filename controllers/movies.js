const Movie = require('../models/movie');


module.exports = {
    new: newMovie, 
    create, 
    index,
    show
};

function index(req, res) {
    Movie.find({user: req.user._id}, function(err, movies) {
        res.render('movies/index', {
            movies
        })
    });
}

function newMovie(req, res) {
    res.render('movies/new');
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.comments = [];
    console.log(req.body);
    const movie = new Movie(req.body);
    movie.save(function(err) {
        console.log(err);
        if (err) return res.redirect('/movies/new');
        res.redirect(`/movies/${req.user._id}`);
    })
}

function show(req, res) {
    console.log(req.body.user);
    Movie.findById(req.user._id, function(err, movieDoc) {
        Comment.find(
            {movie: movieDoc._id},
            function(err, commentsDocs){
                res.render('movies/show', {
                    movie: movieDoc,
                    comments: commentsDocs
                }) 
            }
        )
    })
    
}