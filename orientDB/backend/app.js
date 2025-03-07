var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.post('/email_post', function (req, res) {
    console.log(req.body.email);
    //res.send('<h1>welcome!' + req.body.email + '</h1>');
    res.render('email.ejs', { 'email': req.body.email });
});

app.post('/ajax_send_email', function (req, res) {
    console.log(req.body.email);
    var responseData = { 'result': 'ok', 'email': req.body.email };
    res.json(responseData);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!!!');
});
