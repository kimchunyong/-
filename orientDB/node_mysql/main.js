var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zhzkzhffk34',
    database: 'subproject'
});

db.connect();

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        if (queryData.id === undefined) {
            db.query('SELECT * FROM topic', function (error, topics) {
                var title = 'Welcome';
                var description = 'Mini project!';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        } else {
            db.query('SELECT * FROM topic', function (error, topics) {
                if (error) {
                    throw error;
                }
                db.query('SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id = ?', [queryData.id], function (error2, topic) {
                    if (error2) {
                        throw error2;
                    }
                    var title = topic[0].title;
                    var description = topic[0].description;
                    var list = template.list(topics);
                    var html = template.HTML(title, list,
                        `
                        <h2>${title}</h2>${description} <p>작성자: ${topic[0].name}</p>,
                        <a href="/create">create</a>
                        <a href="/update?id=${queryData.id}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${queryData.id}">
                            <input type="submit" value="delete">
                        </form>
                        `
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            })
        }
    } else if (pathname === '/create') {
        db.query('SELECT * FROM topic', function (err, topics) {
            db.query('SELECT * FROM author', function (err, authors) {
                var title = 'Create';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                    `<form action="/create_process" method="post">
                        <p>
                            <input type="text" name="title" placeholder="title">
                        </p>
                        <p>
                            <textarea name="description" placeholder="description"></textarea>
                        </p>
                        <p>
                            <select name="author">
                                ${template.authorSelect(authors)}
                            </select>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    <a href="/create">create</a>
                    `, '');
                response.writeHead(200);
                response.end(html);
            })
        })
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            db.query(`INSERT INTO topic(title,description,created,author_id) 
                VALUE(?,?,NOW(),?)`,
                [post.title, post.description, 1],
                function (error, result) {
                    if (error) throw error;
                    response.writeHead(302, { Location: `/?id=${result.insertId}` });
                    response.end();
                }
            )
        });
    } else if (pathname === '/update') {
        db.query(`SELECT * FROM topic`, function (err, topics) {
            if (err) throw err;
            db.query('SELECT * FROM topic WHERE id=?', [queryData.id], function (err2, topics) {
                if (err2) throw err2;
                var title = 'Update';
                var list = template.list(topics);
                var html = template.HTML(topics[0].title, list,
                    `
                    <a href="/create">create</a> <a href="/update?id=${topics[0].id}">update</a>
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" placeholder="title" value=${topics[0].id}>
                    <p>
                        <input type="text" name="title" placeholder="title" value=${topics[0].title}>
                    </p>
                    <p>
                        <textarea name="description" placeholder="description">${topics[0].description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `, '');
                response.writeHead(200);
                response.end(html);
            })
        })

    } else if (pathname === '/update_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var id = post.id;

            db.query(`UPDATE topic SET title='${title}',description='${description}' WHERE id = ?`, [id], function (err, topics) {
                if (err) throw err;
                response.writeHead(302, { Location: `/` });
                response.end();
            });
        });
    } else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            db.query('DELETE FROM topic WHERE id=?', [id], function (err, topics) {
                if (err) throw err;
                response.writeHead(302, { Location: `/` });
                response.end();
            })
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
