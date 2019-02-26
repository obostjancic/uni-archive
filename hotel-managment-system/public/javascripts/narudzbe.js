/**
 * Created by Javelin on 8.2.2017.
 */

$(document).ready(function() {
    var ime = document.cookie.substring(document.cookie.length - 7);
    $('#navigacija-lijevo').html('<li><a href="/">Početna</a></li>' +
        '<li><a href="#">O nama</a></li>' +
        '<li><a href="#">Rezervacije</a></li>' +
        '<li class="active"><a href="/narudzbe">Posluga u sobu</a></li>');
    $('#navigacija-desno').html('<li><p>Dobrodošli: '+ime+'</p></li>' +
        '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');

    prikaziArtikle();
});

function postaviNaslov(i, red){
    if(i == 0)
        return red.innerHTML = '<h2>Predjela</h2>';
    else if(i == 1)
        return red.innerHTML = '<h2>Glavna jela</h2>';
    else if(i == 2)
        return red.innerHTML = '<h2>Prilozi</h2>';
    else if(i == 3)
        return red.innerHTML = '<h2>Deserti</h2>';
    else if(i == 4)
        return red.innerHTML = '<h2>Bezalkoholna pića</h2>';
    else if(i == 5)
        return red.innerHTML = '<h2>Alkoholna pića</h2>';
}

function postaviId(i, red){
    if(i == 0)
        return red.id = 'predjela';
    else if(i == 1)
        return red.id = 'glavna-jela';
    else if(i == 2)
        return red.id = 'prilozi';
    else if(i == 3)
        return red.id = 'deserti';
    else if(i == 4)
        return red.id = 'bezalkoholna-pica';
    else if(i == 5)
        return red.id = 'alkoholna-pica';
}

function napraviKarticu(i,j, artikli){
    var kartica = document.createElement('div');
    kartica.className = "kartica";
    kartica.id = artikli[i][j].id;
    var slika = document.createElement('img');
    slika.className = "img-responsive";
    slika.src = "../images/narudzbe/"+artikli[i][j].id+".jpg";
    var cijena = document.createElement('div');
    cijena.className = "stiker-cijena";
    cijena.innerHTML = artikli[i][j].cijena + " KM";
    var podnaslov = document.createElement('h3');
    podnaslov.className = "podnaslov text-center";
    podnaslov.innerHTML = artikli[i][j].ime;
    var tekst = document.createElement('p');
    tekst.className = "text-center";
    tekst.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies enim non lacus efficitur, eu rutrum dolor venenatis"
    var labela = document.createElement('p');
    labela.className = "labela";
    labela.innerHTML = "Količina: ";
    var input = document.createElement('input');
    input.type = "text";
    input.value = "0";
    input.size = "2";
    input.setAttribute("onkeypress","return event.charCode >= 48 && event.charCode <= 57");
    input.className = "narudzbe-input text-center";
    input.id = "narudzbe-input-"+artikli[i][j].id;
    var button = document.createElement('button');
    button.className = "narudzbe-dugme";
    button.id = "narudzbe-dugme-"+artikli[i][j].id;
    button.innerHTML = "Dodaj";
    button.setAttribute('onclick', 'dodajArtikal("'+artikli[i][j].id+'")');
    kartica.appendChild(slika);
    kartica.appendChild(cijena);
    kartica.appendChild(podnaslov);
    kartica.appendChild(tekst);
    kartica.appendChild(labela);
    kartica.appendChild(input);
    kartica.appendChild(button);
    return kartica;
}

function prikaziArtikle(){
    $.ajax({
        type: "get",
        url: "/narudzbe/artikli",
        success: function (data) {
            var artikli = data;
            for (var i = 0; i < artikli.length; i++){
                var red = document.createElement('div');
                red.className = "row";
                red.id = postaviId(i,red);
                red.innerHTML = postaviNaslov(i,red);
                for (var j = 0; j < artikli[i].length; j++){
                    var kolona = document.createElement('div');
                    kolona.className = "col-sm-3";
                    var kartica = napraviKarticu(i,j,artikli);
                    kolona.appendChild(kartica);
                    red.appendChild(kolona);
                }
                document.getElementById('sadrzaj').appendChild(red);
            }
        },
        error: function () {
            alert('Greska!');
        }
    });
}

var narudzba = [];



