function openEditModal(i) {
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    $('#unmEdit').val(row.cells[0].innerHTML);
    $('#frstnmEdit').val(row.cells[1].innerHTML);
    $('#lstnmEdit').val(row.cells[2].innerHTML);
    var button = "<button type='button' class='btn' data-dismiss='modal' onclick='editRow("+i+")'>Edit</button>";
    var footer = document.getElementById('editModalFooter');
    footer.innerHTML = button;
    $('#editPlayerModal').modal();
}

function editRow(i){
    var rowID = "tRow" + i;
    var row = document.getElementById(rowID);
    var dataToSend = {
        action: 'edit',
        unameOld: row.cells[0].innerHTML,
        unameNew: $('#unmEdit').val(),
        firstnameNew: $('#frstnmEdit').val(),
        lastnameNew: $('#lstnmEdit').val()
    };
    $.ajax({
        type: "POST",
        url: "/adminpanel/player/edit",
        data: dataToSend,
        success: function (data) {
            console.log(data);
            row.cells[0].innerHTML = data.username;
            row.cells[1].innerHTML = data.firstname;
            row.cells[2].innerHTML = data.lastname;
            row.cells[3].innerHTML = data.lat;
            row.cells[4].innerHTML = data.lon;
            row.cells[5].innerHTML = data.isonline;
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
        uname: row.cells[0].innerHTML,
    };
    $.ajax({
        type: "DELETE",
        url: "/adminpanel/player/delete",
        data: dataToSend,
        success: function (data) {
            row.parentNode.removeChild(row);
        },
        error: function () {
            alert('Cannot delete data from table!');
        }
    });
}

function addPlayer(){
    var dataToSend = {
        uname: document.getElementById('unm').value,
        firstname: document.getElementById('frstnm').value,
        lastname: document.getElementById('lstnm').value,
        password: document.getElementById('pass').value};
    $.ajax({
        type: "POST",
        url: "/adminpanel/player/add",
        data: dataToSend,
        success: function (data) {
            var tabela = document.getElementById('playerTable');
            var lastRow = tabela.rows.length;
            var newRow  = tabela.insertRow(lastRow);
            newRow.id = "tRow" + lastRow;
            newRow.insertCell(0).innerHTML = dataToSend.uname;
            newRow.insertCell(1).innerHTML = dataToSend.firstname;
            newRow.insertCell(2).innerHTML = dataToSend.lastname;
            newRow.insertCell(3).innerHTML = 0;
            newRow.insertCell(4).innerHTML = 0;
            newRow.insertCell(5).innerHTML = false;
            newRow.insertCell(6).innerHTML = "<button type='button' class='btn' onclick='openEditModal("+lastRow+")'>Edit</button>";
            newRow.insertCell(7).innerHTML = "<button type='button' class='btn' onclick='deleteRow("+lastRow+")'>Delete</button>";
        },
        error: function () {
            alert('Cannot insert data into table!');
        }
    });
}