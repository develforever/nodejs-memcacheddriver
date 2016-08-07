/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var util = require('util');
var Promise = require('bluebird');
var Client = require('./client');

function ClientManager(params, host, port) {

    var def = {
        pool: 5
    },
    sockets = [];
    var config = util._extend(def, params);


    for (var i = 0; i < config.pool; i += 1) {

        var client = new Client(port, host);

        console.log(i, client);

        sockets.push(client);
    }

    var ci = 0;
    function getClient(ci) {

        var p = new Promise(function (resolve, reject) {
            resolve({
                ci: ci,
                client: sockets[ci]
            });
        });

        ci += 1;
        if (ci >= sockets.length) {
            ci = 0;
        }
        return p;

    }

    this.get = function (key) {
        var p = getClient(ci);

        return p
                .then(function (conf) {

                    var client = conf.client;
                    return client.get(key);
                });
    };

    this.set = function (key, value, expire) {
        var p = getClient(ci);


        return p
                .then(function (conf) {

                    var client = conf.client;
                    return client.set(key, value, expire);
                });
    };

}

module.exports = ClientManager;