function dodajArtikal(id){
    dataToSend = {idArtikal: id};
    $.ajax ({
        type: "post",
        url: "/narudzbe/dajArtikal",
        data: dataToSend,
        success: function(data){
            console.log(data);
            console.log("Dodao: ",id , " x", $('#narudzbe-input-'+id).val());
            var kolicina = $('#narudzbe-input-'+id).val();
            if (kolicina != 0) {
                if (vecDodan(narudzba, id) != -1)
                    narudzba[vecDodan(narudzba, id)].kolicina = kolicina;
                else
                narudzba.push({id: id, ime: data.ime, kolicina: kolicina, cijena: data.cijena});
                $('#slajder').html("");
                for (var i = 0; i < narudzba.length; i++){
                    var p = document.createElement('p');
                    p.innerHTML = narudzba[i].ime + " x" + narudzba[i].kolicina;
                    var button = document.createElement('button');
                    button.className ="minus-crveni";
                    button.id = "minus-crveni-"+narudzba[i].id;
                    button.setAttribute('onclick', 'skloniIzNarudzbe("'+narudzba[i].id+'")');
                    button.innerHTML = "X";
                    p.appendChild(button);
                    $('#slajder').append(p);
                }
                var naruci = document.createElement('button');
                naruci.className = "dugme naruci-dugme";
                naruci.setAttribute('onclick', 'prikaziModal()');
                naruci.innerHTML = "Naruči";
                $('#slajder').append(naruci);
                }
                if ($("#slajder").css('display') == 'none') {
                    $('#slajder').animate({width: 'toggle'}, 200, 'linear');
                }
        },
        error: function () {
            alert('Greska!');
        }
    });
}

function skloniIzNarudzbe(id){
    var indeks = vecDodan(narudzba,id);
    narudzba.splice(indeks, indeks+1);
    $('#slajder').html("");
    for (var i = 0; i < narudzba.length; i++){
        var p = document.createElement('p');
        p.innerHTML = narudzba[i].ime + " x" + narudzba[i].kolicina;
        var button = document.createElement('button');
        button.className ="minus-crveni";
        button.id = "minus-crveni-"+narudzba[i].id;
        button.setAttribute('onclick', 'skloniIzNarudzbe("'+narudzba[i].id+'")');
        button.innerHTML = "X";
        p.appendChild(button);
        $('#slajder').append(p);
    }
    var naruci = document.createElement('button');
    naruci.className = "dugme naruci-dugme";
    naruci.setAttribute('onclick', 'prikaziModal()');
    naruci.innerHTML = "Naruči";
    $('#slajder').append(naruci);
    if (narudzba.length == 0){
        $('#slajder').animate({width: 'toggle'}, 200, 'linear');
    }
}

function vecDodan (narudzba, id){
    for (var i = 0; i < narudzba.length; i++){
        if (narudzba[i].id == id) return i;
    }
    return -1;
}

function prikaziModal() {
    var tekst = document.getElementById('tekst-modala');
    var suma = 0;
    for (var i = 0; i < narudzba.length; i++){
        var p = document.createElement('h3');
        p.innerHTML = narudzba[i].ime + " x" + narudzba[i].kolicina +" = "+ narudzba[i].kolicina * narudzba[i].cijena + " KM";
        suma += narudzba[i].kolicina * narudzba[i].cijena;
        tekst.appendChild(p);
    }
    tekst.appendChild(document.createElement('hr'));
    var total = document.createElement('h2');
    total.innerHTML = suma + " KM";
    tekst.appendChild(total);
    $('#naruzbaModal').modal();

}

function obrisiNarudzbu() {
    $('#tekst-modala').html('<h2 id="narudzba-text">Vaša narudzba:</h2>');
    $('#naruzbaModal').modal('hide');
}

function posaljiNarudzbu(){
    var niz = [];
    var soba = document.cookie.substring(document.cookie.length - 3);
    var suma = 0;
    for(var i = 0; i < narudzba.length; i++){
        suma += narudzba[i].kolicina * narudzba[i].cijena;
    }
    var dataToSend = {soba:soba, suma:suma};
    console.log(dataToSend);
    $.ajax ({
        type: "post",
        url: "narudzbe/primi",
        data: dataToSend,
        success: function(data){
            alert("Posluga u sobu ce biti kroz par minuta");
        },
        error: function () {
            alert("Greska");
        }
    });
}
