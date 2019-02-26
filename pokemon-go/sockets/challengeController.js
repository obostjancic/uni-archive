/**
 * Created by Javelin on 27.3.2017.
 */
var pool = require('../config-postgreSQL');


//MAIN
function challengeController (io) {
    io.on("connect", function (socket) {
        updateUserSocketId(socket);
        console.log("A user",socket.authUser, "connected with id:", socket.id);
        socket.on("sendChallenge", function (data) {
            deliverChallenge(socket, data);
            socket.join('fightRoom');
        });
        socket.on("acceptChallenge", function (data){
            recipientAccepted(data);
            socket.join('fightRoom');
            //io.in('fightRoom').emit('startFight', 'the fight may begin');
            deliverPokemons(socket, data);
        });
        socket.on("pokemonChosen", function (data){
            selectFighters(io, socket, data);
        });
    });
}

//------------ Helper functions

function updateUserSocketId(socket){
    var player = new (require('../models/player.js'))();
    player.username = socket.authUser;
    player.socketid = socket.id;
    // update database
    player.updateSocketId(function(data){
    }, function (err) {
        console.log(err);
    });
}

function deliverChallenge(socket, data){
    var challenge = new (require('../models/challenge.js'))();
    challenge.sender = socket.authUser;
    challenge.recipient = data.recipient;
    challenge.sendersocketid = socket.id;
    challenge.create(function (data) {
        socket.emit("sendChallenge-ack", {status: 200}); //ack goes to sender that challenge was received
        var player = new (require('../models/player.js'))();
        player.username = challenge.recipient;
        player.getSocketId(function (data) { // find the recipient
            var recipientSocketId = data.socketid;
            challenge.recipientsocketid = data.socketid;
            challenge.getByRecipient(function(data){
                console.log(recipientSocketId, data);
                socket.to(recipientSocketId).emit("deliverChallenge", data); // deliver challenge to recipient
            },
            function (err) {
                console.log(err);
            });

        },  function (err) {
            console.log(err);
        });
    }, function (err) {
        socket.emit("sendChallenge-ack", {status: 400}); //error message to sender
    });
}

function recipientAccepted(data){
    var challenge = new (require('../models/challenge.js'))();
    challenge.id = data.id;
    challenge.accept(function(data){

    }, function (err) {
        console.log(err);
    });
}

function deliverPokemons(socket, data){
    var challenge = new (require('../models/challenge.js'))();
    challenge.id = data.id;
    challenge.getPlayersById(function(data){
        var sender = {username: data.sender, socketid: data.sendersocketid};
        var recipient = {username: data.recipient, socketid: data.recipientsocketid};
        var player = new (require('../models/player.js'))();
        player.username = sender.username;
        player.getPokemons(function (data) {
            //deliver pokemons to sender so he can choose one for fight
            var response = {challengeid: challenge.id, pokemons: data};
            socket.to(sender.socketid).emit("deliverPokemons", response);
        },  function (err) {
            console.log(err);
        });
        player.username = recipient.username;
        player.getPokemons(function (data) {
            //deliver recipients pokemons so he can choose one for fight
            var response = {challengeid: challenge.id, pokemons: data};
            socket.emit("deliverPokemons", response);
        },  function (err) {
            console.log(err);
        });
    },  function (err) {
        console.log(err);
    });
}

function selectFighters(io, socket, data) {
    var challenge = new (require('../models/challenge.js'))();
    challenge.player = socket.authUser;
    challenge.id = data.challengeid;
    // if both players have chosen their pokemons then start the fight
    challenge.selectFighters(socket.authUser, data.pokemonid, function (data) {
        if (data.senderpokemontype != null && data.recipientpokemontype != null){
            startFight(io, challenge.id, data.senderpokemontype, data.recipientpokemontype);
        }
    }, function (err) {
        console.log(err);
    });
}

//TODO try to get both pokemons with one query
function startFight(io, challengeid, senderpoke, recipientpoke){
    var pokemon = new (require('../models/pokemon.js'))();
    var senderPokemon;
    pokemon.id = senderpoke;
    //get senders pokemon data (name hp atack defense...)
    pokemon.getById(function (data) {
        senderPokemon = data;
        pokemon.id = recipientpoke;
        //get recipients pokemon data (name hp atack defense...)
        pokemon.getById(function (data) {
            var recipientPokemon = data;
            //Broadcast in room (sends data to both players)
            io.in('fightRoom').emit("startFight",  {challengeid: challengeid,
                                                    senderPokemon: senderPokemon,
                                                    recipientPokemon: recipientPokemon});
            emitFight(io, challengeid, senderPokemon, recipientPokemon);
        },  function (err) {
            console.log(err);
        });
    },  function (err) {
        console.log(err);
    });

}

function emitFight(io, challengeid, senderPokemon, recipientPokemon){
    var fightLogic = new (require('../helpers/fightLogic.js'))();
    var fightResult = fightLogic.getTurns(senderPokemon, recipientPokemon);
    var turns = fightResult.turns;
    var winner = fightResult.winner;
    var i = 0;
    var emitLoop = setInterval(function() {
        io.in('fightRoom').emit('fight', turns[i]);
        i++;
        if (i == turns.length){
            clearInterval(emitLoop);
            io.in('fightRoom').emit('fightOver', winner);
        }
    }, 2500);

}

module.exports = challengeController;

