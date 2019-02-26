/**
 * Created by Javelin on 5.2.2017.
 */
var express = require('express');
var router = express.Router();
var pool = require('../config-postgreSQL');

const crypto = require('crypto');
const secret = 'abcdefg';

router.get('/', function(req, res) {
    res.render('sobe');
});

router.get('/show', function(req, res) {
    var niz = [];
    pool.query('select * from sobe order by soba', function(err, result){
        for (var i = 0; i < result.rows.length; i++){
            niz[i] = result.rows[i];
        }
        var nivo = {nivo: nivoAutorizacije};
        niz[result.rows.length] = nivo;
        res.send(niz);
    });
});

router.post('/info', function(req, res) {
    var niz;
    pool.query('select * from sobe where soba=$1', [req.body.broj], function(err, result){
        for (var i = 0; i < result.rows.length; i++){
            niz = result.rows[0];
        }
        res.send(niz);
    });
});

router.post('/checkIn', function(req, res) {
    var profit;
    var gost = "gost"+req.body.soba;
    const hash = crypto.createHmac('sha256', secret).update(gost).digest('hex');
    pool.query("select cijena from sobe where soba=$1", [req.body.soba],function (err,result) {
        if (err) console.log('greska');
        profit = req.body.duzBor * (result.rows[0].cijena + req.body.pansion * 25);
        console.log(req.body.gost);
        pool.query("insert into korisnici values ($1,$2,$3,$4,$5)", [gost, req.body.gost, hash, 1, true],function (err,result) {});
        pool.query("update sobe set zauzeta=true, gost=$2, profit=$3, gosti=$4, pansion=$5 where soba=$1", [req.body.soba, req.body.gost, profit, req.body.brGostiju, req.body.pansion], function (err, result) {
            if (err)
                res.sendStatus(400);
            else {

                res.sendStatus(200);
            }
        });
    });
});

router.post('/checkOut', function(req, res) {
    pool.query("delete from korisnici where korisnickoime=$1", ['gost'+req.body.soba], function(err,result) {});
    pool.query("select * from sobe where soba=$1", [req.body.soba], function(err, resultProfit){
        pool.query("update sobe set zauzeta=false, gost=NULL, gosti=0, profit=0, pansion=0, narudzbe=0 where soba=$1", [req.body.soba], function(err, result){
            if (err)
                res.sendStatus(400);
            else {
                var rez ={racun: resultProfit.rows[0].profit, cijena: resultProfit.rows[0].cijena, pansion: resultProfit.rows[0].pansion, narudzbe: resultProfit.rows[0].narudzbe};
                res.send(rez);
            }
        });
    })

});

module.exports = router;