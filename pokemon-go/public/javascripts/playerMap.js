$('document').ready(function(){
    $.ajax({
        type: "GET",
        url: "/playermap/showtable",
        success: function (data) {
            var tbody = document.getElementById('playerPokemons');
            for (var i = 0; i < data.length; i++){
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                td1.innerHTML = data[i].name;
                td2.innerHTML = data[i].customname;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
            }
            initMap();
        },
        error: function () {
            alert('Cannot show data from table!');
        }
    });
});

var pokeMarkers = [];
var map;

function initMap() {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: latlng
    });
    navigator.geolocation.getCurrentPosition(function (position) {
        var userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(userPosition);
        var ikonica = {
            url: "../you-marker.png",
            size: new google.maps.Size(48,48),
            origin: new google.maps.Point(0,0)
        };
        new google.maps.Marker({
            position: userPosition,
            map: map,
            icon: ikonica
        });
        new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.1,
            map: map,
            center: userPosition,
            radius: 100
        });
        new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.05,
            map: map,
            center: userPosition,
            radius: 3000
        });
        updateUserLocation(userPosition);
        spawnPokemon(userPosition,map);
        setInterval(function(){spawnPokemon(userPosition,map)}, 60000);
        showNearbyPlayers(userPosition, map);
    });
}

function updateUserLocation(pos){
    console.log("saljem: ", pos);
    $.ajax({
        type: "POST",
        url: "/playermap/updateplayerlocation",
        data: pos,
        success: function(){
        },
        error: function () {
        }
    });
}

function spawnPokemon(pos, map){
    var dataTosend = pos;
    $.ajax({
        type: "POST",
        url: "/playermap/spawnpokemon",
        data: dataTosend,
        success: function(data){
            id = data.sentpokemonsid;
            var pokeicon = {
                url: "../pokemoni.png",
                size: new google.maps.Size(80,80),
                origin: new google.maps.Point(data.pokemon.x * 80, data.pokemon.y * 80)
            };
            marker = new google.maps.Marker({
                position: {lat: data.pokemon.lat, lng: data.pokemon.lng},
                id: data.sentpokemonsid,
                map: map,
                icon: pokeicon
            });
            pokeMarkers.push(marker);
            marker.addListener('click', function() {
                $('#catchPokemonModalHeading').text(data.pokemon.name);
                var ime = data.pokemon.name.toLocaleLowerCase() + ".png";
                $('.wrapper-img').html('<img src="../all-pokemons/'+ime+'" class="bigPicPokemon">');
                $('#pokemonInfo').html('<p>HP: '+data.pokemon.hp+'</p><br /><p>Attack: '+data.pokemon.attack+'</p><br /><p>Defense: '+data.pokemon.defense+'</p>')
                $('#catchPokemonModalFooter').html('<button onclick="catchPokemon('+data.sentpokemonsid+')">Catch</button>');
                $('#catchPokemonModal').modal();
            });
        },
        error: function (data) {
        }
    });
}

function showNearbyPlayers(userPosition, map){
    $.ajax({
        type: "POST",
        url: "/playermap/getnearbyplayers",
        data: userPosition,
        success: function(data) {
            for (var i = 0; i < data.length; i++){
                var playerUsername = data[i].username;
                marker = new google.maps.Marker({
                    position: {lat: data[i].lat+ 0.0005, lng: data[i].lon},
                    map: map,
                    zIndex: 10000,
                });

                marker.addListener('click', function() {
                    playerInfo(playerUsername);
                });
            }
        },
        error: function (data) {
        }
    });
}

function catchPokemon(id) {
    var dataTosend = {id: id};
    $.ajax({
        type: "POST",
        url: "/playermap/catchpokemon",
        data: dataTosend,
        success: function(data){
            if (data.caught == true){
                var msg = "You caught a pokemon: " + data.name;
                alert(msg);
                var customName = prompt("How shall we name it?");
                if (customName != "") {
                    giveNameToPokemon(data.pokemontypeid, customName);
                }
                var tbody = document.getElementById('playerPokemons');
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                td1.innerHTML = data.name;
                td2.innerHTML = customName;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
            }
            else {
                alert("Pokemon has escaped!");
            }
            $("#catchPokemonModal").modal('hide');
            removeMarker(pokeMarkers, id, map);
        },
        error: function (data) {
            alert('Pokemon is not here anymore');
            $("#catchPokemonModal").modal('hide');
            removeMarker(pokeMarkers, id, map);
        }
    });
}

function giveNameToPokemon(pokemontypeid, customName) {
    var dataTosend = {customName: customName, pokemontypeid: pokemontypeid};
    $.ajax({
        type: "POST",
        url: "/playermap/givecustomname",
        data: dataTosend,
        success: function(data){
        },
        error: function (data) {
        }
    });
}

function playerInfo(username) {
    $("#playerInfoModal").modal('show');
    $("#playerInfoModalHeading").text("Player: " + username);
    $("#playerInfoModalFooter").html('<button onclick="sendChallenge(\''+username+'\')">Send challenge</button>');
}

function removeMarker(pokeMarkers, markerId, map){
    for (var i = 0; i < pokeMarkers.length; i++){
        if (pokeMarkers[i].id == markerId){
            pokeMarkers[i].setMap(null);
            return;
        }
    }
}