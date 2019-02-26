function prikaziNavbar(ovlastenje) {
    if (ovlastenje.nivo == 0){
        $('#navigacija-lijevo').html('<li class="active"><a href="/">Početna</a></li>' +
            '<li><a href="#">O nama</a></li>');
        $('#navigacija-desno').html('<li><button class="btn dugme" id="login-dugme" type="button" data-toggle="modal" data-target="#loginModal">Prijava</button></li>');
    }
    else if (ovlastenje.nivo == 1){
        $('#navigacija-lijevo').html('<li class="active"><a href="/">Početna</a></li>' +
            '<li><a href="#">O nama</a></li>' +
            '<li><a href="/narudzbe">Soba</a></li>');
        $('#navigacija-desno').html('<li><p>Dobrodošli: '+ovlastenje.korisnickoime+'</p></li>' +
            '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
    }
    else if (ovlastenje.nivo == 2){
        $('#navigacija-lijevo').html('<li class="active" ><a href="/">Početna</a></li>' +
            '<li><a href="#">O nama</a></li>' +
            '<li><a href="/sobe">Sobe</a></li>');
        $('#navigacija-desno').html('<li><p>Dobrodošli: recepcija</p></li>' +
            '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
    }
    else if (ovlastenje.nivo == 3){
        $('#navigacija-lijevo').html('<li class="active" ><a href="/">Početna</a></li>' +
            '<li><a href="#">O nama</a></li>' +
            '<li><a href="/sobe">Sobe</a></li>' +
            '<li><a href="/pregled">Pregled</a></li>');
        $('#navigacija-desno').html('<li><p>Dobrodošli: admin</p></li>' +
            '<li><a class="dugme" id="log-out-link" href="/logOut">Odjava</a></li>');
    }
}

$(document).ready(function() {

    $.ajax({
        type: "get",
        url: "/auth",
        success: function (data) {
            prikaziNavbar(data);
        },
        error: function () {
            alert('Greska!');
        }
    });
});


$("#login-dugme").click(function(){
    console.log("pozvao");
    $("#slajder").slideDown();
});