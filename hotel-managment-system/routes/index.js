var express = require('express');
var router = express.Router();
var pool = require('../config-postgreSQL');

const crypto = require('crypto');
const secret = 'abcdefg';

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
    var password = req.body.passLogin;
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    pool.query("Select * from korisnici where korisnickoime=$1" , [req.body.unmLogin], function (err, result) {
        if (result.rows.length > 0 && result.rows[0].sifra == hash) {
            res.cookie('kuki', req.body.unmLogin, {maxAge: 10*60*1000});
            if (result.rows[0].nivo == 3)
                res.redirect('/pregled');
            else if (result.rows[0].nivo == 2)
                res.redirect('/sobe');
            else if (result.rows[0].nivo == 1)
                res.redirect('/narudzbe')
        }
        else {
            res.sendStatus(403);
        }
    });
});

router.get('/auth', function(req, res, next) {
    var data = {nivo: nivoAutorizacije, korisnickoime: req.cookies.kuki};
    res.send(data);
});

router.get('/logOut', function(req, res, next) {
    res.clearCookie("kuki");
    res.redirect('/');
});

router.get('/forbidden', function(req, res, next) {
    res.render('error');
});

module.exports = router;
