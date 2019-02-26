var crypto = require('crypto');
var moment = require('moment');
var util = require('../helpers/util');
var pool = require('../config-postgreSQL');

function authenticator(settings) {
    return function(req, res, next) {
        var routeToCheck = selectRoute(req, settings);
        if (routeToCheck != ""){
            if (routeToCheck == '/login'){
                if (!validateEmail(req.body.unmLogin)) {
                    res.sendStatus(403);
                    return;
                }
                else {
                    const hash = crypto.createHmac('sha256', settings.hashSecret).update(req.body.passLogin).digest('hex');
                    pool.query("Select * from player where username=$1" , [req.body.unmLogin], function (err, result) {
                        if (result.rows[0].password == hash) {
                            res.cookie('authCookie', util.cipherCookie(req.body.unmLogin));
                            res.redirect('/playermap');
                        }
                        else {
                            res.sendStatus(403);
                        }
                    });
                    return;
                }
            }
            else if (routeToCheck == '/register'){
                if(!validateEmail(req.body.unmRegister)){
                    res.sendStatus(400);
                    return;
                }
                else {
                    var hash = crypto.createHmac('sha256', settings.hashSecret).update(req.body.passRegister).digest('hex');
                    pool.query('insert into player values ($1,$2,$3,$4,0,0,false)', [req.body.unmRegister, req.body.frstnmRegister, req.body.lstnmRegister, hash], function (err, result) {
                        if (err) {
                            console.log("greska");
                            res.sendStatus(400);
                            return;
                        }
                        else {
                            var cipher = crypto.createCipher('aes192', settings.encSecret);
                            var encrypted = cipher.update(req.body.unmRegister, 'utf8', 'hex');
                            encrypted += cipher.final('hex');
                            res.cookie('authCookie', encrypted);
                            res.redirect('/');
                            return;
                        }
                    });
                }
                return;
            }
            if (!req.cookies.authCookie) {
                res.sendStatus(403);
                return;
            }
            var token = util.decipherCookie(req.cookies.authCookie);
            if (moment().isAfter(token.valid)) {
                res.sendStatus(403);
                return;
            }
            pool.query('Update player set isonline=true where username=$1 returning username', [token.username], function (err, result) {
                if (result.rows[0].length == 0)
                    res.sendStatus(403);
                else {
                    req.authUser = result.rows[0].username;
                    next();
                }
            });
        }
        else
            next();
    }
}

function selectRoute(req, settings){
    for (var i = 0; i < settings.routes.length; i++) {
        if (req.path.toLowerCase() == settings.routes[i].toLowerCase()) { // case sensitive
            return settings.routes[i];
        }
    }
    return "";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



module.exports = authenticator;