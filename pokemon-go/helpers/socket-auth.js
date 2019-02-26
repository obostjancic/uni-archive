/**
 * Created by Javelin on 27.3.2017.
 */

var crypto = require('crypto');
var moment = require('moment');
var util = require('../helpers/util');
var pool = require('../config-postgreSQL');

//Every message gets authorized, works the same way as helpers/authenticator.js

function socketAuth () {
    return function (socket, next) {
        // if no cookie then disconnect
        if (!socket.request.headers.cookie.authCookie){
            console.log("no cookie");
            socket.disconnect(0);
        }
        else {
            //if expired cookie then disconnect
            var token = util.decipherCookie(socket.request.headers.cookie.authCookie);
            if (moment().isAfter(token.valid)) {
                console.log("expired cookie");
                socket.disconnect(0);
            }
            else {
                // if valid cookie, try to update socket id
                pool.query("update player set socketid=$1 where username=$2 returning *", [socket.id, token.username], function (err, result) {
                    if (!result.rows.length) {
                        console.log("not in database");
                        socket.disconnect(0);
                    }
                    else {
                        //if all ok
                        socket.authUser = token.username;
                        next();
                    }
                });
            }
        }
    }
}

module.exports = socketAuth;