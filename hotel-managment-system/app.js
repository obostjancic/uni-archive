var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var sobe = require('./routes/sobe');
var pregled = require('./routes/pregled');
var narudzbe = require('./routes/narudzbe');
var pool = require('./config-postgreSQL');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res, next) {
    nivoAutorizacije = 0;
    rute = [{ruta: '/', nivo: 0}, {ruta: '/auth', nivo: 0}, {ruta: '/pregled/omoguci', nivo: 3}, {ruta: '/pregled/onemoguci', nivo: 3}, {ruta: '/login', nivo: 0}, {ruta: '/pregled', nivo: 3}, {ruta: '/pregled/show/sobe', nivo: 3}, {ruta: '/pregled/show/statistika', nivo: 3}
          , {ruta: '/pregled/show/korisnici', nivo: 3}, {ruta: '/sobe', nivo: 2}, {ruta: '/sobe/show', nivo: 2}, {ruta: '/sobe/info', nivo: 2}, {ruta: '/sobe/checkIn', nivo: 2}
          , {ruta: '/sobe/checkOut', nivo: 2}, {ruta: '/narudzbe', nivo: 1}, {ruta: '/narudzbe/artikli', nivo: 1}, {ruta: '/narudzbe/dajArtikal', nivo: 1}, {ruta: '/narudzbe/primi', nivo: 1}];
    for (var i = 0; i < rute.length; i++){
        if (req.path == rute[i].ruta){
            put = rute[i];
            break;
        }
    }
    if (req.cookies.kuki != undefined) {
        pool.query('Select * from korisnici where korisnickoime=$1', [req.cookies.kuki], function (err, result) {
            if (result.rows[0].omogucen != true){
                res.clearCookie('kuki');
                res.send(401);
            }
            else if (result.rows[0].nivo >= put.nivo) {
                nivoAutorizacije = result.rows[0].nivo;
                    next();
            }
        });
    }
    else if (req.cookies.kuki == undefined && put.nivo == 0){
        next();
    }
    else {
        res.clearCookie('kuki');
        res.redirect('/');
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/sobe',sobe);
app.use('/pregled',pregled);
app.use('/narudzbe',narudzbe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
