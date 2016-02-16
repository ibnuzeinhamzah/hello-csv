'use strict';

const debug = require('debug')('hello-helper');
const AWS = require('mock-aws-s3');
const Q = require('q');

AWS.config.basePath = __dirname + '/buckets';

const s3 = AWS.S3({ params: { Bucket: 'example' } });

function surprise(name) {
    if (Math.floor(Math.random() * 49) + 1 <= 50) { // if Math.random() * 100 + 1 <= 50, then not all send status will logged
        return new Error(`w00t!!! ${name} error`);
    }
}

// simulates sending sms
exports.sendSms = function (data, callback) {
    debug(`sending out sms: ${JSON.stringify(data)}`);
    let deferred = Q.defer();
    if (surprise('sending-sms')) {
        let datalog = {
            data: data,
            status: 200,
            message: 'OK',
        };
        deferred.resolve(datalog);
    }

    return deferred.promise;
};

// simulates logging to s3
exports.logToS3 = function (data, callback) {
    debug(`putting data to S3: ${JSON.stringify(data)}`);
    let deferred = Q.defer();
    s3.putObject({
        Key: `row/line-${new Date().valueOf()}.json`,
        Body: JSON.stringify(data),
    }, (err) => {
        deferred.resolve(err ? err : surprise('log-to-s3'), { data, logged: true });
    });
    return deferred.promise;
};
