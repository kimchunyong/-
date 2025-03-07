var template = require('./template.js');
var db = require('./db');
var url = require('url');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.home = function (request, response) {
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
}

exports.page = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
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
                <h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)} <p>작성자: ${sanitizeHtml(topic[0].name)}</p>,
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
    });
}

exports.create = function (request, response) {
    db.query('SELECT * FROM topic', function (err, topics) {
        db.query('SELECT * FROM author', function (err, authors) {
            var title = 'Create';
            var list = template.list(topics);
            var html = template.HTML(sanitizeHtml(title), list,
                `<form action="/create_process" method="post">
                    <p>
                        <input type="text" name="title" placeholder="title">
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        ${template.authorSelect(authors)}
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `, '');
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
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
            [post.title, post.description, post.author],
            function (error, result) {
                if (error) throw error;
                response.writeHead(302, { Location: `/?id=${result.insertId}` });
                response.end();
            }
        )
    });
}

exports.update = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function (err, topics) {
        if (err) throw err;
        db.query('SELECT * FROM topic WHERE id=?', [queryData.id], function (err2, topics) {
            if (err2) throw err2;
            db.query('SELECT * FROM author', function (err, authors) {
                var title = 'Update';
                var list = template.list(topics);
                var html = template.HTML(sanitizeHtml(topics[0].title), list,
                    `
                    <a href="/create">create</a> <a href="/update?id=${topics[0].id}">update</a>
                    <form action="/update_process" method="post">
                        <input type="hidden" name="id" placeholder="title" value=${sanitizeHtml(topics[0].id)}>
                        <p>
                            <input type="text" name="title" placeholder="title" value=${sanitizeHtml(topics[0].title)}>
                        </p>
                        <p>
                            <textarea name="description" placeholder="description">${sanitizeHtml(topics[0].description)}</textarea>
                        </p>
                        <p>
                            ${template.authorSelect(authors, topics[0].author_id)}
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `, '');
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}

exports.update_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        var authorId = post.author;
        var id = post.id;

        db.query(`UPDATE topic SET title='${title}',description='${description}',author_id='${authorId}' WHERE id = ?`, [id], function (err, topics) {
            if (err) throw err;
            response.writeHead(302, { Location: `/` });
            response.end();
        });
    });
}

exports.delete_process = function (request, response) {
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
}