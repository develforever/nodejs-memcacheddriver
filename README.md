# nodejs-memcacheddriver
Async (Bluebird) driver for memcached. Base and simple version already ready to use - production not recommended.

# Install
```
npm install nodejs-memcacheddriver
```

# Usage

Manager 'get' and 'set' method return Promise. More in index.js where example show simple key=value set by y\url query params.
http://localhost:3000/?item[value]=1&item[expire]=60

## Simple way
```
var manager = new ClientManager({}, host, port);
manager.set(key, value, expire);
manager.get(key);

```

# Changelog

2019-02-23 Develforever <rockfade@gmail.com>
* Change example to using url query like item[value]=1&item[expire]=60
* Refaktoring client receiving data method
* package.json update bluebird and express

2016-08-07  Develforever <rockfade@gmail.com>
* Simple socket connection, send command and parsing response 
* Simple socket manager for list of sockets

# Contact

Robert Jamróz rockfade@gmail.com

# Issue

https://github.com/develforever/nodejs-memcacheddriver/issues

