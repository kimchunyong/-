var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send('hi');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!!!');
});