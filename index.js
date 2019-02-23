/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ClientManager = require('./src/ClientManager');

var port = 11211;
var host = '192.168.8.106';

var express = require('express');
var app = express();

var manager = new ClientManager({}, host, port);

app.get('/', (req, res) => {

    let tasks = []
    for (let fname in req.query) {
        tasks.push(manager
            .set(fname, req.query[fname].value, parseInt(req.query[fname].expire)));
    };
    let out = [];
    Promise.all(tasks)
        .then(function (stored) {

            tasks = [];

            out.push(stored);

            stored.forEach(function (e) {
                tasks.push(manager
                    .get(e[1]));
            });

            return Promise.all(tasks);
        })
        .then(function (getter) {

            out.push(getter)

        })
        .finally(function () {
            res.send(out);
        });

});

process.on('SIGINT', function (name, value) {

    console.log('args sigint', arguments);
    process.exit();
});

process.on('exit', function () {

    console.log('exit');
});

app.listen(3000, function () {
    console.log('Express test app listening on port 3000');
});














