// 0. Please use readline (https://nodejs.org/api/readline.html) to deal with per line file reading
// 1. Then use the parse API of csv-parse (http://csv.adaltas.com/parse/ find the Node.js Stream API section)
'use strict';

const debug = require('debug')('hello');
const readline = require('readline');
const parse = require('csv-parse');
const Q = require('q');

exports.rl = function (data, cb) {
    let deferred = Q.defer();
    deferred.resolve(readline.createInterface({
        input: data,
    }));
    return deferred.promise;
};

exports.parse = function (data, cb) {
    let deferred = Q.defer();
    parse(data, function (err, parsed) {
        const p = parsed[0];
        p.push(p[0].concat(' ', p[1]));
        deferred.resolve(p);
    });

    return deferred.promise;
};
