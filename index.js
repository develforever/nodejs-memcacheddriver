/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ClientManager = require('./src/ClientManager');

var port = 11211;
var host = '192.168.33.10';

var express = require('express');
var app = express();

var manager = new ClientManager({}, host, port);

app.get('/', function (req, res) {

    console.time('r');
    manager
            .set('key', 'test value', 60)
            .then(function (value) {

                console.log('value saved');
                manager
                        .get('key')
                        .then(function (value) {

                            console.log('value is', value);
                            console.timeEnd('r');
                            res.send(value);
                        })
                        .catch(function (e) {

                            res.send(e);
                        });

            })
            .catch(function (e) {

                res.send(e);
            });



});

process.on('SIGINT', function () {

    console.log('args sigint', arguments);
});

process.on('exit', function () {

    console.log('exit');
});

app.listen(3000, function () {
    console.log('Express test app listening on port 3000');
});














