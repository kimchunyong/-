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

                <form action="create_author_process" method="post">
                    <p>
                        <input type="text" name="name" placeholder="name"/>
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit"/>
                    </p>
                <form>
                `
            );
            response.writeHead(200);
            response.end(html);
        });
    });
};

exports.create_author = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var name = post.name;
        var profile = post.profile;
        db.query(`INSERT INTO author (name,profile)
            VALUE(?,?)`,
            [name, profile]
            , function (error, result) {
                if (error) throw error;
                response.writeHead(302, { Location: `/author` });
                response.end();
            }
        )
    });
}

exports.update = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error2, authors) {
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            db.query('SELECT * FROM author WHERE id=?', [queryData.id], function (error3, authors) {
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

                <form action="/author/update_process" method="post">
                    <p>
                        <input type="hidden" name="id" value="${queryData.id}">
                    </p>
                    <p>
                        <input type="text" name="name" value="${authors[0].name}" placeholder="name"/>
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description">${authors[0].profile}</textarea>
                    </p>
                    <p>
                        <input type="submit"value="수정"/>
                    </p>
                <form>
                `
                );
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
        db.query(`UPDATE author SET name=?, profile=? WHERE id=?`,
            [post.name, post.profile, post.id],
            function (error, result) {
                if (error) throw error;
                response.writeHead(302, { Location: `/author` });
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
        console.log(id)
        db.query(`DELETE FROM author WHERE id=?`, [id], function (error, result) {
            if (error) throw error;
            console.log(result);
            response.writeHead(302, { Location: `/author` });
            response.end();
        })

    });
}