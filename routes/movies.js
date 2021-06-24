const express = require('express');
const router = express.Router();
const moviesCtrl =  require('../controllers/movies');
const commentsCtrl =  require('../controllers/comments');


router.get('/', isLoggedIn, moviesCtrl.index);
router.get('/new', isLoggedIn, moviesCtrl.new);
router.get('/:id', isLoggedIn, moviesCtrl.show);
router.post('/', isLoggedIn, moviesCtrl.create);
router.delete('/:id', isLoggedIn, moviesCtrl.delete);
router.get('/:id/edit', isLoggedIn, moviesCtrl.edit);
router.put('/:id', isLoggedIn, moviesCtrl.update);

function isLoggedIn(req, res, next){
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;