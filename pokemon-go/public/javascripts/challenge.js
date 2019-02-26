/**
 * Created by Javelin on 27.3.2017.
 */
var socket = io();

$('document').ready(function(){
    socket.on('deliverChallenge', function(data){
        alert('You have received a new challenge');
        addRowToChallengesTable(data);
    });
    socket.on('startFight', function(data){makeFightModal(data);});
    socket.on('fight', function(data){ removeHpBars(data);});
    socket.on('fightOver', function (data) {declareWinner(data);});
});

function sendChallenge(username){
    console.log(socket.id);
    socket.emit('sendChallenge', {recipient: username});
    socket.on('sendChallenge-ack', function(data){
        console.log("dobio ack");
        if (data.status == 400){
            alert("challenge not sent, status code: 400 - bad request");
        }
        $('#playerInfoModal').modal('hide');
    });
}

socket.on("deliverPokemons", function(data){
    makeChoosePokemonModal(data);
});

function addRowToChallengesTable(data) {
    var tbody = document.getElementById('tableChallengesBody');
    for (var i = 0; i < data.length; i++){
        var tr = document.createElement('tr');
        console.log(data[i].id);
        tr.id = "t-row-"+data[i].id;
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var challenge = {id: data[i].id, sender: data[i].sender};
        td1.innerHTML = data[i].sender;
        td2.innerHTML = "<button type='button' onclick='acceptChallenge("+data[i].id+")'>Accept</button>";
        td3.innerHTML = "<button type='button' onclick='declineChallenge("+data[i].id+")'>Decline</button>";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}

function acceptChallenge(id){
    console.log("prihvatam");
    socket.emit("acceptChallenge", {id: id, response: 'accept'});
    return;
}

function selectPokemonForBattle(id){
    console.log(id);
    var selectedPokemon = document.getElementById("choosePokemonList");
    var selectedPokemonid = selectedPokemon.options[selectedPokemon.selectedIndex].value;
    socket.emit("pokemonChosen", {challengeid: id, pokemonid: parseInt(selectedPokemonid)});
    $('#choosePokemonModal').modal('hide');
}

function makeChoosePokemonModal(data){
    var options = "";
    console.log(data);
    for (var i = 0; i < data.pokemons.length; i++){
        options += '<option value="'+data.pokemons[i].pokemontypeid+'">'+data.pokemons[i].name+'</option>';
    }
    $('#choosePokemonList').html(options);
    $('#choosePokemonModal').modal();
    var footer = document.getElementById('choosePokemonModalFooter');
    var button = document.createElement('button');
    button.type = 'button';
    button.onclick = function(){selectPokemonForBattle(data.challengeid)};
    button.innerHTML = "Fight!";
    footer.appendChild(button);
    var row = document.getElementById("t-row-"+ data.challengeid);
    if (row) {
        row.parentElement.removeChild(row);
    }
}

function makeFightModal(data){
    $('#fightModalHeading').html(data.senderPokemon.name + " vs " + data.recipientPokemon.name);
    var leftPicSrc = "../all-pokemons/" + data.senderPokemon.name.toLocaleLowerCase() + ".png";
    var rightPicSrc = "../all-pokemons/" + data.recipientPokemon.name.toLocaleLowerCase() + ".png";
    $('#leftPic').html('<img id="leftPictureTurn" src="'+leftPicSrc+'">');
    $('#rightPic').html('<img src="'+rightPicSrc+'">');
    var htmlHP = "";
    for (var i = 0; i < data.senderPokemon.hp; i++){
        if (i % 10 == 0 && i != 0) htmlHP += '<div class="spacer"></div>';
        htmlHP += '<div class=hpBox></div>';
    }
    $('#leftHP').html(htmlHP);
    htmlHP = "";
    for (var i = 0; i < data.recipientPokemon.hp; i++){
        if (i % 10 == 0 && i != 0) htmlHP += '<div class="spacer"></div>';
        htmlHP += '<div class=hpBox></div>';
    }
    $('#rightHP').html(htmlHP);
    $('#fightModal').modal();
    socket.emit("readyForFight", data.challengeid);
}

function removeHpBars(data){
    if (data.defender == "recipientPokemon"){
        $('#rightHP > .hpBox').slice(-1 * data.damageDelivered).remove();
        $('#rightDI').html("-"+ data.damageDelivered);
        $('#rightDI').animate({opacity: 1}, 350);
        $('#rightDI').animate({opacity: 0.01}, 1500);
    }
    else {
        $('#leftHP > .hpBox').slice(-1 * data.damageDelivered).remove();
        $('#leftDI').html("-"+ data.damageDelivered);
        $('#leftDI').animate({opacity: 1}, 350);
        $('#leftDI').animate({opacity: 0.01}, 1500);
    }

}

function declareWinner(data){
    if (data == 'left'){
        $('#leftDI').animate({opacity: 1}, 350);
        $('#leftDI').html("WINNER!");
    }
    else {
        $('#rightDI').animate({opacity: 1}, 350);
        $('#rightDI').html("WINNER!");
    }
    setTimeout(function() {  $('#fightModal').modal('hide') }, 2000);
}