/**
 * Created by Javelin on 8.2.2017.
 */

$(document).ready(function() {
$('#navigacija-lijevo').html('<li><a href="/">Početna</a></li>' +
    '<li><a href="#">O nama</a></li>' +
    '<li><a href="#">Rezervacije</a></li>' +
    '<li><a href="/sobe">Sobe</a></li>' +
    '<li class="active"><a href="/pregled">Pregled</a></li>');
$('#navigacija-desno').html('<li><p>Dobrodošli: admin</p></li>' +
    '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
});

function omoguci(korisnickoime){
    var dataToSend = {korisnickoime: korisnickoime};
    $.ajax({
        type: "post",
        url: "/pregled/omoguci",
        data: dataToSend,
        success: function (data) {
            var dugme = document.getElementById("korisnik-dugme-"+korisnickoime);
            dugme.innerHTML = 'Onemogući';
            dugme.setAttribute('onclick', 'onemoguci("'+korisnickoime+'")');
        },
        error: function () {
            alert('Greska');
        }
    });
}

function onemoguci(korisnickoime){
    var dataToSend = {korisnickoime: korisnickoime};
    $.ajax({
        type: "post",
        url: "/pregled/onemoguci",
        data: dataToSend,
        success: function (data) {
            var dugme = document.getElementById("korisnik-dugme-"+korisnickoime);
            dugme.innerHTML = 'Omogući';
            dugme.setAttribute('onclick', 'omoguci("'+korisnickoime+'")');
        },
        error: function () {
            alert('Greska');
        }
    });
}


$(document).ready(function() {
    $.get({
        url: "/pregled/show/korisnici",
        success: function (data) {
            for(var i = 0; i < data.length; i++){
                var red = document.createElement('tr');
                var celija0 = document.createElement('td');
                var celija1 = document.createElement('td');
                var celija2 = document.createElement('td');
                var celija3 = document.createElement('td');
                celija0.innerHTML = data[i].korisnickoime;
                celija1.innerHTML = data[i].ime;
                if (data[i].nivo == 1)
                    celija2.innerHTML = 'Administrator';
                else if (data[i].nivo == 2)
                    celija2.innerHTML = 'Zaposlenik';
                else if (data[i].nivo == 3)
                    celija2.innerHTML = 'Gost';
                var dugme = document.createElement('button');
                dugme.className = 'dugme-black';
                dugme.id = "korisnik-dugme-"+data[i].korisnickoime;
                console.log(data[i].omogucen);
                if(data[i].omogucen == true) {
                    dugme.innerHTML = 'Onemogući';
                    dugme.setAttribute('onclick', 'onemoguci("'+data[i].korisnickoime+'")');
                }
                else {
                    dugme.innerHTML = 'Omogući';
                    dugme.setAttribute('onclick', 'omoguci("'+data[i].korisnickoime+'")');
                }
                celija3.appendChild(dugme);
                celija3.className = 'text-center';
                red.appendChild(celija0);
                red.appendChild(celija1);
                red.appendChild(celija2);
                if (data[i].korisnickoime != 'admin')red.appendChild(celija3);
                $('#korisnici-tbody').append(red);
            }
        },
        error: function () {
            alert('Greska!');
        }
    });
    $.get({
        url: "/pregled/show/sobe",
        success: function (data) {
            for(var i = 0; i < data.length; i++){
                var red = document.createElement('tr');
                var celija0 = document.createElement('td');
                var celija1 = document.createElement('td');
                var celija2 = document.createElement('td');
                var celija3 = document.createElement('td');
                var celija4 = document.createElement('td');
                var celija5 = document.createElement('td');
                celija0.innerHTML = data[i].soba;
                celija1.innerHTML = data[i].kreveti;
                celija2.innerHTML = data[i].gosti;
                celija3.innerHTML = data[i].cijena + ' KM';
                celija4.innerHTML = data[i].gost;
                celija5.innerHTML = data[i].profit;
                red.appendChild(celija0);
                red.appendChild(celija1);
                red.appendChild(celija2);
                red.appendChild(celija3);
                red.appendChild(celija4);
                red.appendChild(celija5);
                $('#sobe-tbody').append(red);
            }
        },
        error: function () {
            alert('Greska!');
        }
    });
    $.get({
        url: "/pregled/show/statistika",
        success: function (data) {
            $('#sobe-procenti').text("Popunjenost soba: " + (data[0]/data[1]*100).toFixed(2) + "% (" + data[0] + "/" + data[1] + ")");
            $('#gosti-procenti').text("Kapacitet: " + (data[2]/data[3]*100).toFixed(2) + "% (" + data[2] + "/" + data[3] + ")");
            $('#profit-procenti').text("Profit: " + data[4] + " KM");
        },
        error: function () {
            alert('Greska!');
        }
    });
});
