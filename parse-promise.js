// please use promise approach to fight the naive one in parse-callback.js
'use strict';

const debug = require('debug')('hello');
const Q = require('q');
const stream = require('./parse-stream');
const async = require('./parse-async');
const helper = require('./helper');
const filename = __dirname + '/sample.csv';

async.loadFile(filename)
.then(function (data) {
    return stream.rl(data);
})
.then(function (data) {
    let index = 0;
    data.on('line', (line) => {
        if (index > 0) {
            stream.parse(line)
.then(function (data) {
    return helper.sendSms(data);
})
.then(function (data2) {
    console.log(data2);
    if (data2) {
        let lineToLog;
        let statObj = { status: data2.status, message: data2.message };
        let datasend = data2.data;
        lineToLog = {
            statObj,
            datasend,
        };
        helper.logToS3(lineToLog);
    }
});
        }

        index++;
    });
})
.catch(function (error) {
    debug(`${error}`);
    console.log(error);
})
.done();
