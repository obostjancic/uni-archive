/**
 * Created by Javelin on 6.2.2017.
 */

var globalData;


function prikaziNavbar(ovlastenje) {
    if (ovlastenje.nivo == 2){
        $('#navigacija-lijevo').html('<li><a href="/">Početna</a></li>' +
                              '<li><a href="#">O nama</a></li>' +
                              '<li><a href="#">Rezervacije</a></li>' +
                              '<li class="active"><a href="/sobe">Sobe</a></li>');
        $('#navigacija-desno').html('<li><p>Dobrodošli: recepcija</p></li>' +
            '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
    }
    else if (ovlastenje.nivo == 3){
        $('#navigacija-lijevo').html('<li><a href="/">Početna</a></li>' +
            '<li><a href="#">O nama</a></li>' +
            '<li><a href="#">Rezervacije</a></li>' +
            '<li class="active"><a href="/sobe">Sobe</a></li>' +
            '<li><a href="/pregled">Pregled</a></li>');
        $('#navigacija-desno').html('<li><p>Dobrodošli: admin</p></li>' +
            '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
    }
}

$(document).ready(function refresh() {
    $('#slajder').css('display', 'none');
    $.ajax({
        type: "get",
        url: "/sobe/show",
        success: function (data) {
            prikaziNavbar(data[data.length-1]);
            globalData = data;
            var red = 1;
            for (var i = 0; i < data.length-1; i++){
                var broj = data[i].soba;
                var sveSobe = $('#sve-sobe');
                if (Math.floor(broj/100) > red){
                    var hr = document.createElement("div");
                    hr.className = "col-sm-12 razmak";
                    red += 1;
                    sveSobe.append(hr);
                }
                var button = document.createElement("button");
                var soba = document.createElement("div");
                if (broj == 501) {
                    soba.className = "col-sm-12";
                }
                else {
                    soba.className = "col-sm-3";
                }
                if (data[i].zauzeta)
                    button.style.backgroundColor = "rgba(205,92,92, 0.8)";
                button.className = 'btn soba-button';
                button.id = "soba-" + broj;
                button.setAttribute('onclick', 'infoSoba('+broj+')');
                button.innerHTML = broj;
                soba.appendChild(button);
                sveSobe.append(soba);
            }
        },
        error: function () {
            alert('Greska!');
        }
    });
});

function otkazi(){
    clear();
    $('#slajder').animate({width:'toggle'},100);
}

function clear(){
    $('.slajder-naslov').empty();
    $('.slajder-sadrzaj').empty();
    $('.slajder-footer').empty();

}

function infoSoba(broj) {
    clear();
    var selektovanaSoba;
    for (var i = 0; i < globalData.length; i++){
        if (broj == globalData[i].soba){
            selektovanaSoba = globalData[i];
            break;
        }
    }
    $('.slajder-naslov').text('Soba: ' + selektovanaSoba.soba);
    var gostInfo, pansionInfo;
    if (selektovanaSoba.gost == null) gostInfo = "";
    else gostInfo = selektovanaSoba.gost;
    if (selektovanaSoba.gost == null) pansionInfo = "";
    else if (selektovanaSoba.pansion == 0) pansionInfo = "SC";
    else if (selektovanaSoba.pansion == 1) pansionInfo = "HB";
    else if (selektovanaSoba.pansion == 2) pansionInfo = "FB";

    var info = '<h4 id="info-kapacitet">Kapacitet: '+ selektovanaSoba.kreveti +'</h4><br /><h4 id="info-cijena">Cijena: ' + selektovanaSoba.cijena + ' KM</h4><br />' +
               '<h4 id="info-gost">Gost: '+ gostInfo +'</h4><br /><h4 id="info-brojGostiju">Broj gostiju: ' + selektovanaSoba.gosti + '</h4><br />' +
               '<h4 id="info-pansion">Pansion: '+pansionInfo+'</h4><br /><h4 id="info-duzBor"></h4>';
    $('.slajder-sadrzaj').html(info);

    var btn = document.createElement('button');
    var otkazi = document.createElement('button');
    btn.className = 'slajder-button';
    otkazi.className = 'slajder-button';
    otkazi.innerHTML = 'Otkazi';
    otkazi.setAttribute('onclick', 'otkazi()');
    if (selektovanaSoba.zauzeta){
        btn.id = 'btn-check-out';
        btn.innerHTML = 'Check out';
        btn.setAttribute('onclick', 'checkOut('+selektovanaSoba.soba+')');
    }
    else {
        btn.id = 'btn-check-in';
        btn.innerHTML = 'Check in';
        btn.setAttribute('onclick', 'checkIn('+selektovanaSoba.soba+')');

    }
    $('#asd').append(btn);
    $('#asd').append(otkazi);
    $('#slajder').animate({width:'toggle'}, 200, 'linear');
}



function checkIn(brojSobe) {
    var selektovanaSoba;
    for (var i = 0; i < globalData.length; i++){
        if (brojSobe == globalData[i].soba){
            selektovanaSoba = globalData[i];
            break;
        }
    }
    document.getElementById('info-gost').innerHTML = 'Gost: <input type="text" id="check-in-gost">';
    var brG = document.getElementById('info-brojGostiju');
    brG.innerHTML = 'Broj osoba: ';
    for (var i = 0; i < selektovanaSoba.kreveti; i++){
        if (i == 0)
            brG.innerHTML += ' <input type="radio" checked="checked" name="radio-button" value="'+(i+1)+'"> '+(i+1);
        else
            brG.innerHTML += ' <input type="radio" name="radio-button" value="'+(i+1)+'"> '+(i+1);
    }
    document.getElementById('info-duzBor').innerHTML = 'Duzina boravka: <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" id="check-in-duzBor" size="4">';
    var brG = document.getElementById('info-brojGostiju');
    brG.innerHTML = 'Broj osoba: ';
    for (var i = 0; i < selektovanaSoba.kreveti; i++){
        brG.innerHTML += ' <input type="radio" name="radio-button" value="'+(i+1)+'">'+(i+1);
    }
    var pansion = document.getElementById('info-pansion');
    pansion.innerHTML = 'Pansion: <br />';
    pansion.innerHTML += '<input type="radio" checked="checked" name="radio-button-pansion" value="0"> SC (0 KM)<br />' +
                         '<input type="radio" name="radio-button-pansion" value="1"> HB (25 KM)<br />' +
                         '<input type="radio" name="radio-button-pansion" value="2"> FB (50 KM)<br />';

    var btn = document.getElementById('btn-check-in');

    btn.setAttribute('onclick', 'checkInSend('+selektovanaSoba.soba+')');

}

function checkInSend(brojSobe) {
    var btn = document.getElementById('btn-check-in');
    var gost = $('#check-in-gost').val();
    var brGostiju = document.querySelector('input[name="radio-button"]:checked').value;
    var pansion = document.querySelector('input[name="radio-button-pansion"]:checked').value;
    var duzBor = $('#check-in-duzBor').val();
    console.log(brGostiju);
    otkazi();
    var selektovanaSoba;
    for (var i = 0; i < globalData.length; i++){
        if (brojSobe == globalData[i].soba){
            selektovanaSoba = globalData[i];
            break;
        }
    }

    var dataToSend = {soba: selektovanaSoba.soba, gost: gost, brGostiju: brGostiju, duzBor: duzBor, pansion: pansion};
    $.ajax({
        type: "post",
        url: "/sobe/checkIn",
        data: dataToSend,
        success: function (data) {
            $('#soba-'+ selektovanaSoba.soba).css('background-color', 'rgba(205,92,92, 0.8)');
            selektovanaSoba.gost = gost;
            selektovanaSoba.gosti = brGostiju;
            selektovanaSoba.zauzeta = true;
            selektovanaSoba.pansion = dataToSend.pansion;
        },
        error: function () {
            alert('Greska Check in');
        }
    });
}

function checkOut(soba) {
    var selektovanaSoba;
    for (var i = 0; i < globalData.length; i++){
        if (soba == globalData[i].soba){
            selektovanaSoba = globalData[i];
            break;
        }
    }
    var dataToSend = {soba: soba};
    $.ajax({
        type: "post",
        url: "/sobe/checkOut",
        data: dataToSend,
        success: function (data) {
            console.log(data);
            console.log
            var brDana = (data.racun - data.narudzbe) / (data.cijena + data.pansion * 25);
            $('#racun-text').html("Iznos za naplatu: <br /><br />"+
                "<h3 class=''>Cijena sobe: " + data.cijena + " KM * " + brDana + " = " + data.cijena*brDana+ " KM</h3>"+
                "<h3 class=''>Pansion: " + data.pansion*25 + " KM * " + brDana + " = " + 25*data.pansion*brDana + " KM </h3>" +
                "<h3 class=''>Posluga u sobu: " + data.narudzbe + " KM </h3>" +
                "<hr /> "+data.racun+" KM");
            $('#racunModal').modal();
            $('#soba-'+soba).css('background-color', 'rgba(0, 158, 96, 0.8)');
            selektovanaSoba.gost = null;
            selektovanaSoba.gosti = 0;
            selektovanaSoba.zauzeta = false;
            otkazi();
        },
        error: function () {
            alert('Greska Check Out!');
        }
    });
}

function skloniRacun(){

    $("#racunModal").modal('hide');
}
