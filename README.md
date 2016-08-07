# nodejs-memcacheddriver
Async (Bluebird) driver for memcached. Base and simple version already ready to use - production not recommended.

# Install
```
npm install nodejs-memcacheddriver
```

# Usage

## Simple way
```
var manager = new ClientManager({}, host, port);
manager
      .set('key', 'test value', 60)
      .then(function (value) {
          manager
                  .get('key')
                  .then(function (value) {
                      res.send(value);
                  })
                  .catch(function (e) {
                      res.send(e);
                  });
  
      })
      .catch(function (e) {
          res.send(e);
      });
```

# Changelog

2016-08-07  Develforever <rockfade@gmail.com>

* Simple socket connection, send command and parsing response 
* Simple socket manager for list of sockets

# Contact

Robert Jamróz rockfade@gmail.com

# Issue

https://github.com/develforever/nodejs-memcacheddriver/issues

