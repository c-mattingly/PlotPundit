const router = require('express').Router();
const { route } = require('.');
const usersCtrl = require('../controllers/users');

router.get('/', function(req, res, next) {
    res.render('users/index');
});

module.exports = router;