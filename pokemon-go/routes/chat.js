var express = require('express');
var router = express.Router();
//var io = require('../app').io;

var http = require('http').Server(express());
var io = require('socket.io')(http);

router.get('/', function (req, res) {
    res.render('chat');

});
var users = [];
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUsername', function(data){
        console.log(data);
        if(users.indexOf(data) > -1){
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
        else{
            users.push(data);
            socket.emit('userSet', {username: data});
        }
    });
    socket.on('msg', function(data){
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
});

http.listen(3001, function(){
    console.log('listening on localhost:3001');
});

module.exports = router;