const express = require('express');
const router = express.Router();
const moviesCtrl =  require('../controllers/movies');

router.get('/users/:id/movies', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
// router.get('/:id', moviesCtrl.show);
router.post('/users/:id/movies', moviesCtrl.create);

module.exports = router;