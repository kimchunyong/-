var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_file');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('internal Server Error');
        }
        res.render('new', { topics: files })
    });

});

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('internal Server Error');
        }
        var id = req.params.id;
        // id 값이 있을때
        if (id) {
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    res.status(500).send('internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            })
        } else {
            //id 값이 없을때
            res.render('view', { topics: files, title: 'Welcom', description: 'Hellow, javascript for server.' });
        }
    });
})

app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, function (err) {
        if (err) {
            res.status(500).send('internal Server Error');
        }
        res.redirect('/topic/' + title);
    });
});

app.listen(3000, function () {
    console.log('Connected, 3000 port!')
});
