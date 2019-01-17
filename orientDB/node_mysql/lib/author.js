var template = require('./template.js');
var db = require('./db');
var url = require('url');
var qs = require('querystring');

exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error2, authors) {
            var title = 'Welcome';
            var description = 'Mini project!';
            var list = template.list(topics);
            var html = template.HTML(title, list,
                `
                ${template.authorTable(authors)}
                <style>
                    table{border-collapse:collapse;}
                    td{padding:4px 8px;border:1px solid #000;}
                </style>
                `
            );
            response.writeHead(200);
            response.end(html);
        });
    });
};