const Movie = require('../models/movie');
const Comment = require('../models/comment')

module.exports = {
    new: newMovie, 
    create, 
    index,
    show
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
    res.render("movies/show");
    // Movie.findById(req.params.id)
    // .populate('comments').exec(function(err, movieDoc) {
    //     console.log(movieDoc);
    // if (Comment.content !== undefined) {
    // Comment.find(
    //     {_id: {$nin: movieDoc.comments}},
    //     function(err, commentsDocs){
    //         res.render("movies/show", {
    //             movie: movieDoc,
    //             comments: commentsDocs
    //         });
    //     }    
    // )
    // } 
    // })
}