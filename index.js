var Orientdb = require('orientjs');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('view engine', 'ejs'); 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', function(request, response) {
     response.render('index');
});

app.get('/index', function(request, response) {
  response.render('index');
});

app.get('/addflight', function(request, response) {
  response.render('addflight');
});

app.get('/addairport', function(request, response) {
  response.render('addairport');
});

app.get('/addemp', function(request, response) {
  response.render('addemp');
});
 
var server = Orientdb({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'bala'
});

var db = server.use({

     name:  'airlines',
     username: 'root',
     password: 'bala'

 });

 app.post('/addairport', function(request, response) {
   var con=request.body.country;
   var stat=request.body.state;
   var cna=request.body.c_name;
   var apna=request.body.ap_name;
  db.query('insert into airport (COUNTRY, STATE, CNAME, AP_NAME) values (:country, :state, :cname, :apname)' , {
    params: {
      country: con,
      state: stat,
      cname: cna,
      apname: apna
    }}).then( function(data) {
   response.render('addairport');
 }
)
});

app.post('/addflight', function(request, response) {
  var arvl=request.body.arrival;
  var depart=request.body.departure;
  var flightcode=request.body.flight_code;
  var desti=request.body.destination;
  var airlid=request.body.airline_id;
  var source=request.body.source;
 db.query('insert into flight (ARRIVAL, DEPARTURE, flight_CODE, DESTINATION,AIRLINEID,SOURCE) values (:arr, :dep, :fl_code, :des, :alid, :srce)' , {
   params: {
     arr: arvl,
     dep: depart,
     fl_code: flightcode,
     des: desti,
     alid:airlid,
     srce:source
   }}).then( function(data) {
  response.render('addflight');
}
)
});

app.post('/addemp', function(request, response) {
  var ssn=request.body.ssn;
  var name=request.body.ename;
  var phone=request.body.phone;
  var age=request.body.age;
  var sex=request.body.gender;
  var jobtype=request.body.jobtype;
  var apname=request.body.apname;
 db.query('insert into employee1 (SSN, FNAME, PHONE, AGE,SEX,JOBTYPE,AP_NAME) values (:ssn, :name, :phone, :age, :sex, :jobtype, :apname)' , {
   params: {
     ssn: ssn,
     name: name,
     phone: phone,
     age: age,
     sex:sex,
     jobtype:jobtype,
     apname:apname
   }}).then( function(data) {
  response.render('addemp');
}
)
});

app.get('/viewairport', function(request, response) {
  db.query(
 'SELECT FROM airport').then( function(data) {
   response.render('viewairport', {data:data});
 }
)
});

app.get('/viewemp', function(request, response) {
  db.query(
 'SELECT FROM employee1').then( function(data) {
   response.render('viewemp', {data:data});
 }
)
});

app.get('/viewflight', function(request, response) {
  db.query(
 'SELECT FROM flight').then( function(data) {
   response.render('viewflight', {data:data});
 }
)
});

app.get('/passinfo', function(request, response) {
  db.query(
 'SELECT FROM passenger2').then( function(data) {
   response.render('passinfo', {data:data});
 }
)
});

app.get('/bookdetails', function(request, response) {
  db.query(
 'SELECT FROM ticket1').then( function(data) {
   response.render('bookdetails', {data:data});
 }
)
});


app.post('/airline', function(request, response) {
  var alid=request.body.airid;
  db.query(
 'SELECT FROM airline where airlineID= :al',{params:{
  al:alid
 }}).then( function(data) {
   response.render('airline', {data:data});
 }
)
});

app.post('/passflight', function(request, response) {
  var alid=request.body.pid;
  db.query(
 'SELECT FROM passenger3 where PID= :al',{params:{
  al:alid
 }}).then( function(data) {
   response.render('passflight', {data:data});
 }
)
});

app.listen(3000);