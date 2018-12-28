var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.get('/form', function (req, res) {
    res.render('form')
})

app.get('/topic/:id', function (req, res) {
    var topics = [
        'Jvascript is...',
        'Nodejs is....',
        'Express is....'
    ];
    var output = `
        <a href="/topic/0">Javascript</a>
        <a href="/topic/1">Nodejs</a>
        <a href="/topic/2">Express</a>
        ${topics[req.params.id]}
    `
    res.send(output);
});

app.post('/form_reciver', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ',' + description)
})

app.get('/topic/:id/:mode', function (req, res) {
    res.send(req.params.id + '' + req.params.mode)
})


app.get('/template', function (req, res) {
    res.render('temp', { time: Date(), _title: 'Jade' });
});

app.get('/dynamic', function (req, res) {
    var lis = '';
    for (var i = 0; i < 5; i++) {
        lis += '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html lang="ko">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>
        Hello, dynamic!!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    
    </html>`
    res.send(output);
});

app.get('/route', function (req, res) {
    res.send('Hello Router,<img src="/route.jpg">')
});

app.get('/login', function (req, res) {
    res.send('<h1>Login please!</h1>');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
