const Comment = require('../models/movie');
const Movie = require('../models/movie');

module.exports = {
    create,
    delete: deleteComment
};


function create(req, res) {
    Movie.findById(req.params.id, function(err, movie) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      movie.comments.push(req.body);
      movie.save(function(err) {
        res.redirect(`/movies/${movie._id}`);
      });
    });
  }

  function deleteComment(req, res) {
    Movie.findOne(
      {'comments._id': req.params.id}, function(err, movie) {
        if (!movie || err) return res.redirect(`/movies/${movie._id}`);
        const commentSubdoc = movie.comments.id(req.params.id)
        commentSubdoc.remove();
        movie.save(function(err) {
          res.redirect(`/movies/${movie._id}`);
        });
      }
    );
  }