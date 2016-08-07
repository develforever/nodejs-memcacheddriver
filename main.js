/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ClientManager = require('./ClientManager');
var obj = require('./obj');

var port = null;
var host = null;



var express = require('express');
var app = express();

var manager = new ClientManager({}, '192.168.33.10', 11211);

app.get('/', function (req, res) {

    console.time('r');
    manager
            .set('key', 'aaa', 60)
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
    console.log('Example app listening on port 3000!');
});














