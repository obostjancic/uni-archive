/**
 * Created by Javelin on 4.3.2017.
 */

var express = require('express');
var router = express.Router();
var pool = require('../config-postgreSQL');
var binder = require('model-binder');

router.get('/', function (req,res){
    res.render('playerMap');
});

router.post('/updateplayerlocation', function (req,res){
    var player = new (require('../models/player.js'))();
    player.lat = req.body.lat;
    player.lon = req.body.lng;
    player.username = req.authUser;
    player.updateLocation(function () {
        res.sendStatus(200);
    }, function () {
        res.sendStatus(400);
    })
});

router.get('/showtable', function (req,res){
    var pokemon = new (require('../models/pokemon.js'))();
    pokemon.user = req.authUser;
    pokemon.getByUser(function (data) {
        res.send(data);
    }, function (err) {
        res.sendStatus(400);
    });
});

router.post('/spawnpokemon', binder(require('../models/pokemon.js')), function (req, res){
    var pokemon = req.requestModel;
    pokemon.user = req.authUser;
    pokemon.spawn({lat: req.body.lat, lng: req.body.lng
        }, function (data) {
            res.send(data);
        }, function (err) {
            res.sendStatus(400);
    });
});

router.post('/getnearbyplayers', function (req,res){
    var player = new (require('../models/player.js'))();
    player.username = req.authUser;
    player.lat = req.body.lat;
    player.lon = req.body.lng;
    player.getNearby(function (data) {
        res.send(data);
    }, function (err) {
        res.sendStatus(400);
    });
});

router.post('/catchpokemon', binder(require('../models/pokemon.js')), function (req, res){
    var pokemon = req.requestModel;
    pokemon.id = req.body.id; //ne treba
    pokemon.user = req.authUser; //poslati i pokeid i sentid
    pokemon.catch(function (data) {
        res.send(data);
    }, function (err) {
        res.sendStatus(400);
    });
});

router.post('/givecustomname', binder(require('../models/pokemon.js')), function (req, res){
    var pokemon = req.requestModel;
    pokemon.customName = req.body.customName;
    pokemon.user = req.authUser;
    pokemon.pokemontypeid = req.body.pokemontypeid;
    pokemon.giveCustomName(function () {
        res.sendStatus(200);
    }, function (err) {
        res.sendStatus(400);
    });
});

router.get('/logout', function (req, res) {
    var player = new (require('../models/player.js'))();
    player.username = req.authUser;
    player.logOut(function(){
       res.redirect('/');
    }, function () {
        res.sendStatus(400);
    });

});

module.exports = router;