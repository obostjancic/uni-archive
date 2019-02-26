function makeConnection() {
    var selectedPokemon = document.getElementById("pokelist");
    var selectedPokemonName = selectedPokemon.options[selectedPokemon.selectedIndex].text;
    var dataToSend = {
        uname: document.getElementById('unmConnect').value,
        pokename: selectedPokemonName,
        customname: document.getElementById('customNameConnect').value};
    $.ajax({
        type: "POST",
        url: "/adminpanel/playerpokemon/add",
        data: dataToSend,
        success: function (data) {
        },
        error: function () {
            alert('Cannot insert data into table!');
        }
    });
}

function showConnections() {
    var selectedPokemon = document.getElementById("pokelist");
    var selectedPokemonName = selectedPokemon.options[selectedPokemon.selectedIndex].text;
    var dataToSend = {
        action: 'show',
        uname: document.getElementById('unmShow').value}
    if (!dataToSend.uname) alert("Enter player username!");
    else {
        $.ajax({
            type: "POST",
            url: "/adminpanel/playerpokemon/show",
            data: dataToSend,
            success: function (data) {
                $("#playerPokemonTableBody").empty();
                document.getElementById('playerHeading').innerHTML = dataToSend.uname;
                var tabela = document.getElementById('playerPokemonTableBody');
                for (var i = 0; i < data.length; i++) {
                    var lastRow = tabela.rows.length;
                    var newRow = tabela.insertRow(i);
                    newRow.id = "tRow" + i;
                    newRow.insertCell(0).innerHTML = data[i].pokemontypeid;
                    newRow.insertCell(1).innerHTML = data[i].name;
                    newRow.insertCell(2).innerHTML = data[i].customname;
                    newRow.insertCell(3).innerHTML = "<button type='button' class='btn' onclick='deleteRow(" + i + ")'>Delete</button>";
                }
                $('#connectionList').animate({opacity: "1"}, 200);
            },
            error: function () {
                alert('Cannot show data from table!');
            }
        });
    }
}

function deleteRow(i){
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    var heading = document.getElementById('playerHeading');

    var dataToSend = {
        action: 'delete',
        uname: heading.innerHTML,
        pokeid: row.cells[0].innerHTML
    };
    $.ajax({
        type: "DELETE",
        url: "/adminpanel/playerpokemon/delete",
        data: dataToSend,
        success: function (data) {
            row.parentNode.removeChild(row);
        },
        error: function () {
            alert('Cannot delete data from table!');
        }
    });
}