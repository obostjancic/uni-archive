var crypto = require('crypto');
var moment = require('moment');

// Utility functions

var util = {
    decipherCookie: function decpiherCookie(kuki) {
        var decipher = crypto.createDecipher('aes192', 'a password');
        var decrypted = decipher.update(kuki, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        var token = JSON.parse(decrypted);
        return token;
    },
    randomLocationInRadius100m: function randomLocationInRadius100m(center){
        cLat = center.lat;
        cLng = center.lng;
        do {
            lat = Math.random() * (2 * 0.00085) + (center.lat - 0.00085);
            lng = Math.random() * (2 * 0.0012) + (center.lng - 0.0012);
        }
        while (getDistanceFromLatLonInKm(cLat, cLng, lat, lng) > 0.09);
        return rez = {lat, lng};
    },
    cipherCookie: function cipherCookie(username){
        var cipher = crypto.createCipher('aes192', 'a password');
        var token = JSON.stringify({username: username, valid: moment().add(1,'days')});
        var encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },
    checkIfInRadius: function checkIfInRadius(lat1, lon1, lat2, lon2){
        if (getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) < 3.0) return true;
        else return false;
    },
    hashPassword: function hashPassword(plainPass) {
        var hash = crypto.createHmac('sha256', 'abcdefg').update(plainPass).digest('hex');
        return hash;
    },
    generatePokemon: function generatePokemon(userLocation, allPokemons) {
        // generate chances array
        var chances = [];
        for (var i = 0; i < allPokemons.length; i++){
            var rarity = allPokemons[i].rarity;
            for (var j = 0; j < rarity; j++){
                chances.push(allPokemons[i].id);
            }
        }
        var randomId = chances[Math.floor(Math.random() * chances.length)]; // select random array element
        var selectedPokemon = allPokemons[randomId - 1]; // select pokemon with random id
        var randomLocation = util.randomLocationInRadius100m(userLocation); // generate random spawn location
        selectedPokemon['lat'] = randomLocation.lat;
        selectedPokemon['lng'] = randomLocation.lng;
        return selectedPokemon;
    }
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

module.exports = util;