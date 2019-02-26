/**
 * Created by Javelin on 8.2.2017.
 */

var express = require('express');
var router = express.Router();
var pool = require('../config-postgreSQL');

const crypto = require('crypto');
const secret = 'abcdefg';

router.get('/', function(req, res, next) {
    res.render('narudzbe');
});

router.get('/artikli', function(req, res, next) {
    var matrica = [];
    var niz = [];
    pool.query('select * from artikli order by tip', function(err, result){
        for (var i = 0; i < result.rows.length; i++){
            niz[i] = result.rows[i];
        }
        for (var i = 0; i < 6; i++){
            matrica[i] = [];
            for (var j = 0; j < 4; j++){
                matrica[i][j] = niz[4*i+j];
            }
        }
        res.send(matrica);
    });
});

router.post('/dajArtikal', function(req, res, next) {
    pool.query('select * from artikli where id=$1', [req.body.idArtikal], function(err, result){
        res.send(result.rows[0]);
        if (err){
            res.sendStatus(400);
        }
    });
});

router.post('/primi', function(req, res, next) {
    pool.query('update sobe set narudzbe=((select narudzbe from sobe where soba =$1)+ $2), profit=((select profit from sobe where soba =$1)+ $2) where soba =$1', [req.body.soba, req.body.suma], function(err, result){
        if (err){
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
