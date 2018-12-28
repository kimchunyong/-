var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'root',
    password: '9438'
});

var db = server.use('test1');

/*
db.record.get('#23:0')
    .then(function (record) {
        console.log('Loaded record:', record.title);
    });
*/

/*
* CREATE
* READ
* UPDATE
* DELETE
*
* CRUD
*/


// CREATE
/*
var sql = 'SELECT FROM topic';
db.query(sql).then(function (res) {
    console.log(res);
});


var sql = 'SELECT FROM topic WHERE @rid=:rid';
var _param = {
    params: {
        rid: '#23:0'
    }
};
db.query(sql, _param).then(function (res) {
    console.log(res);
});

*/

//INSERT
/*
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
var param = {
    params: {
        title: 'Express',
        desc: 'Exspress is framework for web'
    }
}
db.query(sql, param)
    .then(function (res) {
        console.log(res);
    })
*/

//UPDATE
/*
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
db.query(sql, {params:{ title: 'Expressjs', rid: '#23:0' }})
    .then(function (res) {
        console.log(res);
    })
*/

//DELETE
/*
var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql, { params: { rid: '#23:0' } })
    .then(res => {
        console.log(res);
    })
*/