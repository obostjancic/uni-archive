var express = require('express');
var router = express.Router();

var adminpanel = require('../routes/adminpanel');
var playermap = require('../routes/playermap');

var moment = require('moment');
var pool = require('../config-postgreSQL');
const crypto = require('crypto');

var binder = require('model-binder');


router.use('/adminpanel', adminpanel);
router.use('/playermap', playermap);


router.get('/', function(req, res) {
    res.render('index');
});

router.post('/login', function(req, res) {
    res.redirect('/playermap');
});

router.post('/register', function(req, res) {
    res.redirect('/');
});

module.exports = router;
