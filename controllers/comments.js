const Comment = require('../models/movie');
const Movie = require('../models/movie');

module.exports = {
    create,
};


function create(req, res) {
    console.log(req.params.id);
    Movie.findById(req.params.id, function(err, movie) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      console.log(req.body.user, "req.body.user");
      console.log(req.body.userName, "req.body.userName");
      console.log(movie.comments, "movie.comments before");
      movie.comments.push(req.body);
      console.log(movie.comments, "movie.comments after");
      movie.save(function(err) {
        res.redirect(`/movies/${movie._id}`);
      });
    });
  }