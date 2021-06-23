const express = require('express');
const router = express.Router();
const moviesCtrl =  require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', moviesCtrl.create);
router.delete('/:id', moviesCtrl.delete);
router.get('/:id/edit', moviesCtrl.edit);
router.put('/:id', moviesCtrl.update);

module.exports = router;