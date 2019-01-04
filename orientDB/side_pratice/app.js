var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/ajax_send_search', function (req, res) {
    var responseData = { 'result': 'ok', 'search': req.body.search }
    res.json(responseData);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!!!');
});