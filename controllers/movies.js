const Movie = require('../models/movie');
const Comment = require('../models/movie');

module.exports = {
    new: newMovie, 
    create, 
    index,
    show,
    delete: deleteMovie,
    edit, 
    update
};


function deleteMovie(req, res) {
    Movie.findByIdAndDelete(req.params.id, function() {
    res.redirect('/movies');
    })
}

function edit(req, res) {
    Movie.findById(req.params.id, function(err, movieDoc) {
        if(err) {
            res.send(err);
        } else {
            res.render('movies/edit', {
                movie: movieDoc
            });
        };
    });
};

function update(req, res) {
    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, movieDocs) {
    });
    res.redirect(`/movies/${req.params.id}`);
    }


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
    console.log(req.body.comments);
    if(req.body.comments) req.body.comments = req.body.comments.split();
    console.log(req.body.comments);
    const movie = new Movie(req.body);
    movie.save(function(err) {
        console.log(err);
        if (err) return res.redirect('/movies/new');
        res.redirect(`/movies/${movie._id}`);
    })
}

function show(req, res) {
    Movie.findById(req.params.id, function(err, movieDoc) {
        Comment.find(
            {movie: movieDoc._id},
            function(err, commentsDocs){
                console.log(commentsDocs, "comments");
                res.render('movies/show', {
                    movie: movieDoc,
                    comments: commentsDocs
                }) 
            }
        )
    })
    
}