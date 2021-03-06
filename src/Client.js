/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var net = require("net"),
        EventEmitter = require('events'),
        Promise = require('bluebird');

var global = {
    clients: []
};
var clientI = 0;
var instI = 1;

function Client(port, host) {

    this.name = 'client_' + instI;
    instI += 1;

    var em = new EventEmitter();
    var self = this;

    function getConnection() {

        return new Promise(function (resolve, reject) {

            var client = new net.Socket();
            client.setTimeout(1000);
            client.setEncoding('utf8');
            var stored = false;
            var lastValue = '';
            let out = null;

            client.on('data', function (data) {

                var str = data.toString('str');
                var spl = str.split('\r\n', 2);

                console.log('data is: ', str, spl);

                if (spl[0].indexOf('VALUE') !== -1) {

                    lastValue += spl[1];

                    if (spl.length === 2 && spl[0].indexOf('END') !== -1) {
                        lastValue = null;
                    }

                    if (str.indexOf('END') !== -1) {
                        out = lastValue;
                        lastValue = '';
                    }
                }else if(spl[0].indexOf('STORED') !== -1){

                    stored = true;
                    out = stored;
                } else {

                    
                }

                em.emit('data', out);

            });
            client.on('end', function () {
                console.log('disconnected from server');
                client.destroy();
            });

            client.on('error', function (err) {
                console.log('in client error', err);
                client.destroy();
                throw err;
            });

            client.connect(port, host, function () {
                // 'connect' listener
                console.log('connected to server!');

                clientI += 1;
                global.clients.push(client);
                resolve(client);

            });
        });
    }


    function exit(code) {

        console.log(self.name  + ' exit args', code);

        global.clients.forEach(function (client) {

            client.end();
            client.destroy();

        });

    }

    process.on('SIGINT', exit);
    process.on('exit', exit);
    process.on('unhandledRejection', function (reason, p) {
        console.log('unhandled rejection');
        exit(1);
    });

    this.set = function (name, value, exp) {

        return new Promise(function (resolve, reject) {

            exp = exp || 60;
            var str = value;

            str = str.replace(/\r\n/ig, '\\r\\n');

            getConnection()
                    .then(function (client) {

                        em.once('data', function (stored) {
                            resolve([stored, name, value, exp]);
                        });

                        client.write('set ' + name + ' 0 ' + exp + ' ' + Buffer.byteLength(str, 'utf8') + '\r\n' + str + '\r\n')
                    });

        });
    };

    this.get = function (key) {
        return new Promise(function (resolve, reject) {

            getConnection()
                    .then(function (client) {
                        
                        em.once('data', function (v) {

                            console.log(self.name + ' get data event resolve');
                            resolve([key, v]);
                        });
                        client.write('get ' + key + ' \r\n');
                    });
        });
    };

}

module.exports = Client;
