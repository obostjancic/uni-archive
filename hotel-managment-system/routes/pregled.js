/**
 * Created by Javelin on 8.2.2017.
 */

var express = require('express');
var router = express.Router();
var pool = require('../config-postgreSQL');

const crypto = require('crypto');
const secret = 'abcdefg';

router.get('/', function(req, res, next) {
    res.render('pregled');
});

router.get('/show/korisnici', function(req, res, next) {
    var niz = [];
    pool.query('select * from korisnici order by nivo desc', function(err, result){
        for (var i = 0; i < result.rows.length; i++){
            niz[i] = result.rows[i];
        }
        console.log(niz);
        res.send(niz);
    });
});

router.get('/show/sobe', function(req, res, next) {
    var niz = [];
    pool.query('select * from sobe where zauzeta=true order by sobe', function(err, result){
        for (var i = 0; i < result.rows.length; i++){
            niz[i] = result.rows[i];
        }
        res.send(niz);
    });
});

router.get('/show/statistika', function(req, res, next) {
    var niz = [];
    pool.query('select (select count(*) from sobe where zauzeta=true) UNION ALL(SELECT count(*) from sobe) UNION ALL' +
    '(SELECT sum(gosti) from sobe) UNION ALL (select sum(kreveti) from sobe) UNION ALL (SELECT sum(profit) from sobe)', function(err, result) {
        for (var i = 0; i < result.rows.length; i++){
            niz[i] = result.rows[i].count;
        }
        res.send(niz);
    });
});

router.post('/omoguci', function(req, res, next) {
    var niz = [];
    pool.query('update korisnici set omogucen=true where korisnickoime=$1', [req.body.korisnickoime] ,function(err, result) {
        if (err){
            res.send(500);
        }
        else
            res.send(200);
    });
});

router.post('/onemoguci', function(req, res, next) {
    var niz = [];
    pool.query('update korisnici set omogucen=false where korisnickoime=$1', [req.body.korisnickoime] ,function(err, result) {
        if (err){
            res.send(500);
        }
        else
            res.send(200);
    });
});

module.exports = router;
