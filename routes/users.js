const router = require('express').Router();
const usersCtrl = require('../controllers/users');

router.get('/', function(req, res, next) {
    res.render('users/index');
});


module.exports = router;