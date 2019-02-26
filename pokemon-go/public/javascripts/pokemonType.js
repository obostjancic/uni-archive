function openEditModal(i) {
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    $('#pokeidEdit').val(row.cells[0].innerHTML);
    $('#pokenameEdit').val(row.cells[1].innerHTML);
    $('#pokerarityEdit').val(row.cells[2].innerHTML);
    $('#pokecatchchanceEdit').val(row.cells[3].innerHTML);
    $('#pokehpEdit').val(row.cells[4].innerHTML);
    $('#pokeattackEdit').val(row.cells[5].innerHTML);
    $('#pokedefenseEdit').val(row.cells[6].innerHTML);
    var button = "<button type='button' class='btn' data-dismiss='modal' onclick='editRow("+i+")'>Edit</button>";
    var footer = document.getElementById('editModalFooter');
    footer.innerHTML = button;
    $('#editPokemonTypeModal').modal();
}

function editRow(i){
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    var dataToSend = {
        pokeidOld: row.cells[0].innerHTML,
        pokeidNew: $('#pokeidEdit').val(),
        pokenameNew: $('#pokenameEdit').val(),
        pokerarityNew: $('#pokerarityEdit').val(),
        pokecatchchanceNew: $('#pokecatchchanceEdit').val(),
        pokehpNew: $('#pokehpEdit').val(),
        pokeattackNew: $('#pokeattackEdit').val(),
        pokedefenseNew: $('#pokedefenseEdit').val()
    };
    $.ajax({
        type: "POST",
        url: "/adminpanel/pokemontype/edit",
        data: dataToSend,
        success: function (data) {
            row.cells[0].innerHTML = dataToSend.pokeidNew;
            row.cells[1].innerHTML = dataToSend.pokenameNew;
            row.cells[2].innerHTML = dataToSend.pokerarityNew;
            row.cells[3].innerHTML = dataToSend.pokecatchchanceNew;
            row.cells[4].innerHTML = dataToSend.pokehpNew;
            row.cells[5].innerHTML = dataToSend.pokeattackNew;
            row.cells[6].innerHTML = dataToSend.pokedefenseNew;
        },
        error: function () {
            alert('Cannot edit data in table!');
        }
    });
}

function deleteRow(i){
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    var dataToSend = {
        pokeid: row.cells[0].innerHTML,
    };
    $.ajax({
        type: "DELETE",
        url: "/adminpanel/pokemontype/delete",
        data: dataToSend,
        success: function (data) {
            row.parentNode.removeChild(row);
        },
        error: function () {
            alert('Cannot delete data from table!');
        }
    });
}

function addPokemonType(){
    var dataToSend = {
        pokeid: document.getElementById('pokeid').value,
        pokename: document.getElementById('pokename').value,
        pokerarity: document.getElementById('pokerarity').value,
        pokecatchchance: document.getElementById('pokecatchchance').value,
        pokehp: document.getElementById('pokehp').value,
        pokeattack: document.getElementById('pokeattack').value,
        pokedefense: document.getElementById('pokedefense').value};
    console.log(dataToSend);
    $.ajax({
        type: "POST",
        url: "/adminpanel/pokemontype/add",
        data: dataToSend,
        success: function (data) {
            var tabela = document.getElementById('pokemonTypeTable');
            var lastRow = tabela.rows.length;
            var newRow  = tabela.insertRow(lastRow);
            newRow.id = "tRow" + lastRow;
            newRow.insertCell(0).innerHTML = dataToSend.pokeid;
            newRow.insertCell(1).innerHTML = dataToSend.pokename;
            newRow.insertCell(2).innerHTML = dataToSend.pokerarity;
            newRow.insertCell(3).innerHTML = dataToSend.pokecatchchance;
            newRow.insertCell(4).innerHTML = dataToSend.pokehp;
            newRow.insertCell(5).innerHTML = dataToSend.pokeattack;
            newRow.insertCell(6).innerHTML = dataToSend.pokedefense;
            newRow.insertCell(7).innerHTML = "<button type='button' class='btn' onclick='openEditModal("+lastRow+")'>Edit</button>";
            newRow.insertCell(8).innerHTML = "<button type='button' class='btn' onclick='deleteRow("+lastRow+")'>Delete</button>";
        },
        error: function () {
            alert('Cannot insert data into table!');
        }
    });
}