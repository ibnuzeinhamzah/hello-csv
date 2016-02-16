// Please use async lib https://github.com/caolan/async
'use strict';

const debug = require('debug')('hello');
const fs = require('fs');
const Q = require('q');

exports.loadFile = function (file, cb) {
    let deferred = Q.defer();
    deferred.resolve(fs.createReadStream(file));
    return deferred.promise;
};
